import React, { Component } from 'react';
import './TopAppBar.css';
import logo from '../images/logo.png';
import { Navbar, NavItem, Nav, } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class TopAppBar extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      email: '',
      password: '',
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <img src={logo} alt="logo" height="35" width="95" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem componentClass={Link} eventKey={1} href="/write" to="/write">
              새 그룹 시작하기
            </NavItem>
            <NavItem componentClass={Link} eventKey={2} href="/contents" to="/contents">
              현재 그룹 리스트
            </NavItem>
            <NavItem componentClass={Link} eventKey={1} href="/test1" to="/test1">
              테스트1
            </NavItem>
            <NavItem componentClass={Link} eventKey={2} href="/test2" to="/test2">
              테스트2
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default TopAppBar;