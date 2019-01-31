
import React, { Component, Fragment } from 'react';
import './Main.css';
import {ButtonToolbar, Button, Row, Col, Image} from 'react-bootstrap';
import movie from '../images/movie.mp4'



class Template extends Component {
  render() {
    return (
      <Fragment>
        <div className="_container">
          <section className="background">
            <div className="video">
                <video classNAme = "video-container video-container-overlay" loop muted={this.props.muted} autoplay="true">
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
            </div>
          </section>

          <section className="info">
            <div>
              <div>
                <div className="info_photo"> 
                  <Row className="show-grid">
                    <Col xs={12} sm={8} md={4}>
                      <Image src={this.props.test} />
                    </Col>
                    <Col xshidden sm={8} md={4}>
                      <Image src={this.props.test} />
                    </Col>
                    <Col  xshidden smHidden md={4}>
                      <Image src={this.props.test} />
                    </Col>
                    <Col xs={8} md={4}>
                      <Image src={this.props.test} />
                    </Col>
                    <Col xs={8} md={4}>
                      <Image src={this.props.test} />
                    </Col>
                    <Col xshidden md={4}>
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