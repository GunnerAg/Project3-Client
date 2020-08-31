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

    handleSubmit = (e) => {
        e.preventDefault()
        let clonedEvent = JSON.parse(JSON.stringify(this.state.eventDetails))  
        if (e.currentTarget.image.value) {
            clonedEvent.image = e.currentTarget.image.files[0]
        }     
        console.log(clonedEvent)    
        this.props.onAddEvent(e,clonedEvent)
    }

    render() {
        const{ title,description,date,keywords } = this.state.eventDetails
        return (
            <div>
                  <form onSubmit={this.handleSubmit}>
                    <label>Title</label>
                    <input  onChange={this.onChange} value={title} type='text' name='title'></input>
                    <label>Description</label>
                    <input onChange={this.onChange} value={description} type='text' name='description'></input>
                    <label >Date</label>
                    <input onChange={this.onChange} value={date} type='date' name='date'></input>
                    <label>Image</label>
                    <input type='file' name='image' ></input>
                    <label>Keywords</label>
                    <input onChange={this.onChange} value={keywords} type='text' name='keywords'></input>
                    <input type='submit' value={'Add'} />
                </form>
            </div>
        )
    }
}
