import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Template.css';
import { ButtonToolbar, Button, Row, Col, Image } from 'react-bootstrap';
import { AppContext } from '../../contexts/appContext'
import test from '../../images/test.png';
/* global naver */

class Template extends Component {
  static contextType = AppContext;

  state = {
    addresses: [],
  }

  async componentDidMount() {
    this.context.actions.getCurrentPosition();
    // const currentLatLng = new naver.maps.LatLng(this.context.state.lat, this.context.state.lng);
    // console.log(currentLatLng);
    // this.setState({
    //   addresses: await this.getAddresses(currentLatLng),
    // })
  };
  
  // getAddresses = (latlng) => {
  //   const tm128 = naver.maps.TransCoord.fromLatLngToTM128(latlng);
    
  //   return new Promise((resolve, reject) => {
  //     naver.maps.Service.reverseGeocode({
  //       location: tm128,
  //       coordType: naver.maps.Service.CoordType.TM128
  //     },(status, response) => {
  //         if (status === naver.maps.Service.Status.ERROR) {
  //           return reject(alert('지도 API 오류입니다.'));
  //         };
  
  //         const { items } = response.result;
  //         const addresses = [];

  //         for (let i=0, ii=items.length, item; i<ii; i++) {
  //           item = items[i];
  //           addresses.push(item.address);
  //         };
  //         return resolve(addresses);
  //     });
  //   });
  // }

  render() {
    const { lat, lng } = this.context.state;
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
                      <Link to={`/write?lat=${lat}&lng=${lng}`}><Button>스터디 시작하기</Button></Link>
                    </ButtonToolbar>
                  </li>
                  <li>
                    <ButtonToolbar>
                      <Link to={`/near?lat=${lat}&lng=${lng}`}><Button>주위 스터디 리스트</Button></Link>
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