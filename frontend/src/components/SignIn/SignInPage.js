import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './SignInPage.css';
import SignInForm from './SignInForm';
import {checkAuth} from '../../actions/authenticationActions';

class SignInPage extends Component {

    constructor (props){
      super(props);
      this.props.checkAuth();
    }

    render (){
        return (
            <div className = "row">
                <div className = "col-md-4 col-md-offset-4">
                    <SignInForm/>
                </div>
            </div>
        );
    }
}

SignInPage.PropTypes = {
  checkAuth: PropTypes.func.isRequired
}

export default connect (null,{checkAuth})(SignInPage)
