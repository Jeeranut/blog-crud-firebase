import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAi28hdFhvQ2wvZbP41wDp3ZDOtxGH06PU",
    authDomain: "marioplan-b8b00.firebaseapp.com",
    databaseURL: "https://marioplan-b8b00.firebaseio.com",
    projectId: "marioplan-b8b00",
    storageBucket: "marioplan-b8b00.appspot.com",
    messagingSenderId: "690627345034",
    appId: "1:690627345034:web:907cba7234f539d94dcb73",
    measurementId: "G-HQZNX7QLKV"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export auth  & firestore function
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Set up Google Auth Provider & configure prompt mode
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account' });
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
}

// Create user to Users'Doc
export const createUserProfileDoc = async (user , additionalData) => {
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
    const { displayName , email } = user;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName ,
        email ,
        createdAt ,
        ...additionalData
      })

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
    const { authorFirstName , authorLastName , title , content } = doc.data();

    return{
      id : doc.id ,
      authorFirstName ,
      authorLastName ,
      title ,
      content
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