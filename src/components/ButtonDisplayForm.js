import React from 'react';
import {Button} from 'react-bootstrap';

export default function ButtonDisplayForm(props) {
    return (
        <div>
        {/* will be much cooler to add an image and not a button here! */}
        <Button id="button-general" onClick={props.hideOrShow}>{props.case}</Button>
   </div>
    )
}


