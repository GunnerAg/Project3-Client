import React, { Component } from 'react';
import ButtonDisplayForm from './ButtonDisplayForm';
import SignIn from './SignIn';
import SignUp from './SignUp';


export default class Home extends Component {

    
  state = {
    signUpForm:false,
    signInForm:false,
 }

 showSignUp=()=>{
    this.setState({signUpForm:!this.state.signUpForm})
  };

  showSignIn=(e)=>{
      e.preventDefault()
    this.setState({signInForm:!this.state.signInForm})
  };

    render() {
        return (
            <div>
            <h2>HOME PAGE</h2>
                <div style={{display:'flex', justifyContent:'space-evenly', marginTop:'20px'}}>
                    {this.state.signUpForm 
                    ?<> <SignUp onSignUp={this.props.onSignUp} /> <ButtonDisplayForm case='Go back' hideOrShow={this.showSignUp}/></>
                    :<><ButtonDisplayForm case='Sign Up' hideOrShow={this.showSignUp}/></>
                    }
                    {this.state.signInForm 
                    ?<> <SignIn onSignIn={this.props.onSignIn} /> <ButtonDisplayForm case='Go back' hideOrShow={this.showSignIn}/></>
                    :<><ButtonDisplayForm case='Sign In' hideOrShow={this.showSignIn}/></>
                    }
                </div>
            </div>
        )
    }
}
