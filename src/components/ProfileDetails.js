import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {API_URL} from '../config';




export default class ProfileDetails extends Component {

    state = {
        profileInfo: {},
     }
      
      componentDidMount(){   
            axios.get(`${API_URL}/profile`,{withCredentials:true})
            .then ((res)=>{
              this.setState({
                profileInfo: res.data
              })
              })
              .catch((err)=>{
                return err
            })
      }
          
        render() {
            const {profileInfo} = this.state
            console.log(profileInfo)
        return (
            <div>
                <div>
                    {
                        profileInfo  && (
                            <ul>
                       {profileInfo.username && <li>{profileInfo.username}</li>}
                       {profileInfo.secondname && <li>{profileInfo.secondname}</li>}
                       {profileInfo.email && <li>{profileInfo.email}</li>}
                       {profileInfo.description && <li>{profileInfo.description}</li>}
                       {profileInfo.image && <li>{profileInfo.image}</li>}
                       {profileInfo.howToKnows && <li>{profileInfo.howToKnows}</li>}
                       {profileInfo.wantToLearns && <li>{profileInfo.wantToLearns}</li>}
                       {profileInfo.favVault && <li>{profileInfo.favVault}</li>}
                       {profileInfo.follow && <li>{profileInfo.follow}</li>}
                   </ul>
                        )
                    }
                   <Link to='/profile/edit' loggedInUser={this.props.loggedInUser}>EDIT!</Link>
 
                </div>
                
            </div>
        )
    }
}
