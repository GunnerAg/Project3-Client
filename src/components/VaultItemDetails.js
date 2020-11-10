import React, { Component } from 'react'
import axios from 'axios';
import {API_URL} from '../config';
import PlayerMedia from './PlayerMedia';
import { Link} from 'react-router-dom'
import './VaultItem.css'
import './Main.css'
import { Button } from 'react-bootstrap';

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
        const{title,description,fileUrl,keywords}= this.state.vaultItem
         let RegEx= new RegExp('^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$')
        return (
            <div className='vault-item-details-container'>                 
                <h4><strong>TITLE</strong></h4>
                <p>{title}</p>
                <h4><strong>DESCRIPTION</strong></h4>
                <p>{description}</p>
                <h4><strong>KEYWORDS</strong></h4>
                <p>{keywords && keywords.join(', ')}</p>
                
                {                        
                    fileUrl && fileUrl.map((file)=>{
                        return   RegEx.test(file)? (<PlayerMedia fileUrl={file}/>):(<a href={file} className='external-link'><Button id='button-general'>Link to external document</Button></a>)
                    })
                    }
            </div>
        )
    }
}