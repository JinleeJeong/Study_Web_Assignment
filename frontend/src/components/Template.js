import React, { Component, Fragment } from 'react';
import './Template.css';
import { ButtonToolbar, Button, Row, Col, Image } from 'react-bootstrap';
import test from '../images/test.png';

class Template extends Component {
  render() {
    return (
      <Fragment>
        <div className="_container">
          <section className="background">
            <div className ="background_image">
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
                      <Image src={test} />
                    </Col>
                    <Col sm={8} md={4}>
                      <Image src={test} />
                    </Col>
                    <Col smHidden md={4}>
                      <Image src={test} />
                    </Col>
                    <Col xs={8} md={4}>
                      <Image src={test} />
                    </Col>
                    <Col xs={8} md={4}>
                      <Image src={test} />
                    </Col>
                    <Col md={4}>
                      <Image src={test} />
                    </Col>
                  </Row>
                </div>                        
              </div>
            </div>
          </section>
        </div>
        <div className="footer">
          <footer>
            <div className="footer_introduce">
                Study Project_Layout
            </div>
            <div>
            
            </div>
          </footer>
        </div>
      </Fragment>
    );
  }
}

export default Template;