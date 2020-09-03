import React, { Component } from 'react';
import { Button,Card } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {FacebookShareButton,WhatsappShareButton,} from "react-share";
import {FacebookIcon,WhatsappIcon} from "react-share";
import  './Event.css'


export default class Event extends Component {

   

    render() {
        const{title, description, date, image, keywords, created_by, percentage, _id } = this.props.event
        const{loggedInUser, joinedEventIds, from, onDelete, onJoin, onUnJoin}=this.props
        let keyword=keywords.toString().split('')
        if (!loggedInUser) {
            return <Redirect to="/signin" />
        }
       
        let checkMyEvents = created_by._id === loggedInUser._id;
        let chekJoinState = joinedEventIds.length && joinedEventIds.includes(_id)
        let deleteBtn = <Button id="button-general" onClick={() => onDelete(_id)}>DELETE</Button>;
        let unJoinBtn = <Button id="button-general" onClick={() => onUnJoin(_id) }>UNJOIN</Button>;
        let joinBtn = <Button id="button-general" onClick={() => onJoin(_id)}>JOIN</Button>;
        let checkFrom = from === 'myEvents' ;
        return (
            <div className='event-card-item'>

                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title><h3><strong>{title} by {created_by.username} {created_by.secondname}</strong></h3></Card.Title>
                    <Card.Text>
                    <Card.Title><strong>Description</strong></Card.Title>
                    {description}
                    </Card.Text>
                    <Card.Title><strong>Date</strong></Card.Title>
                    <Card.Text>
                    {date}
                    </Card.Text>
                    <Card.Title><strong>keywords</strong></Card.Title>
                    <Card.Text>
                    {keyword}
                    </Card.Text>
                    {checkFrom ? null:( <div><Card.Title><strong>Matching</strong></Card.Title> <Card.Text>{percentage}%</Card.Text></div>)}
                    {checkFrom ? (checkMyEvents ? deleteBtn : unJoinBtn) : ( chekJoinState ?  unJoinBtn: joinBtn)}
                    <div className='socialmedia-share'>
                        <FacebookShareButton url={'https://the-vault.herokuapp.com/myevents'}><FacebookIcon size={25}/></FacebookShareButton>
                        <WhatsappShareButton url={'https://the-vault.herokuapp.com/myevents'}><WhatsappIcon size={25}/></WhatsappShareButton>
                    </div>
                </Card.Body>
                </Card>
            </div>
        )
    }
}
