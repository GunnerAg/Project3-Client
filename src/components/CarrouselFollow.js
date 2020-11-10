import React, { Component } from 'react'
import axios from 'axios';
import {API_URL} from '../config';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import './Carousel.css'
import './Main.css'

export default class CarrouselFollow extends Component {

    state={
        loggedInUser:null,
        allUsers:[],
        unfollowedUsers:[],
    }

    getAllUsers=()=>{
        axios.get(`${API_URL}/allusers`,{withCredentials:true})
        .then((res)=>{
            let filterAllUsers = res.data.filter((user)=>{
                return this.props.loggedInUser.follow.includes(user._id) === false && user._id !== this.props.loggedInUser._id
            })
            this.setState({
                loggedInUser: this.state.loggedInUser || this.props.loggedInUser,
                allUsers: res.data,
                unfollowedUsers: filterAllUsers
            }) 
        })
    }

    getUser = () => {
        axios.get(`${API_URL}/user`,{withCredentials:true})
        .then ((res)=>{    
          this.setState({
            loggedInUser: res.data,
          }, () => {
            this.getAllUsers()
          })
        })
      }

    componentDidMount(){
        if(this.props.loggedInUser){
         this.getAllUsers()
        }
        else {
          this.getUser()
        }
    }

    render() {
        const {unfollowedUsers}=this.state 
    return (
      
        <Carousel className="container-carousel" >
        {
            unfollowedUsers.map((user)=>{
            return (
              <Carousel.Item>
                <img
                className="d-block w-20 carousel-img"
                src={user.image}
                alt={user.username}
                />
              
                <Carousel.Caption>
                <h5><strong>{user.username} {user.secondname}</strong></h5>
                <p><strong>{user.howToKnows && user.howToKnows.join(', ').split(',').slice(0,7)}</strong></p>
                { this.props.loggedInUser.follow.includes(user._id) ? <Button id="button-general-bigger" disabled >ADDED</Button> : <Button id="button-general-bigger" onClick={()=>this.props.onFollow(user._id)}>FOLLOW</Button> }
                </Carousel.Caption>
            </Carousel.Item>
            )
          })
        }
 
        </Carousel>           
)
}
}