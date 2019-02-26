import React, { Component } from 'react';
import './TopAppBar.css';
import logo from '../../images/logo.png';
import { Navbar, NavItem, Nav, } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class TopAppBar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <img src={logo} alt="logo" height="40" width="150" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem componentClass={Link} eventKey={1} href="/contents" to="/contents">
              현재 스터디 목록            
            </NavItem>
            <NavItem componentClass={Link} eventKey={1} href="/signin" to="/signin">
              로그인
            </NavItem>
            <NavItem componentClass={Link} eventKey={1} href="/signup" to="/signup">
              회원가입
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default TopAppBar;