import React, { Component } from 'react';
import { Button,Jumbotron } from 'react-bootstrap';
import {Redirect, Link} from 'react-router-dom'


export default class VaultItem extends Component {
    render() {
        const{title,description,fileUrl,keywords,created_by,_id, isFavorite}=this.props.item
        const{loggedInUser,onAdd,onDelete,onErase,from}=this.props

        //redirects all the time ! I think we dont need this? idk manish help !
        // if (!loggedInUser) {
        //     return <Redirect to="/signin" />
        // }
       
        let addToFavsBtn = <Button id="button-general" disabled={isFavorite ? true : false} onClick={()=>{this.props.onAdd(_id)}}>{isFavorite? 'ON FAVOURITES': 'FAVORITE'}</Button>
        let delteFromFavsBtn = <Button id="button-general" onClick={()=>{this.props.onUnAddVaultFav(_id)}}>DELETE FROM FAVS</Button>
        let eraseItemBtn = <Button id="button-general" onClick={()=>onErase(_id)}>DELETE POST</Button>
        let detailsBtn = <Link to={`/vaultitemdetails/${_id}`}><Button>SEE DETAILS</Button></Link>
        // let checkMyItems = created_by._id == loggedInUser._id;


        console.log(isFavorite)
      


        // let chekJoinState = joinedEventIds.length && joinedEventIds.includes(_id)
        // let deleteBtn = <Button id="button-general" onClick={() => onDelete(_id)}>DELETE</Button>;
        // let unJoinBtn = <Button id="button-general" onClick={() => onUnJoin(_id) }>UNJOIN</Button>;
        // let joinBtn = <Button id="button-general" onClick={() => onJoin(_id)}>JOIN</Button>;
        
        return (
            <div>
                <Jumbotron>
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <p>{keywords}</p>
                    {/* {checkMyItems ? null:(<p>{created_by.username} {created_by.secondname}</p>)} */}
                        <p>{detailsBtn}</p>
                        <p>{from == 'VaultFavs' ?delteFromFavsBtn :(from == 'MyVaultItems' ? eraseItemBtn : addToFavsBtn)}</p>
                </Jumbotron>
            </div>
        )
    }
}
