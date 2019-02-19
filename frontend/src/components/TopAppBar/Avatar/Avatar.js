import React, { Component,Fragment } from 'react';
import {Dropdown, MenuItem, Image, Clearfix, Badge} from 'react-bootstrap';
import './Avatar.css';
import axios from 'axios';
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'


class Avatar extends Component{

  constructor(props){
    super(props);

    this.onSelectHandler = this.onSelectHandler.bind(this);
  }

  onSelectHandler (eventKey){
    if (eventKey == 'mypage'){
      this.props.history.push('/mypage')
    }else if (eventKey == 'mymessage'){
      this.props.history.push('/mymessagepage');
    }else {
      axios.post('/api/users/signout')
      .then (()=> window.location.reload())
    }
  }

  render (){
    return (
      <Dropdown>
        <CustomToggle bsRole = "toggle">
          <Image className = "userProfile" src = "http://image.newsis.com/2018/05/28/NISI20180528_0014122801_web.jpg"/>
        </CustomToggle>
        <Clearfix bsRole = "menu">
          <MenuItem eventKey = "mypage" onSelect = {this.onSelectHandler}>마이페이지</MenuItem>
          <MenuItem eventKey = "mymessage" onSelect = {this.onSelectHandler}> <span> 쪽지함 </span> <Badge> 12 </Badge></MenuItem>
          <MenuItem eventKey = "signout" onSelect = {this.onSelectHandler}>로그아웃</MenuItem>
        </Clearfix>
      </Dropdown> )
  }

}

Avatar.propType = {
  history: PropTypes.object.isRequired
}

export default withRouter(Avatar);

class CustomToggle extends Component {
  
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
    console.log(e);
  }
  
  render() {
    return (
      <div onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
}

