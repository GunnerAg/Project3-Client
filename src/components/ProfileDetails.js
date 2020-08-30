import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {API_URL} from '../config';
import { ListGroup, Button, Row, Image, Col } from 'react-bootstrap';





export default class ProfileDetails extends Component {

    state = {
        profileInfo: {},
     }
      
      componentDidMount(){   
            axios.get(`${API_URL}/profile`,{withCredentials:true})
            .then ((res)=>{
              this.setState({
                profileInfo: res.data
              })
              })
              .catch((err)=>{
                return err
            })
      }
          
        render() {
            const {profileInfo} = this.state
            console.log(profileInfo)
        return (
            <div style={{display:'flex', justifyContent:'space-evenly', }}>
                <div >
                    <h2>Welcome {profileInfo.username} to your profile.</h2>
                    {
                        profileInfo  && (
                            
                    <ListGroup variant="flush" >
                        {profileInfo.username && <ListGroup.Item>{profileInfo.username}</ListGroup.Item>}
                        {profileInfo.secondname && <ListGroup.Item>{profileInfo.secondname}</ListGroup.Item>}
                        {profileInfo.email && <ListGroup.Item>{profileInfo.email}</ListGroup.Item>}
                        {profileInfo.description && <ListGroup.Item>{profileInfo.description}</ListGroup.Item>}
                        {profileInfo.howToKnows && <ListGroup.Item>{profileInfo.howToKnows}</ListGroup.Item>}
                        {profileInfo.wantToLearns && <ListGroup.Item>{profileInfo.wantToLearns}</ListGroup.Item>}
                    </ListGroup>
                        )
                    }
                   <Link to='/profile/edit' loggedInUser={this.props.loggedInUser}> <Button>EDIT</Button></Link>
                </div> 
                <div>
                    <Row>
                        <Col xs={6} md={4}>
                            <Image src="holder.js/171x180" thumbnail />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
