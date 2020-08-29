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
                return this.props.loggedInUser.follow.includes(user._id) === false
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
        if(this.props.loggedInUser){
         this.getAllUsers()
        }
        else {
          this.getUser()
        }
    }

    render() {
        const{ unfollowedUsers, allUsers, loggedInUser } = this.state
        const{ onSearch, searchTerm, onFollow, SearchPage } = this.props

        if (!this.state.loggedInUser){
            return <div>Loading User . . .  </div>
        }

        let searchFilterAllUsers = unfollowedUsers

        if(SearchPage==='followingSearch' && searchTerm!==''){
            searchFilterAllUsers=searchFilterAllUsers.filter((unfollowed)=>{
                let bool = false;
                unfollowed.howToKnows.forEach((howToKnow)=>{
                    if(howToKnow.toLowerCase().includes(searchTerm.toLowerCase()))
                    {
                        bool= true
                    }
                })
                return bool
            })
        }

        return (
            <div>
                <SearchBar onSearch={onSearch} searchTerm={searchTerm} from={'followingSearch'} />
                    <div>{unfollowedUsers.map((user)=>{
                            return <User loggedInUser={loggedInUser} from={'followingSearch'} user={user} onFollow={onFollow} />
                        })}
                    </div>
            </div>
        )
    }
}
