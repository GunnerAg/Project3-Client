import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Nav,Navbar,NavDropdown,Button,NavLink} from 'react-bootstrap'
import './Main.css'


class NavBar extends Component {

    render() {
        return (
            <div className="navbar-container">
{/* 
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
                </Navbar> */}


                <Navbar id='navbar' expand="lg">
                <Navbar.Brand href="/"><img className='navbar-logo' src='https://res.cloudinary.com/dzzpwrdae/image/upload/v1599036221/logoTheVault_lwsjqf.png' alt='The Vault'/></Navbar.Brand>
                <Navbar.Toggle id='nav-toggle' aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Link to="/contact"><Button id="home-page-button">Contact</Button></Link>
                    <Link to="/about"><Button id="home-page-button">About</Button></Link>
                    <div >
                        {this.props.loggedInUser?(<Link to="/"> <Button id="home-page-button" onClick={this.props.onLogOut}>Logout</Button></Link>):''}
                        {this.props.loggedInUser?(<Link to="/profile" ><Button id="home-page-button">Profile</Button></Link>):''}
                    </div>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
export default NavBar


{/* <Navbar id='navbar' bg="light" expand="lg">
  <Navbar.Brand href="/"><img className='navbar-logo' src='https://res.cloudinary.com/dzzpwrdae/image/upload/v1599036221/logoTheVault_lwsjqf.png' alt='The Vault'/></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Link to="/contact"><Button id="button-general">Contact</Button></Link>
    <Link to="/about"><Button id="button-general">About</Button></Link>
    <div >
        {this.props.loggedInUser?(<Link to="/"> <Button id="button-general" onClick={this.props.onLogOut}>Logout</Button></Link>):''}
        {this.props.loggedInUser?(<Link to="/profile" ><Button id="button-general">Profile</Button></Link>):''}
    </div>
    </Nav>
  </Navbar.Collapse>
</Navbar> */}