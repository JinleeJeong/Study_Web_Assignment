import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

class SignIn extends Component {
  constructor() {
    super();
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassWordChange = this.handlePassWordChange.bind(this);

    this.state = {
      email: '',
      password: '',
    }
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePassWordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  render() {
    return (
      <>
        <Card className="align-self-center m-auto" style={{ width: '30rem', height: '30rem' }}>
          <Card.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>이메일 주소</Form.Label>
                <Form.Control type="email" placeholder="이메일 입력" value={this.state.email} onChange={this.handleEmailChange} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" placeholder="비밀번호 입력" value={this.state.password} onChange={this.handlePassWordChange}
              />
              </Form.Group>
              <Button variant="primary" type="submit">
                회원가입
              </Button>
              <br/>
              <Button className="mt-5" variant="primary" type="submit">
                페이스북 계정으로 로그인
              </Button>
              <br/>
              <Button className="mt-5" variant="primary" type="submit">
                구글 계정으로 로그인
              </Button>
            </Form>
            <div>{this.state.email}</div>
            <div>{this.state.password}</div>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default SignIn;