import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Nav,Navbar,NavDropdown,Button} from 'react-bootstrap'


class NavBar extends Component {

    render() {
        return (
            <div>
               <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">THE VAULT</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Link to="/contact">Contact</Link>
                    <Link to="/about" >About</Link>

                        {this.props.loggedInUser?(
                            <NavDropdown title="MyProfile" id="collasible-nav-dropdown">
                                <Button onClick={this.props.onLogOut}>Logout</Button>
                                <NavDropdown.Divider />
                                <Link to ="/profile">Profile</Link>
                            </NavDropdown>
                        ):''}
                    </Nav>
                </Navbar.Collapse>
                </Navbar>

            </div>
        )
    }
}

export default NavBar