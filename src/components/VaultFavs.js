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
        axios.get(`${API_URL}/favvaults`,{withCredentials:true})
        .then((res)=>{
         this.setState({
          vaultFavItems:res.data
         })
          this.state.vaultFavItems = this.state.vaultFavItems.map((item) => {
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
  
          let followfavs = this.state.vaultFavItems.filter((e) => {
            return this.props.loggedInUser.follow.includes(e.created_by)
          }).sort((a,b) => {
            return b.percentage - a.percentage
          })
          let unfollowfavs = this.state.vaultFavItems.filter((e) => {
            return !this.props.loggedInUser.follow.includes(e.created_by)
          }).sort((a,b) => {
            return b.percentage - a.percentage
          })

            this.setState({
                loggedInUser: this.state.loggedInUser || this.props.loggedInUser,
                vaultFavItems: [...followfavs,...unfollowfavs],
                filteredVaulFavtItems: [...followfavs,...unfollowfavs]
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

    
      handleUnAddFav=(vaultItemId)=>{
        axios.patch(`${API_URL}/profile/vault/unadd`,{vaultItemId},{withCredentials:true})
        .then(()=>{
            this.getUser()
        })
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
            return <VaultItem loggedInUser={loggedInUser} favVaultIds={this.props.favVaultIds} from={'VaultFavs'} item={item} onDetails={this.props.onDetails} onUnAddVaultFav={this.handleUnAddFav} />
            
            })}
            </div>
            </div>
        )
    }
}
