import React, { Component }  from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {Form, Input, Button, Container, ButtonGroup} from 'reactstrap'; 
import './SendingMessages.css';
import smileicon from './smileicon.png';
import gificon from './gificon.png';


class SendingMessages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			//UserId:
		}
	}

	sendingMessage = async (e) => {	
		const getToken = JSON.parse(localStorage.getItem('jwt'))

		const token = getToken.data.login || getToken.data.register

		await this.props.mutate({
			variables: {
				text: this.state.text, 
				chatroomId: this.props.chatroomId,
				token: token
				}
		});
		this.setState({ text: "" })
	}

	handleKeyPress = async (e) => {
		if(e.key === "Enter") {
			this.sendingMessage()
		}
	}


	render() {
		return(
			<div className="d-flex">
				<Container className="p-2 m col-10">
					<Form>
						<Input
							type="textarea"
							style={{maxwidth: "100%", boxsizing: "border-box", resize: "none", height: "25vh"}}
							name="text"
							id="message"
							value={this.state.text}
							placeholder="Enter your message(s)"
							onChange={e => this.setState( {text: e.target.value} )}
							onKeyPress={this.handleKeyPress}
							
						/>
					</Form>					
				</Container>
				<Container className=" p-1 col-2 btn-all">
					<ButtonGroup vertical size="sm">
					  <Button id='btn1' 
						onClick={this.sendingMessage}
						>Send
					</Button>

					 {/* <Button className= 'btn-all' id ='btn2'
						><img id='emoji-icon' alt='smile' src={smileicon}/>
						
					</Button>

					  <Button  className= 'btn-all' id= 'btn3'
						><img id='emoji-icon'  alt='smile' src={gificon}/>
					</Button>*/}
				 </ButtonGroup>

				</Container>
			</div>

				);
		}


}

const addMessageMutation= gql` 
  mutation addMessage($text: String!, $chatroomId: String!,$token: String!) {
    addMessage(text: $text, chatroomId: $chatroomId, token: $token) {
    	text
    }
  }
`;

export default graphql(addMessageMutation)(SendingMessages);