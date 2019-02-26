import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './MyPage.css';
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
                  
                </div>
            </div>
        );
    }
}

export default useContext(MyPage);