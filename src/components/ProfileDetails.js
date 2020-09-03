import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {API_URL} from '../config';
import { ListGroup, Button, Row, Image, Col } from 'react-bootstrap';
import './ProfileDetails.css'





export default class ProfileDetails extends Component {

    state = {
        profileInfo: {},
        howToKnows:[],
        wantToLearns:[],
     }
      
      componentDidMount(){   
            axios.get(`${API_URL}/profile`,{withCredentials:true})
            .then ((res)=>{
              this.setState({
                profileInfo: res.data,
                wantToLearns:res.data.wantToLearns,
                howToKnows:res.data.howToKnows
                
              })
              })
              .catch((err)=>{
                return err
            })   
      }
      
          
        render() {
            let howToKnow=this.state.howToKnows.toString().split('')
            let wantToLearn=this.state.wantToLearns.toString().split('')
            const{profileInfo} = this.state
            return (
            <div className='profile-details-section'>
            <div className='welcome-message'>
            <h1>Hi there {profileInfo.username} welcome to your profile</h1>
            </div>
            <div className='profile-details-container'>
                <div className="profile-pic" >
                    <Col xs={6} md={4}>
                        <Image id="profile-pic" src={profileInfo.image} rounded   />
                    </Col>  
                </div>
                <div >
                    {
                        profileInfo  && (
                    <ListGroup className='list-group' variant="flush" >
                        {profileInfo.username && <ListGroup.Item id='profile-info'>{profileInfo.username}</ListGroup.Item>}
                        {profileInfo.secondname && <ListGroup.Item id='profile-info'>{profileInfo.secondname}</ListGroup.Item>}
                        {profileInfo.email && <ListGroup.Item id='profile-info'>{profileInfo.email}</ListGroup.Item>}
                        {profileInfo.description && <ListGroup.Item id='profile-info'>{profileInfo.description}</ListGroup.Item>}
                        {profileInfo.howToKnows && <ListGroup.Item id='profile-info'>{howToKnow}</ListGroup.Item>}
                        {profileInfo.wantToLearns && <ListGroup.Item id='profile-info'>{wantToLearn}</ListGroup.Item>}
                    </ListGroup>
                        ) 
                    }
                   <Link to='/profile/edit' loggedInUser={this.props.loggedInUser}> <Button id="button-general">EDIT</Button></Link>
                </div> 
            </div>
        </div>
        )
    }
}
