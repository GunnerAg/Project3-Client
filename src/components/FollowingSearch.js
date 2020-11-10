import React, { Component } from 'react'
import axios from 'axios';
import {API_URL} from '../config';
import SearchBar from './SearchBar';
import User from './User'

export default class FollowingSearch extends Component {

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
        document.body.style.backgroundColor = 'rgb(200, 155, 211)'
        if(this.props.loggedInUser){
         this.getAllUsers()
        }
        else {
          this.getUser()
        }
    }

    componentDidUpdate(newProps){
        if (newProps.followingUsersIds.length !== this.props.followingUsersIds.length ) {
            this.getAllUsers()

        }
    }

    render() {
        const{ unfollowedUsers, loggedInUser } = this.state
        const{ onSearch, onFollow } = this.props

        if (!this.state.loggedInUser){
            return <div>Loading User . . .  </div>
        }

         let unfollowedSearchUsers = unfollowedUsers

        if(this.props.SearchPage ==='FollowingSearch' && this.props.SearchTerm !==''){
            unfollowedSearchUsers=unfollowedSearchUsers.filter((unfollowed)=>{
                let bool = false;
                unfollowed.howToKnows.forEach((howToKnow)=>{
                    if(howToKnow.toLowerCase().includes(this.props.SearchTerm.toLowerCase()))
                    {
                        bool= true
                    }
                    else if(unfollowed.username.toLowerCase().includes(this.props.SearchTerm.toLowerCase()))
                    {
                        bool= true
                    }
                })
                return bool
            })
        }

    

        return (
            <div className='follow-search-container'>
                <SearchBar onSearch={onSearch} from={'FollowingSearch'} id='SearchBar' />
                    <div className='users-list'>
                        {unfollowedSearchUsers.map((user)=>{
                            return <User loggedInUser={loggedInUser} from={'FollowingSearch'} user={user} onFollow={onFollow} />
                        })}
                    </div>
            </div>
        )
    }
}
