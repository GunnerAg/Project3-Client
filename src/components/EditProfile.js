import React, { Component } from 'react';
import { Button,Form } from 'react-bootstrap';
import axios from 'axios';
import MultiSelect from './MultiSelect'
import {API_URL} from '../config';
import './EditProfile.css'

export default class EditProfile extends Component {

    state = {
        profileInfo: {},
        warning:false,
        
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

    onChange=(event, isMulti, name, val)=>{
        console.log(val)
       let value = event ? event.currentTarget.value: '';
       let property = event? event.currentTarget.name: '';
       let clonedProfile = JSON.parse(JSON.stringify(this.state.profileInfo))
       console.log(value)
       if (property === 'image') {
        clonedProfile[property] =  event.currentTarget.files[0]
       }
       else if (isMulti) {
        // val===null? val='':
        value = val ? val.map((elem) => elem.value): []
        clonedProfile[name] = value
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

    handleWarning=()=>{
        this.setState({
            warning: !this.state.warning
        })
    }
      

    render() {
        const{ username,secondname,email,_id, description,howToKnows=[] ,wantToLearns=[] } = this.state.profileInfo
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
                        <MultiSelect  onChange={this.onChange} value ={howToKnows} name='howToKnows' />
                    </Form.Group>
                    <Form.Group controlId="formGroupToLearn">
                        <Form.Label>To Learn</Form.Label>
                        <MultiSelect  onChange={this.onChange} value ={wantToLearns} name='wantToLearns'  />
                    </Form.Group>
                    <Form.Group>
                        <Form.File type='file' name='image' />
                    </Form.Group>
                    <div className='edit-btns'>
                    <Button id="button-general" type='submit'>Edit</Button>
                     { this.state.warning ? 
                        (<div><Button  onClick={()=>{this.props.onDeleteUser(_id)}} id="button-general-final-delete" >Yes</Button> 
                        <Button  onClick={this.handleWarning} id="button-general">No</Button></div>
                        ):
                        <Button  onClick={this.handleWarning} id="button-general" >Delete Account</Button>}
                    
                    </div>
                    </Form>
                </div>
            </div>
        )
    }
}

                
