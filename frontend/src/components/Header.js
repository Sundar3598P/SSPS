import React from 'react'
import { Navbar, Container, Nav, NavDropdown  } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const Header = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        console.log('logout')
        dispatch(logout())
    }

    

    
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Sri Sai Pooja Stores</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i>&nbsp;Cart</Nav.Link>
                    {userInfo ? (
                        <NavDropdown title={userInfo.name} id='username'>
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item> Profile </NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}> Logout</NavDropdown.Item>
                        </NavDropdown>

                    ) : (
                        <Nav.Link href="/login">Login</Nav.Link>
                    )}
                   
                    
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
