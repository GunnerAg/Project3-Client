import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import ProfileDetails from './ProfileDetails'
import { Button } from 'react-bootstrap';

export default class Profile extends Component {
    render() {
        return (
            <div>
            { !this.props.loggedInUser ? <Redirect to="/" />:null}
                <div>
                    <ProfileDetails loggedInUser={this.props.loggedInUser} />
                    <Link to='/following'> <Button>FOLLOWING</Button></Link>
                </div>

                <div>
                    <h1>EVENTS</h1>
                    <Link to='/myevents'><Button>My Events</Button></Link>
                    <Link to='/eventlist'><Button>Find Events</Button></Link>
                </div>

                <div>
                    <h1>FOLLOW</h1>
                    <Link to='/allusers'><Button>Search People</Button></Link>
                </div>

                <div>
                   <h1>VAULT</h1>
                </div>
        
            </div>
        )
    }
}
