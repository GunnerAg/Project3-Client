import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Nav,Navbar,NavDropdown,Button,NavLink} from 'react-bootstrap'


class NavBar extends Component {

    render() {
        return (
            <div>

                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">THE VAULT</Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavLink href="/contact">Contact</NavLink>
                        <NavLink href="/about">About</NavLink>
                        {this.props.loggedInUser?(
                            <NavDropdown title="MyProfile" id="collasible-nav-dropdown">
                                <Button onClick={this.props.onLogOut}>Logout</Button>
                                <NavDropdown.Divider />
                                <Link to ="/profile"><Button>Profile</Button></Link>
                            </NavDropdown>):''}
                    </Nav>
                </Navbar>

            </div>
        )
    }
}

export default NavBar