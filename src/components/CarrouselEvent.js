import React, { Component } from 'react';
import axios from 'axios';
import {API_URL} from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import './Carousel.css'
import './Main.css'
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';



export default class CarrouselEvent extends Component {


    state = {
        events: [],
        filteredEvents:[],
        loggedInUser: null,
    }

    getEvents = () => {
      console.log(this.props.loggedInUser)
      axios.get(`${API_URL}/events`,{withCredentials:true})
      .then ((res)=>{
        let notUserEvents = res.data.filter((event) => {
          return event.created_by._id !== this.props.loggedInUser._id
        })
        notUserEvents = notUserEvents.map((event) => {
          let count = 0;
          event.keywords.forEach((keyword) => {
            this.props.loggedInUser.wantToLearns.forEach((wantToLearn) => {
              if (wantToLearn.toLowerCase() === keyword.toLowerCase()) {
                count++
              }
            })
          })
          event.percentage = count ? (count/ event.keywords.length) * 100 : 0
          return event
        })
        this.setState({
          events: notUserEvents,
          loggedInUser: this.state.loggedInUser || this.props.loggedInUser,
          filteredEvents: notUserEvents,
        })
      })
    }

    getUser = () => {
      axios.get(`${API_URL}/user`,{withCredentials:true})
      .then ((res)=>{    
        this.setState({
          loggedInUser: res.data
        }, () => {
          this.getEvents()
        })
      })
    }

    componentDidMount(){
        if(this.props.loggedInUser){
         this.getEvents()
        }
        else {
          this.getUser()
        }
    }

    render() {
        const {filteredEvents}=this.state 
       
        return (
                      <Carousel className="container-carousel">
                      {
                        filteredEvents.map((event)=>{
                          return (
                            <Carousel.Item id="carousel-item">
                              <img
                              className="d-block w-20 carousel-img"
                               src={event.image}
                              alt={event.title}
                              />
                              <Carousel.Caption>
                              <h3>{event.title} by {event.created_by.username} {event.created_by.secondname}</h3>
                              <p>{event.description}</p>
                              {this.props.joinedEventIds.length && this.props.joinedEventIds.includes(event._id) ?  <Button id="button-general-bigger" onClick={() => this.props.onUnJoin(event._id) }>UNJOIN</Button>:  <Button id="button-general-bigger" onClick={() => this.props.onJoin(event._id)}>JOIN</Button>}
                              </Carousel.Caption>
                          </Carousel.Item>
                          
                          )
                        })
                      }
               
                      </Carousel>           
        )
    }
}
