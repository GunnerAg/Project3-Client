import React, { Component } from 'react';
import Event from './Event';
import axios from 'axios';
import {API_URL} from '../config';
import SearchBar from './SearchBar';
import './Profile.css';


export default class EventList extends Component {


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
    
    componentDidUpdate(newProps){
      if (newProps.joinedEventIds.length !== this.props.joinedEventIds.length ) {
          this.getEvents()

      }
  }

  

    render() {
        const {filteredEvents}=this.state 

        if (!this.state.loggedInUser) {
          return <div>Loading . . .  </div>
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
        <div >
            <SearchBar onSearch={this.props.onSearch} from={'allEvents'} searchTerm={this.props.searchTerm} />
            <div className='event-list-container'>{filterSearchEvents.map((event)=>{
                   return <Event loggedInUser={this.state.loggedInUser} from={'allEvents'} event={event} joinedEventIds={this.props.joinedEventIds}  onJoin={this.props.onJoin}  onUnJoin={this.props.onUnJoin}/>
               })}
            </div>
        </div>
        )
    }
}
