import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';

export default class User extends Component {
    render() {
        const{username,secondname,email,description,image,howToKnows,_id}=this.props.user

        const{onUnFollow,onFollow,loggedInUser,from}=this.props
        if(!loggedInUser){
            return <Redirect to='/signin'/>
        }
        
        //TODO: Fix css
        let unfollowBtn = <Button id="button-general" onClick={()=>onUnFollow(_id)}>UNFOLLOW</Button>
        let followBtn = <Button id="button-general" onClick={()=>onFollow(_id)}>FOLLOW</Button>
        let checkFrom = from === 'FollowingList'
        return (
            <div style={{display:'flex', justifyContent:'space-evenly', flexWrap:'wrap'}}>
                <div>
                    <p>{username}</p>
                    <p>{secondname}</p>
                    <p>{email}</p>
                    <p>{description}</p>
                    <p>{howToKnows}</p>
                    { checkFrom ? unfollowBtn : followBtn }
                </div>
                <div>
                    <Image className="followPic" src={image} thumbnail />
                </div>
            </div>
        )
    }
}
