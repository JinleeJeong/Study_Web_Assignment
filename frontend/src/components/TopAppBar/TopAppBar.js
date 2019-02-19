import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {userSignout} from '../../actions/authenticationActions';
import './TopAppBar.css';
import axios from 'axios';

import { Image } from 'react-bootstrap';

import logo from '../../images/logo.png';
import {Navbar, NavItem, Nav, Popover, Tooltip, Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock , FieldGroup } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import { inherits } from 'util';
import {withRouter} from 'react-router';
import {AppConsumer} from '../../provider/AppProvider';
import {useContext} from '../../provider/AppProvider';
import Avatar from './Avatar/Avatar';

class TopAppBar extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }


  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    
    function FieldGroup({ id, label, help, ...props }) {
      return (
        <FormGroup controlId={id}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl {...props} />
          {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      );
    }

    return (
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">
                  <img src={logo} alt="logo" height="35" width="95" />
                </a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem>
                  <NavLink to = "/" className = 'navLinkStyle' eventKey={1}>
                  새 그룹 시작하기
                  </NavLink>
                </NavItem>
                
                {this.props.value.signInInfo.status == null ? <NavItem style={{width:'100px'}}> </NavItem> : this.props.value.signInInfo.status == false ?
                (<NavItem>
                    <NavLink to = "/signin"  className = 'navLinkStyle'  eventKey={2}>
                      로그인
                    </NavLink>
                </NavItem>): (<NavItem>
                  <Avatar/>
                </NavItem>)}
                
                <NavItem>
                  <NavLink to = "/signup" className = 'navLinkStyle' eventKey={2}>
                    회원가입
                  </NavLink>
                </NavItem>
                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>로그인</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form>
                      <FieldGroup
                        id="formControlsEmail"
                        type="email"
                        label="이메일"
                        placeholder="이메일 주소 입력"
                      />
                      <FieldGroup id="formControlsPassword" label="비밀번호" type="password" placeholder="비밀번호 입력" />
                    </form>
                    <Button bsStyle="info">로그인하기</Button>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button bsStyle="info" onClick={this.handleClose}>닫기</Button>
                  </Modal.Footer>
                </Modal>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
    );
  }
}

TopAppBar.propType = {
  history: PropTypes.object.isRequired
}

export default useContext(withRouter(TopAppBar));
