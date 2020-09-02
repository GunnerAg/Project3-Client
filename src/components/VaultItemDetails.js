import React, { Component } from 'react'
import axios from 'axios';
import {API_URL} from '../config';
import PlayerMedia from './PlayerMedia';
import './VaultItem.css'

export default class VaultItemDetails extends Component {
    state={
        vaultItem:{},
    }
    componentDidMount(){
        axios.get(`${API_URL}/vaultitemdetails/${this.props.match.params.id}`,{withCredentials:true})
        .then ((res)=>{
            this.setState({
                vaultItem: res.data
            })
            })
            .catch((err)=>{
                return err
          })
    }
    
    render() {
        
        const{title,description,fileUrl,keywords,created_by,}= this.state.vaultItem
        let myRegx = '^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$'
        let checkMedia = fileUrl === myRegx
        console.log(fileUrl)

        return (
            <div className='vault-item-details-container'>                 
                <p>TITLE<br/>{title}</p>
                <p>DESCRIPTION<br/>{description}</p>
                <p>KEYWORDS<br/>{keywords}</p>
                {/* (<p>CREATOR<br/>{created_by.username}</p>) */}
                {/* <p>DOCUMENTS<br/>{fileUrl}</p>    */}
                {checkMedia? <PlayerMedia vaultItem={this.state.vaultItem}/>: null}
            </div>
        )
    }
}