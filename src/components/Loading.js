import React from 'react';
import {Button,Spinner} from 'react-bootstrap'
import './Loading.css'

export default function Loading() {
    return (
        <div>
        <div className='loading-container'>
             <Button variant="primary" disabled>
                <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                />
                Loading...
            </Button>
        </div>
        </div>
    )
}
