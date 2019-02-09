import React, { Component } from 'react';
import axios from 'axios';

class ContentsListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents : [],
    }
  }
  componentDidMount() {
    axios.get('http://localhost:8080/api/contents')
    .then(res => {
      this.setState({
        contents: res.data,
      })
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      this.state.contents.map((contents, index) => {
        return <div key={index}>
          <h1>{contents.title}</h1> 
          <p>분류 : {contents.category}</p> 
          <p>스터디 설명 : {contents.description}</p>
          <img src={`http://localhost:8080/${contents.imageUrl}`} width="250" height="250" alt="coverimg" />
        </div>
      })
    );
  }
}

export default ContentsListView;