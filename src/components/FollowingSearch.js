import React, { Component } from 'react'
import axios from 'axios';
import {API_URL} from '../config';
import SearchBar from './SearchBar';
import User from './User'

export default class FollowingSearch extends Component {

    state={
        loggedInUser:null,
        allUsers:[],
        filteredAllUsers:[],
    }

    getAllUsers=()=>{
        axios.get(`${API_URL}/allusers`,{withCredentials:true})
        .then((res)=>{
            console.log('get all users------>', res.data)
            // let notFollowedUsers = res.data.filter((user) =>{
            //     return this.props.loggedInUser.follow.includes(!user._id)
                // let bool = false;
                // return this.props.loggedInUser.follow.forEach((followedUser)=>{
                //     if(followedUser !== user._id){
                //         bool=true 
                //     }
                //     return bool                    
                // })               
            // }) 
            this.setState({
                loggedInUser: this.state.loggedInUser || this.props.loggedInUser,
                allUsers: res.data
            })
            console.log('after the filter!',this.state.allUsers)    
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
        const {onSearch, searchTerm} = this.props
        return (
            <div>
                <SearchBar onSearch={onSearch} searchTerm={searchTerm} from={'followingSearch'} />
                    <div>{this.state.allUsers.map((user)=>{
                            return <User loggedInUser={this.state.loggedInUser} from={'followingSearch'} user={user} onFollow={this.props.onFollow} />
                        })}
                    </div>
            </div>
        )
    }
}
