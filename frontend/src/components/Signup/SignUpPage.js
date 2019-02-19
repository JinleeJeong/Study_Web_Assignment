import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './SignUpPage.css';

import SignUpForm from './SignUpForm';
import {checkAuth} from '../../actions/authenticationActions';
import {useContext} from '../../provider/AppProvider';

class SignUpPage extends Component {
  
  constructor (props){
    super(props);
    this.props.actions.checkAuth();
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

export default useContext(SignUpPage);

