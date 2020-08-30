import React, { Component } from 'react';
import SearchBar from './SearchBar';
import VaultItem from './VaultItem';
import axios from 'axios';
import {API_URL} from '../config';

export default class VaultFavs extends Component {

    state={
        loggedInUser:null,
        vaultFavItems:[],
        filteredVaulFavtItems:[]
    }

    getFavVaultItems=()=>{
        axios.get(`${API_URL}/allvault`,{withCredentials:true})
        .then((res)=>{
            let vaultFavs =res.data.filter((vaultFavItem)=> {
                return this.props.loggedInUser.favVault.includes(vaultFavItem._id)
            })

            this.setState({
                loggedInUser: this.state.loggedInUser || this.props.loggedInUser,
                vaultFavItems: vaultFavs,
                filteredVaulFavtItems: vaultFavs,
            })
        })
    }

    getUser = () => {
        axios.get(`${API_URL}/user`,{withCredentials:true})
        .then ((res)=>{    
          this.setState({
            loggedInUser: res.data,
          }, () => {
            this.getFavVaultItems()
          })
        })
      }

      componentDidMount(){
        if(this.props.loggedInUser){
         this.getFavVaultItems()
        }
        else {
          this.getUser()
        }
    }


    render() {
        const{loggedInUser,vaultFavItems,filteredVaulFavtItems} = this.state

        if (!this.state.loggedInUser){
            return <div>Loading User . . .  </div>
        }

        let filteredSearchVaulFavtItems=filteredVaulFavtItems

        if(this.props.SearchPage === 'VaultFavs' && this.props.SearchTerm !==''){
            filteredSearchVaulFavtItems=filteredSearchVaulFavtItems.filter((vaultFavItem)=>{
                let bool= false;
                vaultFavItem.keywords.forEach((keyword) => {
                    if(keyword.toLowerCase().includes(this.props.SearchTerm.toLowerCase())){
                        bool=true
                    }
                })
                return bool
            })
        }

        return (
            <div>   
            <SearchBar onSearch={this.props.onSearch} searchTerm={this.props.searchTerm} from={'VaultFavs'} />
            <div>{filteredSearchVaulFavtItems.map((item)=>{
            return <VaultItem loggedInUser={loggedInUser} favVaultIds={this.props.favVaultIds} from={'VaultFavs'} item={item} onDetails={this.props.onDetails} onUnAddVaultFav={this.props.onUnAddVaultFav} onDelete={this.props.onDelete} />
            
            })}
            </div>
            </div>
        )
    }
}
