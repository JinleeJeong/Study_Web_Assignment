import React, { Component } from 'react';
import './Detail.css';
import {createFilter} from 'react-search-input';
import { AppContext } from '../../contexts/appContext';
const KEYS_TO_FILTERS = ['id'];

// import { ButtonToolbar, Button, Row, Col, Image } from 'react-bootstrap';
class Detail extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      boards: [],
      detailTerm: props.match.params.id,
    }
    // this.searchUpdated = this.searchUpdated.bind(this)
  }

  async componentDidMount() {
    // 진리님 코드
    // axios.get('http://localhost:8080/api/contents/detail/'+this.state.detailTerm)
    //   .then(res => {
    //     this.setState({
    //   boards : res.data,
    //   });
    //     console.log(this.state.contents);
    //   });
    const { detailTerm } = this.state;
    this.setState({
      boards: await this.context.actions.getContentsDetail(detailTerm),
    })
  };

  render() {
    const filter = this.state.boards.filter(createFilter(this.state.detailTerm, KEYS_TO_FILTERS))
    console.log(this.state.detailTerm);
    return (
      <section className="infoma">
      <div>
        <div>
          <div className="info_search">정렬 기준 : 정확도 순</div>
          <div className="info_cate"> 
                <div className = "info_category_1">
                {filter.map((board, index) => {
                  return (
                    <div className = "info_divided" key={index}>
                          <button className="info_button"><div className ="info_named"><img src ={`http://localhost:8080/`+board.imageUrl} alt ="Testing" width ="50%" height="50%"/></div></button>
                          <div className ="info_title">{board.title}</div>
                          <div className ="info_description">{board.description}</div>
                          <div className ="info_category">{board.category}</div>
                        </div>
                )
                })} 

                </div>
          </div>                        
        </div>
      </div>
    </section>
    );
  }
}

export default Detail;