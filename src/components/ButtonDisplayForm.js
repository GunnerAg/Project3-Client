import React from 'react';
import {Button} from 'react-bootstrap';

export default function ButtonDisplayForm(props) {
    return (
        <div>
        <Button id="button-general" onClick={props.hideOrShow}>{props.case}</Button>
   </div>
    )
}


