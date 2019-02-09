import React, {Component} from 'react';
import './SignInPage.css';
import SignInForm from './SignInForm';

class SignInPage extends Component {
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

export default SignInPage
