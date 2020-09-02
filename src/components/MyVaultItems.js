import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import VaultItem from './VaultItem';
import Loading from './Loading'
import axios from 'axios';
import {API_URL} from '../config';
import SearchBar from './SearchBar';

export default class VaultList extends Component {

    state={
        loggedInUser:this.props.loggedInUser,
        vaultItems:[],
        filteredVaultItems:[],
        
    }

    getMyVaultItems=()=>{
        axios.get(`${API_URL}/allvault`,{withCredentials:true})
        .then((res)=>{
            let myVaultItems = res.data.filter((item) => {
                return  item.created_by._id === this.state.loggedInUser._id
              })
            this.setState({
                vaultItems: myVaultItems,
                filteredVaultItems: myVaultItems,
            })
        })
    }

    getUser = () => {
        axios.get(`${API_URL}/user`,{withCredentials:true})
        .then ((res)=>{    
          this.setState({
            loggedInUser: res.data,
          }, () => {
            this.getMyVaultItems()
          })
        })
      }

    componentDidMount(){
        if(this.props.loggedInUser){
         this.getMyVaultItems()
        }
        else {
          this.getUser()
        }
    }

    handleDeleteVaultItem=(vaultItemId)=>{
      axios.delete(`${API_URL}/vault/${vaultItemId}/delete`,{withCredentials:true})
      .then(()=>{
       this.getMyVaultItems()
      })
    }


    render() {
      console.log(this.props.loggedInUser)
      if(!this.props.loggedInUser){
        return <Loading/>
      }

        const{filteredVaultItems, loggedInUser} = this.state
        let filteredSearchVaultItems = filteredVaultItems

        if (this.props.SearchPage === 'MyVaultItems' && this.props.SearchTerm !== ''){
            filteredSearchVaultItems  = filteredSearchVaultItems.filter((item) => {
              let bool = false;
              item.keywords.forEach((keyword) => {
                if (keyword.toLowerCase().includes(this.props.SearchTerm.toLowerCase())) {
                  bool = true
                }
              })
           
              return bool
            })
          }
          
        return (
            <div>
                <Link to='/addVaultItem'><Button id="button-general">Add to the vault</Button></Link>
                <SearchBar onSearch={this.props.onSearch} searchTerm={this.props.searchTerm} from={'MyVaultItems'} />
                <div>{filteredSearchVaultItems.map((item)=>{
                    return <VaultItem loggedInUser={loggedInUser} favVaultIds={this.props.favVaultIds} from={'MyVaultItems'}
                        item={item} onErase={this.handleDeleteVaultItem}
                    />
                })
                }
                </div>
            </div>
        )
    }
}
