import React, { Component,Fragment } from 'react';
import {Dropdown, MenuItem, Image, Clearfix, Badge} from 'react-bootstrap';
import './Avatar.css';
import axios from 'axios';
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import {useContext} from '../../../provider/AppProvider';


class Avatar extends Component{

  constructor(props){
    super(props);
    
    this.state = {
      unseenNumber : 0
    }

    axios.get('/api/messages/unseenmessages')
      .then (unseenInfo =>{
        this.setState({
          ...this.state,
          unseenNumber: unseenInfo.data.unseenNumber
        }) 
      });
    
    this.onSelectHandler = this.onSelectHandler.bind(this);
    this.getUnseenMessage = this.getUnseenMessage.bind(this);
  }

  getUnseenMessage(data){
    console.log(data)
    if (data.recipient == this.props.value.signInInfo.id){
      this.setState({
        ...this.state,
        unseenNumber: this.state.unseenNumber + data.addNum
      });
    }
  }

  onSelectHandler (eventKey){
    if (eventKey == 'mypage'){
      this.props.history.push('/mypage')
    }else if (eventKey == 'mymessage'){
      this.props.history.push('/mymessagepage');
    }else {
      axios.post('/api/users/signout')
      .then (()=> {console.log("logout");window.location.reload()})
    }
  }

  /*
  static getDerivedStateFromProps(nextProps, prevState){
    console.log(nextProps)
    console.log("j")
    console.log(prevState)
  } */

  componentDidMount(){
    console.log("avatar mounted..");
    this.props.value.socketConnection.io.on('unseenMessage',(data) => this.getUnseenMessage(data));
  }

  componentWillUnmount(){
    console.log("avatar unmount..");
    console.log(this.props.value.socketConnection.io)
    this.props.value.socketConnection.io.removeListener('unseenMessage',this.getUnseenMessage);
  }

  render (){
    return (
      <Dropdown>
        <CustomToggle bsRole = "toggle">
          <Image className = "userProfile" src = "http://image.newsis.com/2018/05/28/NISI20180528_0014122801_web.jpg"/>
        </CustomToggle>
        <Clearfix bsRole = "menu">
          <MenuItem eventKey = "mypage" onSelect = {this.onSelectHandler}>마이페이지</MenuItem>
          <MenuItem eventKey = "mymessage" onSelect = {this.onSelectHandler}> <span> 쪽지함 </span> <Badge style = {{color: 'white', background: '#ff4767'}}>{this.state.unseenNumber}</Badge></MenuItem>
          <MenuItem eventKey = "signout" onSelect = {this.onSelectHandler}>로그아웃</MenuItem>
        </Clearfix>
      </Dropdown> )
  }

}

Avatar.propType = {
  history: PropTypes.object.isRequired,
}

export default useContext(withRouter(Avatar));

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

