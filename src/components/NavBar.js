import React, { Component } from 'react';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';


class NavBar extends Component {

    render(props) {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/">THE VAULT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/contact">Contact</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            {/* if user is logged of do not render this part */}

                            {this.props.loggedInUser? (
                            <NavDropdown title="My Profile" id="collasible-nav-dropdown">
                                <NavDropdown title="My Profile" id="collasible-nav-dropdown"></NavDropdown>
                                <NavDropdown.Item href="/" onClick={this.props.onLogOut}>Logout</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/user/:id">Profile</NavDropdown.Item>
                            </NavDropdown>)
                            :(<></>)}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}





export default NavBar