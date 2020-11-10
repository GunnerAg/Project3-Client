import React, { Component } from 'react';
import { Button,Jumbotron } from 'react-bootstrap';
import { Link} from 'react-router-dom'
import Loading from './Loading';
import './VaultItem.css'


export default class VaultItem extends Component {

    render() {
        const{title,description,keywords,_id, isFavorite,percentage,created_by}=this.props.item
        const{onErase,from,loggedInUser}=this.props

        
        if (!loggedInUser) {
            return <Loading/>
        }
       
        let addToFavsBtn = <Button id="button-general" disabled={isFavorite ? true : false} onClick={()=>{this.props.onAdd(_id)}}>{isFavorite? 'ON FAVOURITES': 'FAVORITE'}</Button>
        let deleteFromFavsBtn = <Button id="button-general" onClick={()=>{this.props.onUnAddVaultFav(_id)}}>DELETE FROM FAVS</Button>
        let eraseItemBtn = <Button id="button-general" onClick={()=>onErase(_id)}>DELETE POST</Button>
        let detailsBtn = <Link to={`/vaultitemdetails/${_id}`}><Button>SEE DETAILS</Button></Link>


      

        return (
            <div >
                <Jumbotron>
                <div className='content-container'>
                    <div className='content-left'>
                        <h2><strong>{title}</strong></h2>
                        {from==='VaultFavs'? null:(<div> <h5><strong>CREATED BY</strong></h5><p>{created_by.username}</p> </div>)}
                        <h5><strong>KEYWORDS</strong></h5>
                        <p>{keywords && keywords.join(', ')}</p>
                        {from==='MyVaultItems' ? null:<div> <h5><strong>MATCHING</strong></h5><p>{Math.floor(percentage)}%</p></div>}
                        <p>{from === 'VaultFavs' ?deleteFromFavsBtn :(from === 'MyVaultItems' ? eraseItemBtn : addToFavsBtn)}</p>
                    </div>
                    <div className='content-right'>
                        <h5><strong>DESCRIPTION</strong></h5>
                        <p>{description}</p>
                        <p>{detailsBtn}</p>
                    </div>
                </div>
                </Jumbotron>
            </div>
        )
    }
}
