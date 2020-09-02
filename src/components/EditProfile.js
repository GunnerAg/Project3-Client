import React, { Component } from 'react';
import { Button,Form } from 'react-bootstrap';
import axios from 'axios';
import {API_URL} from '../config';

export default class EditProfile extends Component {

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

    onChange=(event)=>{
       let value = event.currentTarget.value;
       let property = event.currentTarget.name;
       let clonedProfile = JSON.parse(JSON.stringify(this.state.profileInfo))
       if (property === 'image') {
        clonedProfile[property] =  event.currentTarget.files[0]
       }
       else {
        clonedProfile[property]=value
       }
       this.setState({
          profileInfo:clonedProfile
       })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let clonedProfile = JSON.parse(JSON.stringify(this.state.profileInfo))  
        if (e.currentTarget.image.value) {
            clonedProfile.image = e.currentTarget.image.files[0]
        }     
        console.log(clonedProfile)    
        this.props.onEdit(e,clonedProfile)
    }
      
    render() {
        const{ username,secondname,email,_id, description,howToKnows ,wantToLearns } = this.state.profileInfo
        return (
            <div>
                <div className='edit-profile-form-container'>
                    <Form onSubmit={this.handleSubmit}> 
                    <Form.Group controlId="formGroupUsername">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={this.onChange} value={username} type='text' name='username'/>
                    </Form.Group>
                    <Form.Group controlId="formGroupSecondname">
                        <Form.Label>Secondname</Form.Label>
                        <Form.Control onChange={this.onChange} value ={secondname} type='text' name='secondname' />
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={this.onChange} value ={email} type='text' name='email' />
                    </Form.Group>
                    <Form.Group controlId="formGroupDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={this.onChange} value ={description} type='text' name='description' />
                    </Form.Group>
                    <Form.Group controlId="formGroupKnowledge">
                        <Form.Label>Knowledge</Form.Label>
                        <Form.Control onChange={this.onChange} value ={howToKnows} type='text' name='howToKnows' />
                    </Form.Group>
                    <Form.Group controlId="formGroupToLearn">
                        <Form.Label>To Learn</Form.Label>
                        <Form.Control onChange={this.onChange} value ={wantToLearns} type='text' name='wantToLearns' />
                    </Form.Group>
                    <Form.Group>
                        <Form.File type='file' name='image' />
                    </Form.Group>
                    <Button id="button-general" type='submit'>Edit</Button>
                    </Form>
                </div>
                <div>
                    <Button onClick={()=>{this.props.onDeleteUser(_id)}} id="button-general" >Delete Account</Button>
                </div>
            </div>
        )
    }
}


// this.handleDeleteUser(_id)

                
