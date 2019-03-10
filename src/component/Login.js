import React, { Component } from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'; 
import './Login.css';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Login extends Component {
	constructor(props) {
  	super(props);
  	this.state = {
  		username: '',
  		password: '',
      usernameValid: '',
      passwordValid: '',
  	}
	};

  checkValid = () => {
    let usernameValid = "";
    let passwordValid = "";

    if(!this.state.username) {
      usernameValid = "Username can't be empty";
    }
    if(this.state.password.length < 5) {
      passwordValid = "Password needs to have more than 5 characters";
    }

  if (usernameValid || passwordValid) {
    this.setState({ usernameValid, passwordValid});
    return false;
  }
  else {
    this.setState({ usernameValid, passwordValid});
    return true;
  }
}

	handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  	};

	handleSubmit = async (e) => {
    e.preventDefault();
    const check = await this.checkValid();    
    if(!check) {  
    }
    else {
      var token = await this.props.mutate({
        variables: {
          username : this.state.username,
          password : this.state.password
        },
      });
      if (token.data.login === "There is no user with that username") {
        var usernameValid = "There is no user with that username";
        this.setState({ usernameValid })
      }
      else if (token.data.login === "Incorrect password") {
        var passwordValid = 'Incorrect password';
        this.setState({ passwordValid })
      }
      else {
        localStorage.setItem('jwt', JSON.stringify(token));
        this.props.trigerChat();
      }
    }
	};

 render() {
    return (
      <div className="col-md-8" id='bc-login'>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <FormGroup>
            <Label className= 'white' htmlFor="username">Username</Label>
              <Input 
                type="text" 
                name="username" 
                id="username" 
                placeholder="Type your username"
                value={this.state.username}
                onChange = {e => this.handleChange(e)} />
                <div style={{color: "red"}}> {this.state.usernameValid} </div>
          </FormGroup>
          <FormGroup>
            <Label className= 'white' htmlFor="password">Password</Label>
              <Input 
                type="password" 
                name="password" 
                id="password" 
                placeholder="Type your password"
                value={this.state.password}
                onChange = {e => this.handleChange(e)} />
                <div style={{color: "red"}}> {this.state.passwordValid} </div>
          </FormGroup>
          <Button 
            type="submit" 
            name="submit" 
            id="button" 
            color="primary"
            >Login </Button>
        </Form>
      </div>      
    );
  }
}

const loginMutation = gql`
  mutation login($username: String!, $password: String!) {
    login(username : $username, password : $password)
  }
`;

export default graphql(loginMutation)(Login);

