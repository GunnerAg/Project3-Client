import React, { Component } from 'react';
import { Jumbotron,Button } from 'react-bootstrap'
import './About.css'
import './Main.css'

export default class About extends Component {
    render() {
        return (
            <div className='content-container'>
                <Jumbotron>
                    <h1>About The Vault</h1>
                    <p>
                        This web page was created by two students from the Ironhack web development bootcampt. If you have any questions please feel free to reach us either on the contact section clicking on the button below or with the social media links at the bottom of the page !
                    </p>

                    <p>
                        <Button id='button-general' href="/contact">Contact</Button>
                    </p>                    
                </Jumbotron>

                <div className="ironhack-section">
                    <h1>What is IronHack?</h1>
                    <p>IronHack is one of the best options to join a bootcamp and learn web development, take this proyect as a reference of what you would be doing!</p>
                    <div className='' ><Button id='button-link' href="https://www.ironhack.com">IronHack Web</Button></div>
                </div>
                
            </div>
        )
    }
}
