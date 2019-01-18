import React, { Component } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';

class SignUp extends Component {
  render() {
    return (
      <>
        <Card className="align-self-center m-auto" style={{ width: '30rem', height: '30rem' }}>
          <Card.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>이메일 주소</Form.Label>
                <Form.Control type="email" placeholder="이메일 입력" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" placeholder="비밀번호 입력" />
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
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default SignUp;