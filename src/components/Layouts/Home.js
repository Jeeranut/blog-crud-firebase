import React from 'react'

import requireAuth from '../requireAuth'
import PostList from '../Posts/PostList'


class Home extends React.Component {

    render(){
        return (
            <div>
                <PostList />
            </div>
        )
    }
}
export default requireAuth(Home);
