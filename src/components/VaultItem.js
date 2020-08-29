import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
// import {Redirect} from 'react-router-dom'


export default class VaultItem extends Component {
    render() {
        const{title,description,fileUrl,keywords,created_by,_id}=this.props.item
        const{loggedInUser,onAdd}=this.props

        // if (!loggedInUser) {
        //     return <Redirect to="/signin" />
        // }
       
        let addToFavsBtn = <Button onClick={()=>onAdd(_id)}>ADD TO FAVS</Button>
        let checkFavs = this.props.favVaultIds.length && this.props.favVaultIds.includes(_id)
        return (
            <div>
                <p>{title}</p>
                <p>{description}</p>
                <p>{fileUrl}</p>
                <p>{keywords}</p>
                <p>{created_by}</p>
                {checkFavs ? null:addToFavsBtn}
            </div>
        )
    }
}
