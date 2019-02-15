import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './SignUpPage.css';

import SignUpForm from './SignUpForm';
import {checkAuth} from '../../actions/authenticationActions';

class SignUpPage extends Component {
  
  constructor (props){
    super(props);
    this.props.checkAuth();
  }

  render (){
      return (
          <div className = "row">
              <div className = "col-md-4 col-md-offset-4">
                  <SignUpForm/>
              </div>
          </div>
      );
  }
}

SignUpPage.PropTypes = {
  checkAuth: PropTypes.func.isRequired
}

export default connect (null,{checkAuth})(SignUpPage)

