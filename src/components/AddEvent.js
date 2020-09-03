import React, { Component } from 'react';
import MultiSelect from './MultiSelect'
import './Main.css';
import './Event.css';
import { Button,Form } from 'react-bootstrap';





export default class AddEvent extends Component {

    state = {
        eventDetails: {},
        errorMsg:null,
     }
      

    onChange=(e,isMulti,name,val)=>{
        let value = e ? e.currentTarget.value: '';
        let property = e? e.currentTarget.name: '';
       let clonedEvent = JSON.parse(JSON.stringify(this.state.eventDetails))
        clonedEvent[property]=value
         if (isMulti) {
         
            value = val ? val.map((elem) => elem.value): []
            clonedEvent[name] = value
           }
           else {
            clonedEvent[property]=value
           }
       this.setState({
        eventDetails:clonedEvent
       })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let RegEx = new RegExp(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/);
        let clonedEvent = JSON.parse(JSON.stringify(this.state.eventDetails))  
        if (e.currentTarget.image.value) {
            clonedEvent.image = e.currentTarget.image.files[0]
        }
        let [latitude, longitude] =  clonedEvent.location? clonedEvent.location.split(', '): []
        console.log(RegEx.test(latitude), RegEx.test(longitude))
        if(!RegEx.exec(latitude) || !RegEx.exec(longitude) ){
            this.setState({
                errorMsg:'Enter a valid location format'
            })
        } else{    
            this.props.onAddEvent(e,clonedEvent)
        }
    }

    render() {
       
        const{ title,description,date,keywords=[],location } = this.state.eventDetails
        let currentDate = new Date();
        let day = String(currentDate.getDate()).padStart(2, '0');
        let month = String(currentDate.getMonth() + 1).padStart(2, '0');
        let year = currentDate.getFullYear();
        currentDate = year + '-' + month + '-' + day + '';
        console.log(currentDate)
        return (
            <div className='event-add-form'>
                {this.state.errorMsg && this.state.errorMsg}
                <Form onSubmit={this.handleSubmit}> 
                <Form.Group controlId="formGroupUsername">
                    <Form.Label>Title</Form.Label>
                    <Form.Control onChange={this.onChange} value={title} type='text' name='title'/>
                </Form.Group>
                <Form.Group controlId="formGroupUsername">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={this.onChange} value={description} type='text' name='description'/>
                </Form.Group>
                <Form.Group controlId="formGroupUsername">
                    <Form.Label>Date</Form.Label>
                    <Form.Control onChange={this.onChange} value={date} type='date' name='date'  min={currentDate}/>
                </Form.Group>
                <Form.Group controlId="formGroupUsername">
                    <Form.Label>Image</Form.Label>
                    <Form.Control onChange={this.onChange} type='file' name='image'/>
                </Form.Group>
                <Form.Group controlId="formGroupUsername">
                    <Form.Label>Keywords</Form.Label>
                    <MultiSelect  onChange={this.onChange} value={keywords} name='keywords'/>
                </Form.Group>
                <Form.Group controlId="formGroupUsername">
                    <Form.Label>Enter the coordinates of the event separated by a comma. <br/>I.e:(18.516726, 73.856255)</Form.Label>
                    <Form.Control onChange={this.onChange} value={location} type='string' name='location'/>
                </Form.Group>
                <Button id="button-general" type='submit'>Add</Button>
                </Form>


            </div>
        )
    }
}


