import React from 'react';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
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
 }
  

  componentDidMount(){
    axios.get(`${API_URL}`)
      .then((res) => {
          this.setState({
            //add setstates
          })
      })
      if(!this.state.loggedInUser){
        axios.get(`${API_URL}/user`,{withCredentials:true})
        .then ((res)=>{
          this.setState({
            loggedInUser: res.data
          })
        })
      }
  }

  
     // Show or hide the forms to sign up and sign in
    showSignUp=()=>{
      this.setState({signUpForm:!this.state.signUpForm})
    };
  
    showSignIn=()=>{
      this.setState({signInForm:!this.state.signInForm})
    };



  //handle the backend routes for the sign in 
  handleSignIn = (e) => {
    e.preventDefault();
    const {email,password}=e.currentTarget;

    axios.post(`${API_URL}/signin`,{ email: email.value, password: password.value},{withCredentials:true})
      .then((res)=>{
        this.setState({
          loggedInUser: res.data
        })
      })
  }

  //handle the backend routes for the sign up
  handleSignUp = (e) => {
    e.preventDefault();
    const {username,email,password}=e.currentTarget;

    axios.post(`${API_URL}/signup`,{username: username.value, email: email.value, password: password.value},{withCredentials:true})
      .then((res)=>{
        this.setState({
          loggedInUser: res.data
        })
      })
  }


  render() {
    return (
    <div>
      <NavBar loggedInUser={this.state.loggedInUser} onLogOut={this.handleLogOut}/>
        <Switch >
          <Route exact path="/" render={(routeProps) => {
            return <Home {...routeProps} onSignIn={this.handleSignIn} onSignUp={this.handleSignUp}/>
          }} />
        </Switch>
    </div>
   )
  }
}

export default withRouter(App);

