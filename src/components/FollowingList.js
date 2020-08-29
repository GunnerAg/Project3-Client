import React, { Component } from 'react';
import User from './User'
import axios from 'axios';
import {API_URL} from '../config';
import SearchBar from './SearchBar';


export default class FollowingList extends Component {

    state={
        loggedInUser:null,
        following:[],
        filteredFollowing:[],
    }

    getFollowing=()=>{
        axios.get(`${API_URL}/allusers`,{withCredentials:true})
        .then((res)=>{
            console.log('THE ONE YOU WANT',this.props.loggedInUser)
            let followedUsers =res.data.filter((user)=>{
              return this.props.loggedInUser.follow.includes(user._id )
                })
            this.setState({
                loggedInUser: this.state.loggedInUser || this.props.loggedInUser,
                following: followedUsers,
                filteredFollowing: followedUsers,
                followingUsersIds: this.props.loggedInUser.follow || []
            })
        })
    }

    getUser = () => {
        axios.get(`${API_URL}/user`,{withCredentials:true})
        .then ((res)=>{    
          this.setState({
            loggedInUser: res.data,
          }, () => {
            this.getFollowing()
          })
        })
      }

    componentDidMount(){
        if(this.props.loggedInUser){
         this.getFollowing()
        }
        else {
          this.getUser()
        }
    }

    render() {
        const{filteredFollowing}=this.state

        if (!this.state.loggedInUser){
            return <div>Loading User . . .  </div>
        }

        let filterSearchFollowing = filteredFollowing

        if(this.props.SearchPage === 'FollowingList' && this.props.SearchTerm !==''){
            filterSearchFollowing=filterSearchFollowing.filter((user)=>{
                let bool= false;
                user.howToKnows.forEach((howToKnow) => {
                    if(howToKnow.toLowerCase().includes(this.props.SearchTerm.toLowerCase())){
                        bool=true
                    }
                })
                return bool
            })
        }


        return (
            <div>   
                <SearchBar onSearch={this.props.onSearch} from={'FollowingList'} />
            <div>{filterSearchFollowing.map((user)=>{
                return <User loggedInUser={this.state.loggedInUser} from={'FollowingList'} user={user} onUnFollow={this.props.onUnFollow}/>
            })}
            </div>
        </div>
        )
    }
}



