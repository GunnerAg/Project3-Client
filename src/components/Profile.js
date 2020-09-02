import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import ProfileDetails from './ProfileDetails'
import { Button } from 'react-bootstrap';
import CarrouselEvent from './CarrouselEvent';
import CarrouselFollow from './CarrouselFollow';
import './Profile.css';
import './Main.css'






export default class Profile extends Component {



    render() {
        return (
            <div >
            { !this.props.loggedInUser ? <Redirect to="/" />:null}
                <div>
                    <ProfileDetails loggedInUser={this.props.loggedInUser} />
                </div>
                
                <div >
                        <div className="event-carousel-container">
                            <div className="event-button-container">
                                <div>
                                    <h3><strong>Welcome to events section!</strong></h3>
                                    <h4>Search for events, join them or create your own !
                                    find people with common interests to meet! </h4>
                                    <Link to='/myevents'><Button id="button-general">My Events</Button></Link>
                                    <Link to='/eventlist'><Button id="button-general">Find Events</Button></Link>
                                </div>
                            </div>
                            <div className='test'>
                            <CarrouselEvent onJoin={this.props.onJoin} onUnJoin={this.props.onUnJoin} joinedEventIds={this.props.joinedEventIds} loggedInUser={this.props.loggedInUser} />
                            </div>
                        </div>
                </div>

                <div >
                        <div className="follow-carousel-container">
                            <div >
                                <CarrouselFollow loggedInUser={this.props.loggedInUser} />
                            </div>
                            <div className="follow-button-container">
                            <div>
                                <h3><strong>Welcome to the profiles section!</strong></h3>
                                <h4>Search for other users by their knowledge, follow them 
                                and find their events and vault uploads faster! </h4>
                                <Link to='/following'> <Button id="button-general">Followed</Button></Link>
                                <Link to='/allusers'><Button id="button-general">Search People</Button></Link>
                            </div>
                            </div>
                        </div>
                </div>
                <div className="vault-button-container">
                   <Link to='/vaultfavs'><Button id="button-general">Vault Favs</Button></Link>
                   <Link to='/thevault'> <img className="vault-image" src= 'https://res.cloudinary.com/dzzpwrdae/image/upload/v1598989547/theVaultBtn_xuznyn.png' alt='vaultImage'/></Link>
                   <Link to='/myvault'><Button id="button-general">My Vaults</Button></Link>
                </div>
            </div>
        )
    }
}
