import React, { Component } from 'react';
import imageProvider from '../helpers/imageProvider';
import { Navbar, Nav, Form, Button, Modal } from 'react-bootstrap';

class TopAppBar extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return(
      <>
        <Navbar bg="light" variant="light">
          <Nav className="mr-auto">
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={imageProvider.logo}
                width="55"
                height="50"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </Nav>
          <Form inline>
            <Button variant="outline-primary" onClick={this.handleShow} className="mr-sm-2">로그인</Button>
            <Button variant="outline-primary">회원가입</Button>
          </Form>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>로그인</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>이메일</Form.Label>
                  <Form.Control type="email" placeholder="이메일 입력" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>비밀번호</Form.Label>
                  <Form.Control type="password" placeholder="비밀번호 입력" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  로그인
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                닫기
              </Button>
            </Modal.Footer>
          </Modal>
        </Navbar>
      </>
    );
  }
}

export default TopAppBar;