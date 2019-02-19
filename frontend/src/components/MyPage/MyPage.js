import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './MyPage.css';
import {checkAuth} from '../../actions/authenticationActions';
import {useContext} from '../../provider/AppProvider';

class MyPage extends Component {

    constructor (props){
      super(props);
      this.props.actions.checkAuth();
    }

    render (){
        return (
            <div className = "row">
                <div className = "col-md-4 col-md-offset-4">
                  Hi
                </div>
            </div>
        );
    }
}

export default useContext(MyPage);