import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Particles from 'react-particles-js';
import {Form, FormGroup, Label, Input, Button, Container, Row, Col } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import './EditProfile.css';
import gificon from './gificon.png';
import img1 from './img1.png';
import img2 from './img2.png';
import HoverImage from "react-hover-image";


class EditProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      newUsername: "",
      password:"",
      newPassword:"",
      back: false,
      usernameValid: "",
      newUsernameValid: "",
      passwordValid: "",
      newPasswordValid: "",
      
    }
  }

   handleGoBack = () => {
    this.setState({ ChatContainerALL: true }, () => this.props.history.push('/ChatContainerALL'))
  }

handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })

  };

  checkValid = () => {
    let usernameValid = "";
    let newUsernameValid = "";
    let passwordValid = "";
    let newPasswordValid = "";

    if (!this.state.newUsername && !this.state.newPassword){
      newUsernameValid = "You are not changing your username";
      newPasswordValid = "You are not changin your password";
    }
    if (this.state.newUsername && !this.state.username) {
      usernameValid = "Enter your username";
    }
    if (this.state.newPassword && !this.state.password) {
      passwordValid = "Enter your password";
    }
    if (this.state.newPassword && this.state.password) {
      if(this.state.newPassword.length < 5) {
        newPasswordValid = "Password needs to have more than 5 characters";
      }
    }
    if (usernameValid || newUsernameValid || passwordValid || newPasswordValid) {   
      this.setState({ usernameValid, newUsernameValid, passwordValid, newPasswordValid });
      return false;
    }
    else {
      this.setState({ usernameValid, newUsernameValid, passwordValid, newPasswordValid });
      return true;
    }
}

  handleSubmit = async (e) => {    
    e.preventDefault();
    const check = await this.checkValid();
    if(!check) {
    }
    else {
      const getToken = JSON.parse(localStorage.getItem('jwt'))
      const token = getToken.data.login || getToken.data.register

      var edit_profile = await this.props.mutate({
        variables: {
          username : this.state.username,
          newUsername : this.state.newUsername,
          password : this.state.password,
          newPassword : this.state.newPassword,
          token: token
        },
      });

     if (edit_profile.data.updateUser === "Username already taken") {
        var newUsernameValid = 'Username already taken';
        this.setState({ newUsernameValid })
      }
      else if (edit_profile.data.updateUser === "Username already taken") {  // provjera za stari password! 
        var passwordValid = "Your old password isn't correct!";
        this.setState({ passwordValid })
      }
      else {
        this.setState({ back: true }, () => this.props.history.push('/HomePage'))
      }
    }
}


  render(){
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
          type: 'images',
                          
        },
      },
    };

    
  return(
    <>
       <Particles className='particles' params={particleOptions} />
       <Container>
       <Row className='row'>
          <Col className='first col-xs-6 hidden-xs-down' >  
              <div className='changingImage'>        
               <HoverImage
                style={{width: '500px', height: '500px',marginTop:'8vh', marginLeft: '-4vh', display: 'flex'}}                  
                  src={img1}
                  hoverSrc={img2}
                  id='photo'
                />    
                </div>   

                 
          </Col>
          <Col className='second col-xs-6'>
          <div className=" col-md-9   " id='formShape'>
            <Form onSubmit={e => this.handleSubmit(e)} >
                <FormGroup>
                  <p className='infoEdit'>EDIT YOUR INFO</p>
                  <Label className= 'white' htmlFor="username">Username</Label>
                  <Input 
                  type="text" 
                  name="username" 
                  id="username" 
                  placeholder="Type your username"
                  value={this.state.username}
                  onChange = {e => this.handleChange(e)}  />
                  <div style={{color: "red"}}> {this.state.usernameValid} </div>
                </FormGroup>
                <FormGroup>
                  <Label className= 'white' htmlFor="email">New username</Label>
                  <Input 
                  type="text" 
                  name="newUsername" 
                  id="newUsername" 
                  placeholder="Type your new username"
                  value={this.state.newUsername}
                  onChange = {e => this.handleChange(e)}
                  />
                  <div style={{color: "red"}}> {this.state.newUsernameValid} </div>
                </FormGroup>
                <FormGroup>
                  <Label className= 'white' htmlFor="password"> Password </Label>
                  <Input 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange = {e => this.handleChange(e)}
                  />
                  <div style={{color: "red"}}> {this.state.passwordValid} </div>
                </FormGroup>
                <FormGroup>
                  <Label className= 'white' htmlFor="newPassword"> New password </Label>
                  <Input 
                  type="password" 
                  name="newPassword" 
                  id="password1" 
                  placeholder="Enter your new password"
                  onChange = {e => this.handleChange(e)}
                  />
                  <div style={{color: "red"}}> {this.state.newPasswordValid} </div>
                </FormGroup>
                <Button type="submit" 
                  name="submit" 
                  id="button"                   
                  >Submit</Button>
                 <Button className='backButton' onClick={this.handleGoBack}>BACK</Button>
            </Form>

          </div>
          </Col>
        </Row>
        </Container>
      
      
    </>
    )
  }
} 

const updateUserMutation = gql`
  mutation updateUser($username: String, $newUsername: String, $password: String, $newPassword: String, $token: String!) {
    updateUser(username : $username, newUsername : $newUsername, password : $password, newPassword: $newPassword, token: $token)
  }
`;

export default graphql(updateUserMutation)(withRouter(EditProfile)); 