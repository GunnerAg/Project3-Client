import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
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
        const{ username,secondname,email, description, howToKnows,wantToLearns } = this.state.profileInfo
        return (
            <div >
                <form onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input onChange={this.onChange} value={username} type='text' name='username'></input>
                    <label>Secondname</label>
                    <input onChange={this.onChange} value ={secondname} type='text' name='secondname'></input>
                    <label>Email</label>
                    <input onChange={this.onChange} value ={email} type='text' name='email'></input>
                    <label >Description</label>
                    <input onChange={this.onChange} value ={description} type='text' name='description'></input>
                    {/* <label>Image</label>
                    <input onChange={this.onChange} value ={image} type='text' name='image'></input> */}
                    <label>Knowledge</label>
                    <input onChange={this.onChange} value ={howToKnows} type='text' name='howToKnows'></input>
                    <label>To Learn</label>
                    <input onChange={this.onChange} value ={wantToLearns} type='text' name='wantToLearns'></input>

                    <label>Image</label>
                    <input type='file' name='image' ></input>
                    <Button type='submit'>Edit</Button>
                </form>
            </div>
        )
    }
}

