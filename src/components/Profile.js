import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import ProfileDetails from './ProfileDetails'
import { Button,Carousel } from 'react-bootstrap';
import CarrouselEvent from './CarrouselEvent';






export default class Profile extends Component {



    render() {
        return (
            <div >
            { !this.props.loggedInUser ? <Redirect to="/" />:null}
                <div>
                    <ProfileDetails loggedInUser={this.props.loggedInUser} />
                </div>

                <div >
                    <h1>EVENTS</h1>
                        <div style={{display:'flex', justifyContent:'space-arround'}}>
                            <div style={{display:'flex', flexDirection:'column' }}>
                                <Link to='/myevents'><Button>My Events</Button></Link>
                                <Link to='/eventlist'><Button>Find Events</Button></Link>
                            </div>
                            <div>
                            <CarrouselEvent loggedInUser={this.props.loggedInUser} />
                            </div>
                        </div>
                </div>

                <div>
                    <h1>FOLLOW</h1>
                    <Link to='/following'> <Button>FOLLOWING</Button></Link>
                    <Link to='/allusers'><Button>Search People</Button></Link>
                </div>

                <div>
                   <h1>VAULT</h1>
                   <Link to='/thevault'><Button>The Vault</Button></Link>
                   <Link to='/vaultfavs'><Button>Vault Favs</Button></Link>
                   <Link to='/myvault'><Button>My Vaults</Button></Link>
                </div>
        
            </div>
        )
    }
}
