import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Nav,Navbar,NavDropdown,Button,NavLink} from 'react-bootstrap'
import './Main.css'


class NavBar extends Component {

    render() {
        return (
            <div className="navbar-container">

                <Navbar id='navbar' >
                    <Navbar.Brand href="/"> <img className='navbar-logo' src='https://res.cloudinary.com/dzzpwrdae/image/upload/v1599036221/logoTheVault_lwsjqf.png' alt='The Vault'/></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Link to="/contact"><Button id="button-general">Contact</Button></Link>
                        <Link to="/about"><Button id="button-general">About</Button></Link>
                        <div >
                            {this.props.loggedInUser?(<Link to="/"> <Button id="button-general" onClick={this.props.onLogOut}>Logout</Button></Link>):''}
                            {this.props.loggedInUser?(<Link to="/profile" ><Button id="button-general">Profile</Button></Link>):''}
                        </div>
                    </Nav>
                </Navbar>

            </div>
        )
    }
}

export default NavBar
// {this.props.loggedInUser?(
//     <NavDropdown title="MyProfile" id="collasible-nav-dropdown">
//         <Button id="button-general" onClick={this.props.onLogOut}>Logout</Button>
//         <NavDropdown.Divider />
//         <Link to ="/profile"><Button id="button-general">Profile</Button></Link>
//     </NavDropdown>):''}