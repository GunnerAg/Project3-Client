import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import ProfileDetails from './ProfileDetails'
import EventList from './EventList'
import { Button } from 'react-bootstrap';

export default class Profile extends Component {
    render() {
        return (
            <div>
            { !this.props.loggedInUser ? <Redirect to="/" />:null}
                <div>
                    <ProfileDetails loggedInUser={this.props.loggedInUser} />
                    <Link to='#dummy'> <Button>FOLLOWING</Button></Link>
                </div>

                <div>
                    <h1>EVENTS</h1>
                    <Link to='/myevents'><Button>My Events</Button></Link>
                    <Link to='/eventlist'><Button>Find Events</Button></Link>
                </div>

                <div>
                   <h1>VAULT</h1>
                </div>
        
            </div>
        )
    }
}
