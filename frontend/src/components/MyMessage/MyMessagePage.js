import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import './MyMessagePage.css';
import {useContext} from '../../provider/AppProvider';
import socketIOClient from "socket.io-client";
import Inbox from './Inbox';
import axios from 'axios';

class MyMessagePage extends Component {

    constructor (props){
      super(props);

      this.getArrivalMessage = this.getArrivalMessage.bind(this);
      this.messagePagerHandler = this.messagePagerHandler.bind(this);

      this.state = {
        messages: [],
        messagePagerInfo: {
          total : null,
          showNum : 10,
          page: 1
        }
      }
      
      this.props.actions.checkAuth()
        .then (()=>{

          if (!this.props.value.signInInfo.status)
            return;

          this.props.value.socketConnection.io.on('test',(data) => this.getArrivalMessage(data));

          axios.post('/api/messages',this.state.messagePagerInfo)
          .then(res => {
            console.log(res);
            this.setState({
              ...this.state,
              messages: res.data.list,
              messagePagerInfo: {
                ...this.state.messagePagerInfo,
                total: res.data.total
              } 
            })
          })
        })
    }

    getArrivalMessage(data){
      console.log("hi")
      if(!this.props.value.signInInfo.status || this.props.value.signInInfo.id != data.recipient)
        return true
    
      const newList = [data, ...this.state.messages.slice(0,-1)]
      
      this.setState({
        ...this.state,
        messages: newList});
    }

    
    renderingList = ()=>{
      const messages = this.state.messages.map(message=>{
        return <Inbox key = {message._id}
          title = {message.title}
          body = {message.body}
          seen = {message.seen}
          sender = {message.sender}
          recipient = {message.recipient}
          sendedAt = {message.sendedAt}
        ></Inbox>
        
      });

      return <ul className = "list-group"> {messages} </ul>;
    }

    componentWillUnmount(){
      console.log("unmount");

      if (this.props.value.socketConnection.io){
        this.props.value.socketConnection.io.off('test');
      }
    }

    messagePagerHandler (id) {
      let {total,page} = this.state.messagePagerInfo;
      const {showNum} = this.state.messagePagerInfo;

      if (id == "right")
          page = page + 1;
      else
          page = page - 1;
      

      axios.post('/api/messages',{
        ...this.state.messagePagerInfo,
        page : page
      })
      .then(res => {
        console.log(res);
        this.setState({
          ...this.state,
          messages: res.data.list,
          messagePagerInfo: {
            ...this.state.messagePagerInfo,
            total: res.data.total,
            page: res.data.page
          } 
        },()=>console.log(this.state.messagePagerInfo))
      });
      
    }

    render (){
      const{total,showNum ,page} = this.state.messagePagerInfo;
        return (
          <div className = "page">
            <div className = "aboveList">
              <div class = "btn-group">
              <button disabled = {page == 1} onClick = {()=>this.messagePagerHandler("left")} type ="button" class ="btn btn-default">
                <span class="glyphicon glyphicon-chevron-left"></span>
              </button>
              <button disabled = {page == Math.ceil(total/showNum)} onClick = {()=>this.messagePagerHandler("right")} type ="button" class ="btn btn-default">
                <span class="glyphicon glyphicon-chevron-right"></span>
              </button>
              </div>
            </div>

            <div>
              {this.renderingList()}
            </div>

          </div>
        );
    }
}

export default useContext(MyMessagePage);