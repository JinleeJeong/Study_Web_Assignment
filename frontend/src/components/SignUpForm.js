import React, {Component} from 'react';
import Validation from '../methods/Validation';
import FormChecker from '../methods/FormChecker';
import validator from 'validator';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

class SignUpForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      formFieldInput : 
      {
        userName : '',
        email: '',
        password:'',
        passwordConfirmation : ''
      },
      formFieldValid :
      {
        userNameValid : null,
        emailValid : null,
        passwordValid : null,
        passwordConfirmationValid : null,
      },
      formFieldMessage :
      {
        userNameValError : '',
        emailValError : '',
        passwordValError : '',
        passwordConfirmationValError : ''
      }
  }
  
  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
}

validateFields(){
  
  const entries = Object.entries(this.state.formFieldInput);
  let formChecker,validationResult;
  let newFormFieldValid = {},newFormFieldMessage = {};

  for (const [fieldName,value] of entries) {
    switch (fieldName){
      case 'userName' :
          // 만족해야 하는 조건 순서대로 넘겨주기
          
          formChecker = new FormChecker (fieldName,value,[
              {
                  method : Validation.isNotEmpty,
                  args : [],
                  message : '공란일 수 없습니다'
              },
              {
                  method : Validation.strLengthCondition,
                  args : [{min : 2, max : 10}],
                  message : 2 + ' 글자 이상 ' + 10 + ' 글자 이하여야 합니다' 
              }
      ]);
      break;

      case 'email' :
          formChecker = new FormChecker (fieldName,value,[
              {
                  method : Validation.isNotEmpty,
                  args : [],
                  message : '공란일 수 없습니다'
              },
              {
                  method : validator.isEmail,
                  args : [],
                  message : '올바른 이메일 형식이 아닙니다'
              }
          ]);
      break

      case 'password' :
          formChecker = new FormChecker (fieldName,value,[
              {
                  method : Validation.isNotEmpty,
                  args : [],
                  message : '공란일 수 없습니다'
              },
              {
                  method : Validation.passwordStrengthCondition,
                  args : [],
                  message : '특수문자 포함 최소 8자 ~ 최대 20자 이내로 입력합니다.'
              }
          ]);
          //console.log('password');
      break;

      case 'passwordConfirmation' :
          formChecker = new FormChecker (fieldName,value,[
              {
                  method : Validation.isNotEmpty,
                  args : [],
                  message : '공란일 수 없습니다'
              },
              {
                  method : Validation.sameAsPassword,
                  args : [{confirmationStr : this.state.formFieldInput.password}],
                  message : '비밀번호가 일치하지 않습니다'
              }
          ]);
          //console.log('passwordConfirmation');
        break;
        default :
        break;
      }
      
      validationResult = formChecker.validate();
      newFormFieldValid[validationResult['fieldName'] + 'Valid'] = validationResult['isCorrect'];
      newFormFieldMessage[validationResult['fieldName'] + 'ValError'] = validationResult['message'];
  }

  console.log('newFormFieldValid', newFormFieldValid)
  /*
  this.setState(prevState =>({
      formFieldValid : {
          ...prevState.formFieldValid,
          [validationResult['fieldName']+'Valid'] : validationResult['isCorrect'] 
      },
      formFieldMessage : {
          ...prevState.formFieldMessage,
          [validationResult['fieldName']+'ValError'] : validationResult['message']
      } 
  }));*/
  this.setState(prevState =>({
    ...prevState,
    formFieldValid :  newFormFieldValid,
    formFieldMessage : newFormFieldMessage,
  }));
  console.log('this.state.formFieldValid', this.state.formFieldValid);
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
  this.validateFields();

  const { userName, email, password } = this.state.formFieldInput;
  const { userNameValid, emailValid, passwordValid, passwordConfirmationValid } = this.state.formFieldValid;

  if( userNameValid === 'error' || emailValid === 'error' || passwordValid === 'error' || passwordConfirmationValid === 'error') {
    console.log('유효성 x');
    return false;
  }

  axios.post('http://localhost:8080/api/user/signup', { userName, email, password })
  .then((result) => {
    return <Redirect to='/signup'  />
  })
  .catch((err) => { console.log(err) });

  console.log('onsubmit');
}

render (){
  return (
      <Form onSubmit = {this.onSubmit}>
      <h1 className = "FormHeader">회원가입</h1>
        <FormGroup
          validationState = {this.state.formFieldValid.userNameValid} 
        >
        <ControlLabel>이름</ControlLabel>
          <FormControl
            value = {this.state.formFieldInput.userName}
            onChange={this.onChange}
            type = "text"
            name="userName">
          </FormControl>
          <FormControl.Feedback/>
            <HelpBlock>{this.state.formFieldMessage.userNameValError}</HelpBlock>
          </FormGroup>

          <FormGroup
            validationState = {this.state.formFieldValid.emailValid}
          >
          <ControlLabel>이메일 주소</ControlLabel>
            <FormControl
              value = {this.state.formFieldInput.email}
              onChange={this.onChange}
              type = "text"
              name="email">
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
            name="password">
          </FormControl>
          <FormControl.Feedback/>
            <HelpBlock>{this.state.formFieldMessage.passwordValError}</HelpBlock>
          </FormGroup>
          <FormGroup
            validationState = {this.state.formFieldValid.passwordConfirmationValid}
          >
          <ControlLabel>비밀번호 확인</ControlLabel>
            <FormControl
              value = {this.state.formFieldInput.passwordConfirmation}
              onChange={this.onChange}
              type = "password"
              name="passwordConfirmation">
            </FormControl>
            <FormControl.Feedback/>
            <HelpBlock>{this.state.formFieldMessage.passwordConfirmationValError}</HelpBlock>
          </FormGroup>
          <FormGroup>
            <Button bsStyle="primary" block type = "submit">
              확인
            </Button>
          </FormGroup>
      </Form>
    );
  }
}

export default SignUpForm