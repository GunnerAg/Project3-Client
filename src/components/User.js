import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import './User.css'

export default class User extends Component {
    render() {
        const{username,secondname,email,description,image,howToKnows,_id}=this.props.user

        const{onUnFollow,onFollow,loggedInUser,from}=this.props
        if(!loggedInUser){
            return <Redirect to='/signin'/>
        }
        
        let unfollowBtn = <Button id="button-general" onClick={()=>onUnFollow(_id)}>UNFOLLOW</Button>
        let followBtn = <Button id="button-general" onClick={()=>onFollow(_id)}>FOLLOW</Button>
        let checkFrom = from === 'FollowingList'
        return (
            <div className='users-to-follow'>
                <div className='user-image'>
                    <Image id="follow-pic" src={image} thumbnail />
                </div>
                <div className='user-details'>
                    <h5><stong>Username</stong></h5>
                    <p>{username} {secondname}</p>
                    <h5><stong>Email</stong></h5>
                    <p>{email}</p>
                    {description? (<div className='description-info'><h5><stong>Description</stong></h5><p>{description}</p></div>):null}
                    <h5><stong>Knowledge</stong></h5>
                    <p>{howToKnows && howToKnows.join(', ')}</p>

                    { checkFrom ? unfollowBtn : followBtn }
                </div>
            </div>
        )
    }
}
