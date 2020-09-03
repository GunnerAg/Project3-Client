import React from 'react';
import {Button,Spinner} from 'react-bootstrap'
import './Loading.css'

export default function Loading() {
    return (
        <div >
            <div id='loading-container'>
                <Button id='loading-btn' disabled>
                    <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    Loading...
                </Button>
                <div>
                    <h3>There was a problem finding the logged user, we are trying to fing you!</h3>
                </div>
            </div>
        </div>
    )
}
