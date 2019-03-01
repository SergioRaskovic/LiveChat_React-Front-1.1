import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Particles from 'react-particles-js';
import Login from '../Login';
import Registration from '../Registration';
import Logo from '../Logo/Logo.js';
import { Container, Row, Col, Button } from 'reactstrap';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      registration: false,
      redirect: false,
    }
  }
  
  handeLog = () => {
    this.setState({
      login: true,
      registration: false
    });
  }
  handleReg = () => {
    this.setState({
      login: false,
      registration: true
    })
  }
  
  handleTriger = () => {
    this.setState({ redirect: true }, () => this.props.history.push('/ChatContainerALL'))
  }

  render() {
    const particleOptions= {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 1000,
          }
        },
        "color": {
          "value": "random",
        },
      },
    };

    return(
      <>
        <Particles className='particles' params={particleOptions} />
        <Container>
          <Row>
            <Col xs="6" className='left'><Logo /></Col>
            <Col xs="6" >
              <Row className="red">
                <Col>
                  <Button id='login' onClick={this.handeLog}>Login</Button>
                  <Button id='registration' onClick={this.handleReg}>Registration</Button>
                  {this.state.login ? <Login trigerChat={this.handleTriger} /> : null}
                  {this.state.registration ? <Registration trigerChat={this.handleTriger} /> : null}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(HomePage);
