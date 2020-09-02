import React, { Component } from 'react';
import Event from './Event';
import SearchBar from './SearchBar';
import axios from 'axios';
import {API_URL} from '../config';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Profile.css';

export default class EventList extends Component {

    state = {
        events: [],
        loggedInUser: null,
        filteredEvents:[],
    }
    
    getEvents = () => {
      console.log(this.props.loggedInUser)
      axios.get(`${API_URL}/events`,{withCredentials:true})
      .then ((res)=>{
        let userEvents = res.data.filter((event) => {
          return event.created_by._id === this.props.loggedInUser._id
        })
        // userEvents = userEvents.map((event) => {
        //   let count = 0;
        //   event.keywords.forEach((keyword) => {
        //     this.props.loggedInUser.wantToLearns.forEach((wantToLearn) => {
        //       if (wantToLearn.toLowerCase() === keyword.toLowerCase()) {
        //         count++
        //       }
        //     })
        //   })
        //   event.percentage = count ? (count/ event.keywords.length) * 100: 0
        //   return event
        // })
        this.setState({
          events: userEvents,
          loggedInUser: this.state.loggedInUser || this.props.loggedInUser,
          filteredEvents: userEvents,
           joinedEventIds: this.props.loggedInUser.joinEvents || []
        })
      })
    }

    getUser = () => {
      axios.get(`${API_URL}/user`,{withCredentials:true})
      .then ((res)=>{    
        this.setState({
          loggedInUser: res.data
        }, () => {
          console.log(this.state.loggedInUser)
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

    componentDidUpdate(newProps){
      if (newProps.joinedEventIds.length !== this.props.joinedEventIds.length ) {
          this.getEvents()

      }
  }

  handleDeleteEvent=(eventId)=>{
    axios.delete(`${API_URL}/event/${eventId}/delete`,{withCredentials:true})
    .then(()=>{
        this.getEvents()
    })
  }

    render() {
   
      let filterSearchEvents = this.state.filteredEvents
      if (this.props.SearchPage === 'myEvents' && this.props.SearchTerm !== ''){
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
            <div>
                <Link to='/addEvent'><Button id="button-general">Add Event</Button></Link>
                <SearchBar onSearch={this.props.onSearch} searchTerm={this.props.searchTerm} from={'myEvents'} />
                <div>
                <div className='event-list-container'>{filterSearchEvents.map((event)=>{
                    return   <Event loggedInUser={this.props.loggedInUser}  joinedEventIds={this.props.joinedEventIds} from={'myEvents'} event={event} btnClass={'DELETE/UNJOIN'} onDelete={this.handleDeleteEvent}  onUnjoin={this.props.onUnjoin}/>
                })}
                </div>
                </div>
                {/* <h1> EVENTS </h1>
                {this.state.userEvents.map((event)=>{
                    return   <Event event={event} btnClass={'DELETE/UNJOIN'} onClick={this.handleChange}/>
                })} */}
               
            </div>
        )
    }
}


