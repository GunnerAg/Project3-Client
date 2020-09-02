import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import './Contact.css'

export default class Contact extends Component {
    render() {
        return (
            <div className='contact-container'>
                <div>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://res.cloudinary.com/dzzpwrdae/image/upload/v1597336285/zebkdkp0fd0y5j4ht3dv.jpg" />
                        <Card.Body>
                            <Card.Title>Gunner Andersen</Card.Title>
                            <Card.Text>
                            <p> Web Development.Email : gunner.andersen.gil@gmail.com. Phone Number: (34) 698 16 25 74.  Adress: A coruña, Galicia, Spain.</p>
                            </Card.Text>
                        </Card.Body>
                        </Card>                
                </div>

                <div>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://res.cloudinary.com/dzzpwrdae/image/upload/v1597336294/jmr9ztkjj8dhtaj6oi8g.jpg" />
                        <Card.Body>
                            <Card.Title>Alvaro Sánchez Lamadrid</Card.Title>
                            <Card.Text>
                            <p> Web Development.Email : alvaro.sanchez.lamadrid@gmail.com. Phone Number:(34) 656 70 34 08 . Adress: Torrelavega, Cantabria, Spain. </p>
                            </Card.Text>
                        </Card.Body>
                        </Card>                 
                </div>
            </div>
        )
    }
}


