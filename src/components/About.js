import React, { Component } from 'react';
import { Jumbotron,Button } from 'react-bootstrap'
import './About.css'

export default class About extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>About The Vault</h1>
                    <p>
                        This web page was created by two students from the Ironhack web development bootcampt. If you have any questions please feel free to reach us either on the contact section clicking on the button below or with the social media links at the bottom of the page !
                    </p>

                    <p>
                        <Button variant="primary" href="/about">About page</Button>
                    </p>                    
                </Jumbotron>

                <div className="ironhack-section">
                    <h1>What is IronHack?</h1>
                    <p>IronHack is one of the best options to join a bootcamp and learn web development, take this proyect as a reference of what you would be doing!</p>
                    <Button variant="primary" href="https://www.ironhack.com">IronHack Web</Button>
                </div>
                
            </div>
        )
    }
}
