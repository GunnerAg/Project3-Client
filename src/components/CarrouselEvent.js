import React, { Component } from 'react';
import axios from 'axios';
import {API_URL} from '../config';
// import CarouselItem from './CarouselItem';
import 'bootstrap/dist/css/bootstrap.min.css';

import Carousel from 'react-bootstrap/Carousel'


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
          return event.created_by !== this.props.loggedInUser._id
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

        if (!this.state.loggedInUser) {
          return <div>Loading User . . .  </div>
        } 

        let filterSearchEvents = filteredEvents
   
        if (this.props.SearchPage === 'allEvents' && this.props.SearchTerm !== ''){
          filterSearchEvents  = filterSearchEvents.filter((event) => {
            let bool = false;
            event.keywords.forEach((keyword) => {
              if (keyword.toLowerCase().includes(this.props.SearchTerm.toLowerCase())) {
                bool = true
              }
            })
            return bool
          })
        }   

        return (
                      <Carousel>
                      {
                        filterSearchEvents.map((event)=>{
                          return (
                            <Carousel.Item>
                              <img
                              className
                              // className="d-block w-20"
                               src={event.image}
                             // src={'https://image.shutterstock.com/image-photo/natural-yellow-butterfly-isolated-on-260nw-1270220995.jpg'}
                              alt={event.title}
                              />
                              <Carousel.Caption>
                              <h3>{event.title} by {event.created_by}</h3>
                              <p>{event.description}</p>
                              </Carousel.Caption>
                          </Carousel.Item>
                          )
                        })
                      }
               
                      </Carousel>
                    
        )
    }
}
