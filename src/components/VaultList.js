import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import VaultItem from './VaultItem';
import axios from 'axios';
import {API_URL} from '../config';
import SearchBar from './SearchBar';

export default class VaultList extends Component {

    state={
        loggedInUser:null,
        vaultItems:[],
        filteredVaultItems:[],
        
    }

    getAllVaultItems=()=>{
        axios.get(`${API_URL}/allvault`,{withCredentials:true})
        .then((res)=>{
            this.setState({
                vaultItems: res.data,
                filteredVaultItems: res.data
            })
        })
    }

    getUser = () => {
        axios.get(`${API_URL}/user`,{withCredentials:true})
        .then ((res)=>{    
          this.setState({
            loggedInUser: res.data,
          }, () => {
            this.getAllVaultItems()
          })
        })
      }

    componentDidMount(){
        if(this.props.loggedInUser){
         this.getAllVaultItems()
        }
        else {
          this.getUser()
        }
    }

    render() {
        const{ loggedInUser, filteredVaultItems } = this.state
        const{ SearchPage, SearchTerm } =  this.props

        //this needs to refresh to work, gets on forever loading! manishhhhhh solve this plsssss! :D thanks btw
        // if (!loggedInUser){
        //     return <div>Loading User . . .  </div>
        // }

        let filterSearchVaultItems = filteredVaultItems
        if(SearchPage === 'VaultList' && SearchTerm !==''){
            filterSearchVaultItems=filterSearchVaultItems.filter((item)=>{
                let bool=false;
                item.keywords.forEach((keyword)=>{
                    if(keyword.toLowerCase().includes(SearchTerm.toLowerCase())){
                        bool = true
                      }
                    })
                    return bool
            })
        }

        return (
            <div>
                <SearchBar onSearch={this.props.onSearch} from={'VaultList'} />
                <Link to='/addVaultItem'><Button>Add to the vault</Button></Link>
                <div>{filterSearchVaultItems.map((item)=>{
                    return <VaultItem loggedInUser={loggedInUser} favVaultIds={this.props.favVaultIds} from={'VaultList'}
                        item={item} onAdd={this.props.onAdd}
                    />
                })
                }
                </div>
            </div>
        )
    }
}
