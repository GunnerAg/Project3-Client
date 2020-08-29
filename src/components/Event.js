import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {Redirect} from 'react-router-dom'


export default class Event extends Component {

    

    render() {

        if (!this.props.loggedInUser) {
            return <Redirect to="/signin" />
        }
       
        let checkMyEvents = this.props.event.created_by === this.props.loggedInUser._id;
        let chekJoinState = this.props.joinedEventIds.length && this.props.joinedEventIds.includes(this.props.event._id)
        let deleteBtn = <Button onClick={() => this.props.onDelete(this.props.event._id)}>DELETE</Button>;
        let unJoinBtn = <Button onClick={_ =>{this.props.onUnJoin(this.props.event._id) } } >UNJOIN</Button>;
        let joinBtn = <Button onClick={_ =>{this.props.onJoin(this.props.event._id)}}>JOIN</Button>;
        let checkFrom = this.props.from === 'myEvents' ;
        return (
            <div>
              <p>{this.props.event.title}</p>
              <p>{this.props.event.description}</p>
              <p>{this.props.event.date}</p>
              <p>{this.props.event.image}</p>
              <p>{this.props.event.keywords}</p>
              <p>{this.props.event.created_by}</p>
              {checkFrom? null: (<p>Profile match {this.props.event.percentage}</p>)}
              {checkFrom ? (checkMyEvents ? deleteBtn : unJoinBtn) : ( chekJoinState ?  unJoinBtn: joinBtn)}
            </div>
        )
    }
}
