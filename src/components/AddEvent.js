import React, { Component } from 'react';



export default class AddEvent extends Component {

    state = {
        eventDetails: {},
     }
      

    onChange=(e)=>{
       let value = e.currentTarget.value;
       let property = e.currentTarget.name;
       let clonedEvent = JSON.parse(JSON.stringify(this.state.eventDetails))
       clonedEvent[property]=value
       this.setState({
        eventDetails:clonedEvent
       })
    }

    render() {
        const{ title,description,date,imageUrl,keywords } = this.state.eventDetails
        return (
            <div>
                  <form onSubmit={(e)=>{
                      e.preventDefault()
                      console.log('INSIDE SUBMIT')
                      this.props.onAddEvent(e,this.state.eventDetails)}}>
                    <label>Title</label>
                    <input  onChange={this.onChange} value={title} type='text' name='title'></input>
                    <label>Description</label>
                    <input onChange={this.onChange} value={description} type='text' name='description'></input>
                    <label >Date</label>
                    <input onChange={this.onChange} value={date} type='date' name='date'></input>
                    <label>Image</label>
                    <input onChange={this.onChange} value={imageUrl} type='text' name='imageUrl'></input>
                    <label>Keywords</label>
                    <input onChange={this.onChange} value={keywords} type='text' name='keywords'></input>
                    <input type='submit' value={'Edit'} />
                </form>
            </div>
        )
    }
}
