import React, { Component, Fragment } from 'react';
import './Template.css';
import { ButtonToolbar, Button, Row, Col, Image } from 'react-bootstrap';
import movie from '../images/movie.mp4'
class Template extends Component {
  render() {
    return (
      <Fragment>
        <div className="_container">
          <section className="background">
            <div className="background_video">
                <video loop muted={this.props.muted} autoPlay="true">
                    <source type="video/mp4" data-reactid=".0.1.0.0.0" src={movie} />
                </video>
                  <div className="background_text">
                    <ul className="background_li">
                      <li>Study Web Project</li>
                      <li>
                        <ButtonToolbar>
                        <Button>회원가입</Button>
                        </ButtonToolbar>
                      </li>
                    </ul>
                  </div>
              <div className="background_search">
                <div className="background_search_text">
                  <input type="text" ></input>
                  <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                  <div className="background_search_text_middle">지역 : 서울, KR</div>
                </div>
              </div>
              
            </div>
            
          </section>
          <section className="info">
            <div>
              <div>
                <div className="info_search">정렬 기준 : 정확도 순</div>
                <div className="info_photo"> 
                  <Row className="show-grid">
                    <Col xs={12} sm={8} md={4}>
                      <Image src={this.props.test} />
                    </Col>
                    <Col sm={8} md={4}>
                      <Image src={this.props.test} />
                    </Col>
                    <Col smHidden md={4}>
                      <Image src={this.props.test} />
                    </Col>
                    <Col xs={8} md={4}>
                      <Image src={this.props.test} />
                    </Col>
                    <Col xs={8} md={4}>
                      <Image src={this.props.test} />
                    </Col>
                    <Col md={4}>
                      <Image src={this.props.test} />
                    </Col>
                  </Row>
                </div>                        
              </div>
            </div>
          </section>
        </div>
        
      </Fragment>
    );
  }
}

export default Template;