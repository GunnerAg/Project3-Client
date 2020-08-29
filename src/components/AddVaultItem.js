import React, { Component } from 'react';



export default class AddVaultItem extends Component {

    state = {
        vaultItemDetails: {},
     }
      

    onChange=(e)=>{
       let value = e.currentTarget.value;
       let property = e.currentTarget.name;
       let clonedItem = JSON.parse(JSON.stringify(this.state.vaultItemDetails))
       clonedItem[property]=value
       this.setState({
        vaultItemDetails:clonedItem
       })
    }

    render() {
        const{ title,description,fileUrl,keywords } = this.state.vaultItemDetails
        return (
            <div>
                  <form onSubmit={(e)=>{
                      e.preventDefault()
                      this.props.onAddVaultItem(e,this.state.vaultItemDetails)}}>
                    <label>Title</label>
                    <input  onChange={this.onChange} value={title} type='text' name='title'></input>
                    <label>Description</label>
                    <input onChange={this.onChange} value={description} type='text' name='description'></input>
                    <label >File</label>
                    <input onChange={this.onChange} value={fileUrl} type='text' name='fileUrl'></input>
                    <label>Keywords</label>
                    <input onChange={this.onChange} value={keywords} type='text' name='keywords'></input>
                    <input type='submit' value={'ADD'} />
                </form>
            </div>
        )
    }
}