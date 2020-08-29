import React from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import EventList from './components/EventList';
import AddEvent from './components/AddEvent';
import MyEvents from './components/MyEvents';
import FollowingSearch from './components/FollowingSearch';
import FollowingList from './components/FollowingList';
import VaultList from './components/VaultList';
import VaultFavs from './components/VaultFavs';
import AddVaultItem from './components/AddVaultItem';
import axios from 'axios';
import {API_URL} from './config';
import {Switch, Route, withRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';





class App extends React.Component{
 
state = {
  signUpForm:false,
  signInForm:false,
  loggedInUser: null,
  joinedEventIds: [],
  // filteredEvents:[],
  SearchTerm: '',
  SearchPage: '',
  followingUsersIds:[],
  favVaultIds:[],
}

componentDidMount(){
  if(!this.state.loggedInUser){
    axios.get(`${API_URL}/user`,{withCredentials:true})
      .then ((res)=>{
        this.setState({
          loggedInUser: res.data,
          joinedEventIds: res.data.joinEvents || [],
          followingUsersIds: res.data.follow || [],
          favVaultIds: res.data.favVault || [],
        })
      })
  }
}

  showSignUp=()=>{
    this.setState({signUpForm:!this.state.signUpForm})
  };
  
  showSignIn=()=>{
    this.setState({signInForm:!this.state.signInForm})
  };

  handleSignIn = (e) => {
    e.preventDefault();
    const {email,password}=e.currentTarget;

    axios.post(`${API_URL}/signin`,{ email: email.value, password: password.value},{withCredentials:true})
      .then((res)=>{
        this.setState({
          loggedInUser: res.data
        }, () => {
          this.props.history.push('/profile')
        })
      })
  }

  handleSignUp = (e) => {
    e.preventDefault();
    const {username,email,password}=e.currentTarget;

    axios.post(`${API_URL}/signup`,{username: username.value, email: email.value, password: password.value},{withCredentials:true})
      .then((res)=>{
        this.setState({
          loggedInUser: res.data
        }, () => {
          this.props.history.push('/profile')
        })
      })
  }

  handleLogOut = (e) => {
    axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
      .then(() => {
        this.setState({
          loggedInUser: null
        }, ()=>{
          this.props.history.push('/')
        })
      })
  }

  handleEdit = (e,userInfo) => {
    e.preventDefault()
    axios.patch(`${API_URL}/profile/edit`,{userInfo},{withCredentials: true})
    .then(() => {
            this.props.history.push('/profile')
        })
  }
  
  handleAddEvent=(e,eventDetails)=>{
    console.log('inside handle events',e)
    axios.post(`${API_URL}/addEvent`,{eventDetails},{withCredentials:true})
    .then(()=>{
      this.props.history.push('/myEvents')
    })
  } 

  handleSearch = (term, page) => {
       this.setState({
         SearchTerm: term,
         SearchPage: page,
       })
  }

  handleJoin=(eventId)=>{
    axios.patch(`${API_URL}/profile/event/join`,{eventId},{withCredentials:true})
    .then(()=>{ 
        let cloneJoinedEventIds = JSON.parse(JSON.stringify(this.state.joinedEventIds))
        cloneJoinedEventIds.push(eventId)
        this.setState({
          joinedEventIds: cloneJoinedEventIds
        })
    })
  }

  handleUnJoin=(eventId)=>{
    axios.patch(`${API_URL}/profile/event/unjoin`,{eventId},{withCredentials:true})
    .then(()=>{
      let cloneJoinedEventIds = this.state.joinedEventIds.filter((id) => id !== eventId)
      this.setState({
        joinedEventIds: cloneJoinedEventIds
      })
    })
  }

  handleDeleteEvent=(eventId)=>{
    axios.delete(`${API_URL}/event/${eventId}/delete`,{withCredentials:true})
    .then(()=>{
      let cloneJoinedEventIds = this.state.joinedEventIds.filter((id) => id !== eventId)  
      this.setState({
        joinedEventIds : cloneJoinedEventIds
      })
    })
  }

  handleUnFollow=(userId)=>{
    axios.patch(`${API_URL}/profile/follow/unfollow`,{userId},{withCredentials:true})
    .then(()=>{
      let clonedFollowingUsersIds = this.state.followingUsersIds.filter((id)=> id !==userId)
      this.setState({
        followingUsersIds : clonedFollowingUsersIds
      })
    })
  }

  handleFollow=(userId)=>{
    axios.patch(`${API_URL}/profile/follow/follow`,{userId},{withCredentials:true})
    .then(()=>{
        let clonedfollowingUsersIds = JSON.parse(JSON.stringify(this.state.followingUsersIds))
        clonedfollowingUsersIds.push(userId)
        this.setState({
          followingUsersIds: clonedfollowingUsersIds
        })
    }) 
  }

  handleAddFav=(vaultItemId)=>{
    axios.patch(`${API_URL}/profile/vault/add`,{vaultItemId},{withCredentials:true})
    .then(()=>{
      let clonedFavVaultIds = JSON.parse(JSON.stringify(this.state.favVaultIds))
      clonedFavVaultIds.push(vaultItemId)
      this.setState({
        vaultItemId:clonedFavVaultIds
      })
    })
  }

  handleAddVaultItem=(e,vaultItemDetails)=>{
    axios.post(`${API_URL}/addVaultItem`,{vaultItemDetails},{withCredentials:true})
    .then(()=>{
      this.props.history.push('/profile')
    })
  } 

  // handleDeleteVaultItem=(vaultItemId)=>{
  //   axios.delete(`${API_URL}/event/${vaultItemId}/delete`,{withCredentials:true})
  //   .then(()=>{
  //     let clonefavVaultIds= this.state.favVaultIds.filter((id) => id !== vaultItemId)  
  //     this.setState({
  //       favVaultIds : clonefavVaultIds
  //     })
  //   })
  // }

  render() {
    const {loggedInUser,joinedEventIds,followingUsersIds,SearchTerm,SearchPage,favVaultIds} = this.state
    return (
    <div>
      <NavBar loggedInUser={loggedInUser} onLogOut={this.handleLogOut}/>
        <Switch >
          <Route exact path="/" render={(routeProps) => {
            return <Home {...routeProps} onSignUp={this.handleSignUp} onSignIn={this.handleSignIn} />
          }} />

          <Route exact path="/profile" render ={(routeProps)=>{
             return <Profile loggedInUser={loggedInUser} {...routeProps} />
          }}/>

          <Route  path="/profile/edit" render ={(routeProps)=>{
             return <EditProfile loggedInUser={loggedInUser} onEdit={this.handleEdit} {...routeProps}/>
          }}/>

          <Route exact path="/eventlist"  render ={(routeProps)=>{
            return <EventList SearchPage={SearchPage} SearchTerm={SearchTerm} joinedEventIds={joinedEventIds} onJoin={this.handleJoin} onUnJoin={this.handleUnJoin} onSearch={this.handleSearch} loggedInUser={loggedInUser} {...routeProps} />
          }}/>

          <Route  path="/myevents"  render ={(routeProps)=>{
             return <MyEvents  SearchPage={SearchPage} SearchTerm={SearchTerm} joinedEventIds={joinedEventIds} onSearch={this.handleSearch} loggedInUser={this.state.loggedInUser} onUnJoin={this.handleUnJoin} onDelete={this.handleDeleteEvent}{...routeProps} />
          }}/>

          <Route  path="/addevent"  render ={(routeProps)=>{
             return <AddEvent loggedInUser={loggedInUser} onAddEvent={this.handleAddEvent} {...routeProps} />
          }}/>
          
          <Route path="/following"  render ={(routeProps)=>{
            return <FollowingList SearchPage={SearchPage} SearchTerm={this.state.SearchTerm} followingUsersIds={followingUsersIds} onUnFollow={this.handleUnFollow} onSearch={this.handleSearch} loggedInUser={this.state.loggedInUser} {...routeProps} />
          }}/>

          <Route path="/allusers"  render ={(routeProps)=>{
            return <FollowingSearch onFollow={this.handleFollow} SearchPage={SearchPage} SearchTerm={SearchTerm} onSearch={this.handleSearch} loggedInUser={loggedInUser} {...routeProps} />
          }}/>

          <Route path="/thevault"  render ={(routeProps)=>{
            return <VaultList onAdd={this.handleAddFav} favVaultIds={favVaultIds} SearchPage={SearchPage} SearchTerm={SearchTerm} onSearch={this.handleSearch} loggedInUser={loggedInUser} 
             {...routeProps} />
          }}/>

          <Route  path="/addVaultItem"  render ={(routeProps)=>{
             return <AddVaultItem loggedInUser={loggedInUser} onAddVaultItem={this.handleAddVaultItem} {...routeProps} />
          }}/>

          <Route  path="/vaultfavs"  render ={(routeProps)=>{
             return <VaultFavs loggedInUser={loggedInUser} onDeleteVaultFav={this.handleDeleteVaultItem} {...routeProps} />
          }}/>


        </Switch>
    </div>
   )
  }
}

export default withRouter(App);

