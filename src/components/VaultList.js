import React, { Component } from 'react';
import VaultItem from './VaultItem';
import axios from 'axios';
import {API_URL} from '../config';
import SearchBar from './SearchBar';
import Loading from './Loading';

export default class VaultList extends Component {

    state={
        loggedInUser:null,
        vaultItems:[],
        filteredVaultItems:[],
        
    }

    getAllVaultItems=()=>{
        axios.get(`${API_URL}/allvault`,{withCredentials:true})
        .then((res)=>{
            let notFavItems = res.data.filter((item) => {
                return  this.props.loggedInUser.favVault.includes(item._id) === false
              })



              notFavItems = notFavItems.map((item) => {
                let count = 0;
                item.keywords.forEach((keyword) => {
                  this.props.loggedInUser.wantToLearns.forEach((wantToLearn) => {
                    if (wantToLearn.toLowerCase() === keyword.toLowerCase()) {
                      count++
                    }
                  })
                })
               
                item.percentage = count ? (count/ item.keywords.length) * 100 : 0
                return item
              })
      
              let favs = notFavItems.filter((e) => {
                return this.props.loggedInUser.follow.includes(e.created_by)
              }).sort((a,b) => {
                return b.percentage - a.percentage
              })
              let unFavs = notFavItems.filter((e) => {
                return !this.props.loggedInUser.follow.includes(e.created_by)
              }).sort((a,b) => {
                return b.percentage - a.percentage
              })


            this.setState({
                loggedInUser: this.state.loggedInUser || this.props.loggedInUser,
                vaultItems: [...favs,...unFavs],
                filteredVaultItems: [...favs,...unFavs]
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

    handleAddFav=(vaultItemId)=>{
        axios.patch(`${API_URL}/profile/vault/add`,{vaultItemId},{withCredentials:true})
        .then(()=>{
            this.getAllVaultItems()
     
        })
      }


    render() {
        const{ loggedInUser, filteredVaultItems } = this.state
        const{ SearchPage, SearchTerm } =  this.props


        let filterSearchVaultItems = filteredVaultItems
        if(SearchPage === 'VaultList' && SearchTerm !==''){
            filterSearchVaultItems=filterSearchVaultItems.filter((item)=>{
                let bool=false;
                item.keywords.forEach((keyword)=>{
                    if(keyword.toLowerCase().includes(SearchTerm.toLowerCase())){
                        bool = true
                      }
                      else if(item.created_by.username.toLowerCase().includes(this.props.SearchTerm.toLowerCase()))
                      {
                          bool= true
                      }
                    })
                    return bool
            })
        }

        return (
            <div>
                <SearchBar onSearch={this.props.onSearch} searchTerm={this.props.searchTerm} from={'VaultList'} />
                <div>{filterSearchVaultItems.map((item)=>{
                    return <VaultItem loggedInUser={loggedInUser} favVaultIds={this.props.favVaultIds} from={'VaultList'}
                        item={item} onAdd={this.handleAddFav}
                    />
                })
                }
                </div>
            </div>
        )
    }
}
