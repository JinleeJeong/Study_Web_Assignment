import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './SignInPage.css';
import SignInForm from './SignInForm';
import {useContext} from '../../provider/AppProvider';
class SignInPage extends Component {

    constructor (props){
      super(props);
      this.props.actions.checkAuth();
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

export default useContext(SignInPage);
