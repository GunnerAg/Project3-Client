import React, { Component } from 'react';
import { Button,Card } from 'react-bootstrap';
import {Redirect} from 'react-router-dom'


export default class Event extends Component {

    render() {
        const{title, description, date, image, keywords, created_by, percentage, _id } = this.props.event
        const{loggedInUser, joinedEventIds, from, onDelete, onJoin, onUnJoin}=this.props
        if (!loggedInUser) {
            return <Redirect to="/signin" />
        }
       
        let checkMyEvents = created_by === loggedInUser._id;
        let chekJoinState = joinedEventIds.length && joinedEventIds.includes(_id)
        let deleteBtn = <Button onClick={() => onDelete(_id)}>DELETE</Button>;
        let unJoinBtn = <Button onClick={_ => onUnJoin(_id) }>UNJOIN</Button>;
        let joinBtn = <Button onClick={_ => onJoin(_id)}>JOIN</Button>;
        let checkFrom = from === 'myEvents' ;
        return (
            <div >

                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{title} by {created_by}</Card.Title>
                    <Card.Text>
                    {description}
                    </Card.Text>
                    <Card.Text>
                    {date}
                    </Card.Text>
                    <Card.Text>
                    {keywords}
                    </Card.Text>
                    {checkFrom? null: (<p>Profile match {percentage}</p>)}
                    {checkFrom ? (checkMyEvents ? deleteBtn : unJoinBtn) : ( chekJoinState ?  unJoinBtn: joinBtn)}
                </Card.Body>
                </Card>
              {/* <p>{title}</p>
              <p>{description}</p>
              <p>{date}</p>
              <p>{image}</p>
              <p>{keywords}</p>
              <p>{created_by}</p> */}
              {/* {checkFrom? null: (<p>Profile match {percentage}</p>)}
              {checkFrom ? (checkMyEvents ? deleteBtn : unJoinBtn) : ( chekJoinState ?  unJoinBtn: joinBtn)} */}
            </div>
        )
    }
}
