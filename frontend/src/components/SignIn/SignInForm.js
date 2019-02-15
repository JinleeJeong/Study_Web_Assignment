import React, {Component} from 'react';
import validator from 'validator';
import axios from 'axios';
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {GoogleLoginButton} from 'react-social-login-buttons';

class SignInForm extends Component {

  constructor(props){
    super(props);

    // formFieldInput : 해당 객체의 property에 사용자가 각 칸에 입력한 값들을 저장한다.
    // formFieldValid : 각 칸에 입력된 값 (formFiledInput 객체의 properties)의 상태를 저장한다(null, error, warning etc)  
    // formFieldMessage : 유효성 검사를 통과하지 못한 칸 아래에 나타낼 오류 메시지를 저장한다. 
    this.state = {
      formFieldInput : 
      {
        email: 'wotj08090@gmail.com',
        password:'asdqwe123!',
      },
      formFieldValid :
      {
        emailValid : null,
        passwordValid : null,
      },
      formFieldMessage :
      {
        emailValError : '',
        passwordValError : '',
      }
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

setValidationResult (validationResult){
  
  let {formFieldValid, formFieldMessage} = this.state;

  formFieldValid[validationResult['fieldName'] + 'Valid'] = validationResult['isCorrect'];
  formFieldMessage[validationResult['fieldName'] + 'ValError'] = validationResult['message'];
  
  this.setState (
    prevState => ({
      ...prevState,
      formFieldValid :  formFieldValid,
      formFieldMessage : formFieldMessage
    }))
}

  onChange(e){
    const name = e.target.name;
    const value = e.target.value;
  
    this.setState(prevState =>({
        formFieldInput:{
            ...prevState.formFieldInput,
            [name] : value
        }
    }));
  }

  onSubmit(e){
    //you cannot return false to prevent default behavior in React. You must call preventDefault explicitly. 
    e.preventDefault();
  
    const {emailValid,passwordValid} = this.state.formFieldValid;
    const {email,password} = this.state.formFieldInput;

    if (emailValid === null && passwordValid === null) {
      axios.post('/api/users/signin',{
        email: email,
        password: password,
      })
      .then(res => {
        console.log(res.data.message)
        this.props.history.push(res.data.url)
      })
      .catch(err=> console.log(err));
    }
    else
      console.log('Submit conditions are not satisfied..');
  }
  
  render (){
    return (
      <div>
        <Form onSubmit = {this.onSubmit}>
        <h1 className = "FormHeader">로그인</h1>
          <FormGroup
            validationState = {this.state.formFieldValid.emailValid}
          >
            <ControlLabel>아이디</ControlLabel>
              <FormControl
                value = {this.state.formFieldInput.email}
                onChange={this.onChange}
                type = "text"
                name="email"
                placeholder = "이메일">
              </FormControl>
              <FormControl.Feedback/>
                <HelpBlock>{this.state.formFieldMessage.emailValError}</HelpBlock>
              </FormGroup>
            <FormGroup
              validationState = {this.state.formFieldValid.passwordValid}
            >
            <ControlLabel>비밀번호</ControlLabel>
            <FormControl
              value = {this.state.formFieldInput.password}
              onChange={this.onChange}
              type = "password"
              name="password"
              placeholder="비밀번호">
            </FormControl>
            <FormControl.Feedback/>
              <HelpBlock>{this.state.formFieldMessage.passwordValError}</HelpBlock>
            </FormGroup>
            <FormGroup>
            <Button bsStyle="primary" block type = "submit">
              확인
            </Button>
            </FormGroup>
          </Form>
          <a href = "http://localhost:5000/api/users/google_auth"><GoogleLoginButton text={"구글 로그인"} align = {'center'}></GoogleLoginButton></a>
          <a href = "http://localhost:5000/api/users/naver_auth"><Button bsStyle ="success" block>네이버 계정으로 시작하기</Button></a>
        </div>
    );
  }
}

SignInForm.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(SignInForm);

// form에 입력된 값의 유효성 검사를 수행하는 helper class
class FormChecker {
  // 객체 생성시 필드명, 필드값, 유효성 조건을 저장한다. 
  constructor (fieldName,value,validationInfo){
      this.fieldName = fieldName;
      this.value = value;
      this.validationInfo = validationInfo;
  }

  // 특정 필드가 주어진 복수의 유효성 조건을 만족하는지 판단한다.
  // 판단 후 validResult 객체로 검사 결과를 반환한다.
  validate () {

      let validResult = {
          fieldName : this.fieldName,
          isCorrect : null,
          message : ''
      }

      if (this.validationInfo.length == 0)
          return validResult;

      for (var rule of this.validationInfo){

          if (!rule['method'](this.value,rule['args'])){
              
              validResult = {
                  fieldName : this.fieldName,
                  isCorrect : 'error',
                  message : rule['message']
              };

              return validResult;
          }
      }
      
      return validResult;
  }
}