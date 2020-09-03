import React, { Component } from 'react';
import { Button,Jumbotron } from 'react-bootstrap';
import { Link} from 'react-router-dom'
import Loading from './Loading';


export default class VaultItem extends Component {
    // state={
    //     loggedInUser
    //     }

    // getUser = () => {
    //     axios.get(`${API_URL}/user`,{withCredentials:true})
    //     .then ((res)=>{    
    //       this.setState({
    //         loggedInUser: res.data,
    //       }, () => {
    //         // this.getAllVaultItems()
    //       })
    //     })
    //   }

    // componentDidMount(){
    //     if(this.props.loggedInUser){
    //      this.getAllVaultItems()
    //     }
    //     else {
    //       this.getUser()
    //     }
    // }

    render() {
        const{title,description,keywords,_id, isFavorite,percentage}=this.props.item
        const{onErase,from,loggedInUser}=this.props
        let keyword=keywords.toString().split('')

        
        if (!loggedInUser) {
            return <Loading/>
        }
       
        let addToFavsBtn = <Button id="button-general" disabled={isFavorite ? true : false} onClick={()=>{this.props.onAdd(_id)}}>{isFavorite? 'ON FAVOURITES': 'FAVORITE'}</Button>
        let delteFromFavsBtn = <Button id="button-general" onClick={()=>{this.props.onUnAddVaultFav(_id)}}>DELETE FROM FAVS</Button>
        let eraseItemBtn = <Button id="button-general" onClick={()=>onErase(_id)}>DELETE POST</Button>
        let detailsBtn = <Link to={`/vaultitemdetails/${_id}`}><Button>SEE DETAILS</Button></Link>


        console.log(isFavorite)
      

        return (
            <div>
                <Jumbotron>
                <h2><strong>{title}</strong></h2>
                    <h5><strong>DESCRIPTION</strong></h5>
                    <p>{description}</p>
                    <h5><strong>KEYWORDS</strong></h5>
                    <p>{keyword}</p>
                    <h5><strong>MATCHING</strong></h5>
                    <p>{percentage}%</p>
                        <p>{detailsBtn}</p>
                        <p>{from === 'VaultFavs' ?delteFromFavsBtn :(from === 'MyVaultItems' ? eraseItemBtn : addToFavsBtn)}</p>
                </Jumbotron>
            </div>
        )
    }
}
