import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './MyMessagePage.css';
import {checkAuth} from '../../actions/authenticationActions';
import {useContext} from '../../provider/AppProvider';

class MyMessagePage extends Component {

    constructor (props){
      super(props);
      this.props.actions.checkAuth();
    }

    render (){
        return (
            <div className = "row">
                <div className = "col-md-4 col-md-offset-4">
                    MessagePage
                </div>
            </div>
        );
    }
}

export default useContext(MyMessagePage);