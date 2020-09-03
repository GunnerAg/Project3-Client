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
        console.log('inside mount')
        axios.get(`${API_URL}/vaultitemdetails/${this.props.match.params.id}`,{withCredentials:true})
        .then ((res)=>{
            console.log('data',res.data)
            this.setState({
                vaultItem: res.data
            })
            })
            .catch((err)=>{
                console.log(err)
                
          })
    }
  

    
    render() {
        console.log('COMMENT --->',this.state.vaultItem)
        const{title,description,fileUrl,keywords}= this.state.vaultItem
        // let keyword=keywords.join(',')
        console.log(fileUrl)
         let RegEx= new RegExp('^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$')
        console.log('AQUI ------>', RegEx.test(fileUrl))
        console.log('HERE',fileUrl)
        return (
            <div className='vault-item-details-container'>                 
                <h4><strong>TITLE</strong></h4>
                <br/><p>{title}</p>
                <h4><strong>DESCRIPTION</strong></h4>
                <br/><p>{description}</p>
                <h4><strong>KEYWORDS</strong></h4>
                <br/><p>{keywords && keywords.join(', ')}</p>
                
                {                        
                    fileUrl && fileUrl.map((file)=>{
                        return   RegEx.test(file)? (<PlayerMedia fileUrl={file}/>):(<a href={file} className='external-link'><Button id='button-general'>Link to external document</Button></a>)
                    })
                    }
            </div>
        )
    }
}