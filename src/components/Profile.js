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
                                    <h3><strong>Welcome to events section!</strong></h3>
                                    <h4>Search for events, join them or create your own !
                                    find people with common interests to meet! </h4>
                                    <div className='sections-btn-container'>
                                    <Link to='/myevents'><Button id="button-general">My Events</Button></Link>
                                    <Link to='/eventlist'><Button id="button-general">Find Events</Button></Link>
                                    </div>
                            </div>
                            <div className='wrapper-carousel'>
                            <CarrouselEvent onJoin={this.props.onJoin} onUnJoin={this.props.onUnJoin} joinedEventIds={this.props.joinedEventIds} loggedInUser={this.props.loggedInUser} />
                            </div>
                        </div>
                </div>

                <div >
                        <div className="follow-carousel-container">
                            <div className='wrapper-carousel'>
                                <CarrouselFollow onFollow={this.props.onFollow} onUnFollow={this.props.onUnFollow} from={'FollowingList'} loggedInUser={this.props.loggedInUser} />
                            </div>
                            <div className="follow-button-container">
                                <h3><strong>Welcome to the profiles section!</strong></h3>
                                <h4>Search for other users by their knowledge, follow them 
                                and find their events and vault uploads faster! </h4>
                                <div className='sections-btn-container'>
                                <Link to='/following'> <Button id="button-general">Following</Button></Link>
                                <Link to='/allusers'><Button id="button-general">Follow People</Button></Link>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="vault-button-container">
                        <div className='my-vault-container'>
                                <h3><strong>Your Vaults</strong></h3>
                            <Link to='/myvault' className='vault-link1'><Button id="button-general">My Vaults</Button></Link>
                        </div>
                        <div className='the-vault-container'>
                                <h3><strong>The Vault Section</strong></h3>
                                <img className="vault-image" src='https://res.cloudinary.com/dzzpwrdae/image/upload/v1598989547/theVaultBtn_xuznyn.png' alt='vaultImage'/>
                            <Link to='/thevault'><Button id="button-general">The Vault</Button></Link>
                        </div>
                        <div className='fav-vault-container'>
                                <h3><strong>Favorite Vaults</strong></h3>
                            <Link to='/vaultfavs' className='vault-link2'><Button id="button-general">Vault Favs</Button></Link>
                        </div>
                </div>
        </div>
        )
    }
}
