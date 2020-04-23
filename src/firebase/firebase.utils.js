import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import config from '../config/config'

const firebaseConfig = {
    apiKey: config.apiKey ,
    authDomain: config.authDomain ,
    databaseURL: config.databaseURL ,
    projectId: config.projectId ,
    storageBucket: config.storageBucket ,
    messagingSenderId: config.messagingSenderId ,
    appId: config.appId ,
    measurementId: config.measurementId
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export auth  & firestore function
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Set up Google Auth Provider & configure prompt mode
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account' });
// Helper function to login with Google account
export const signInWithGoogle = () => {
  const response = auth.signInWithPopup(provider).then((results) => {
    //console.warn(results);

    return { err : null , user : results.user };
  }).catch((error)=> {
    //console.warn(error.message);
    return {err : error.message , user : false};
  })
  return response ;
}

// Helper function to login with Email & Password
export const signInWithEmailPassword = async ({email , password}) => {

    const response = await auth.signInWithEmailAndPassword(email , password).catch((err)=> {
      if(err){
        
        return { err : err.message , user : false };
      } 

    })

    //console.warn("This message from firebase.utils.js : " , response.user);
    if(response.err){
      return { err : response.err , user : false };
    }
    else {
      return { err : null , user : response.user}
    }

    // console.log("this is from helperfunction : " , res);
    // return res;
}

export const signUpWithEmailAndPassword = async (credentials) => {
  //console.log('firebase63 credentials : ' , credentials);
  const { email , password , firstName , lastName , displayName } = credentials;
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email , password);
      
      //console.log("firebase.utils.js 68 user : " , user);

      await createUserProfileDoc(user , {firstName , lastName , displayName});
      return {err : null , user};
    } catch (err) {
      //console.error("firebase73 error : " , err.message)
      return {err : err.message , user : false};
    }

}

// Create user to Users'Doc
export const createUserProfileDoc = async (user , additionalData = {}) => {

  if(!user){
    return;
  }

  const userRef = firestore.doc(`/users/${user.uid}`);
  //const collectionRef = firestore.collection('/users');

  // Receive (Snap shot) from userRef
  const userSnapShot = await userRef.get();
  //const collectionSnapshot = await collectionRef.get();
  //console.log(collectionSnapshot.docs.map(doc => doc.data()));
  //console.log(userSnapShot);

  // Check existing data from (Snap shot)
  if(!userSnapShot.exists){
    const { email , displayName  } = user

    const createdAt = new Date();
    try {
      userRef.set({
        displayName ,
        email ,
        createdAt ,
        ...additionalData
      
      });
    } catch (error){
      console.log('error creating user' , error.message);
    }
  }

  return userRef;
}

// Function add collection and doc in one time
export const addCollectionAndDocument = async (collectionKey , objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(objectsToAdd);

  const batch = firestore.batch();

  try {
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef , obj);
  });
  } catch (error) {
    console.log(error);
  }

  return await batch.commit();
}

// Add convert collections snapshot to map function
export const convertCollectionSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    //const { authorFirstName , authorLastName , title , content } = doc.data();

    return{
      id : doc.id ,
      ...doc.data()
    }
  })

  return transformedCollection;
}

export const updateDocument = (id , updateData) => {
  // Create documentRef

  // Example documentRef = firestore.collection('test').doc('testdoc')
  const documentRef = firestore.doc(`/projects/${id}`);

  // updateData = { 
  //   title : 'This title was updated from update function' ,
  //   content : 'This content was updated from function'
  // };

  // Receive (Snap shot) from documentRef
  documentRef.update(updateData).then(()=> {
    console.log('Document update successful');
  }).catch((error)=>{
    // The document problably doesn't exist
    console.error('Error updating document :' , error)
  })
}

export const deleteDocument = (id) => {
  //id = 'yjYvUoGKEf9Wq4V2VJhx';
  const documentRef = firestore.collection('projects').doc(id);
  documentRef.delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
  });
}


export default firebase;