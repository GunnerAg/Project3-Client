import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {Redirect, Link} from 'react-router-dom'


export default class VaultItem extends Component {
    render() {
        const{title,description,fileUrl,keywords,created_by,_id}=this.props.item
        const{loggedInUser,onAdd,onDelete,onErase,from}=this.props

        //redirects all the time ! I think we dont need this? idk manish help !
        // if (!loggedInUser) {
        //     return <Redirect to="/signin" />
        // }
       
        let addToFavsBtn = <Button onClick={()=>onAdd(_id)}>ADD TO FAVS</Button>
        let delteFromFavsBtn = <Button onClick={()=>onDelete(_id)}>DELETE FROM FAVS</Button>
        let eraseItemBtn = <Button onClick={()=>onErase(_id)}>DELETE POST</Button>
        let detailsBtn = <Link to={`/vaultitemdetails/${_id}`}><Button>SEE DETAILS</Button></Link>
        let checkFavs = this.props.favVaultIds.length && this.props.favVaultIds.includes(_id)
        let checkFrom = from === 'MyVaultItems'
        let checkMyItems = created_by === loggedInUser._id;
        
        return (
            <div>
                <p>{title}</p>
                <p>{description}</p>
                <p>{fileUrl}</p>
                <p>{keywords}</p>
                <p>{created_by}</p>
                {checkMyItems ? (checkFrom ? eraseItemBtn:null ):(checkFavs ? delteFromFavsBtn:addToFavsBtn)}

                {checkFavs ? detailsBtn : null}
                
               
            </div>
        )
    }
}
