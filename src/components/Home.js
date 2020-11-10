import React, { Component } from 'react';
import ButtonDisplayForm from './ButtonDisplayForm';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Footer from './Footer'
import './Home.css'


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
            <div>
              <div id="section1">
               
               <div className="back"></div>
               <div className="front"></div>
                  <div className="headingContainer" >
                      <h2><strong>THE PERFECT PLACE TO LEARN</strong></h2>
                      <h4>Join an active community of users. Learn new skills. Teach others what you already know.</h4>
                  </div>

              <div className='button-container'>
                    <div className='siginUp'>
                      {this.state.signUpForm 
                      ?<> <SignUp onSignUp={this.props.onSignUp} /> <ButtonDisplayForm case='X Close' hideOrShow={this.showSignUp}/></>
                      :<><ButtonDisplayForm case='JOIN' hideOrShow={this.showSignUp}/></>
                      }
                    </div>
                    <div className='siginIn'>
                        {this.state.signInForm 
                        ?<> <SignIn onSignIn={this.props.onSignIn} /> <ButtonDisplayForm case='X Close' hideOrShow={this.showSignIn}/></>
                        :<><ButtonDisplayForm case='LOGIN' hideOrShow={this.showSignIn}/></>
                        }
                    </div>
                  </div>
                  <div>
                  {this.props.errorMsg && <h4 className='errorMsg'>{this.props.errorMsg}</h4>}
                  </div>
                </div>
            </div>


         <div id="section2">
           <h1>1.</h1>
           <h2>LEARN NEW SKILLS EVERY DAY</h2>
           <p>Join to an active community of users, assist to one of the many events created every day in The Vault</p>
              <div className="img-section">
                <img  src='https://res.cloudinary.com/dzzpwrdae/image/upload/v1598959424/creative_thinking_dkmun7.png' width="200" height="240" alt='creative'/>
              </div>
         </div>

         <div id="section3">
          <h1>2.</h1>
          <h2>TEACH OTHERS WHAT YOU KNOW</h2>
          <p>Apport to the community and share your knowledge. Create a new event and show the people what you know.</p>
          
            <div className="img-section">          
              <img src='https://res.cloudinary.com/dzzpwrdae/image/upload/v1598959424/teach_ovbafs.png' width="200" height="240" alt='teach'/>
            </div>
         </div>
         </div>         
        )
    }
}
