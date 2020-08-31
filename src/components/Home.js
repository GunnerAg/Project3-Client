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
                <div style={{display:'flex', justifyContent:'space-evenly', flexWrap:'wrap'}}>
                    {this.state.signUpForm 
                    ?<div style={{display:'flex', flexDirection:'column'}}><SignUp onSignUp={this.props.onSignUp} /> <ButtonDisplayForm case='Go back' hideOrShow={this.showSignUp} id='BtnStyle'/></div>
                    :<><ButtonDisplayForm case='Sign Up' hideOrShow={this.showSignUp} id='BtnStyle'/></>
                    }
                    {this.state.signInForm 
                    ?<div style={{display:'flex', flexDirection:'column'}}><SignIn onSignIn={this.props.onSignIn} /> <ButtonDisplayForm case='Go back' hideOrShow={this.showSignIn} id='BtnStyle'/></div>
                    :<><ButtonDisplayForm case='Sign In' hideOrShow={this.showSignIn} id='BtnStyle'/></>
                    }
                </div>
            </div>
        )
    }
}
