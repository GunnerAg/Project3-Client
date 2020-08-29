import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default class User extends Component {
    render() {
        const{username,secondname,email,description,image,howToKnows,_id}=this.props.user

        const{onUnFollow,onFollow,loggedInUser,from}=this.props
        if(!loggedInUser){
            return <Redirect to='/signin'/>
        }
        
        
        let unfollowBtn = <Button onClick={()=>onUnFollow(_id)}>UNFOLLOW</Button>
        let followBtn = <Button onClick={()=>onFollow(_id)}>FOLLOW</Button>
        let checkFrom = from === 'FollowingList'
        return (
            <div>
                <p>{username}</p>
                <p>{secondname}</p>
                <p>{email}</p>
                <p>{description}</p>
                <p>{image}</p>
                <p>{howToKnows}</p>
                { checkFrom ? unfollowBtn : followBtn }
            </div>
        )
    }
}
