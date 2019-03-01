import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ChatBox from './ChatBox';
import Sidebar from './Sidebar/Sidebar';
import ChatContainer from './ChatContainer';
import SendingMessages from './SendingMessages';
import './ChatContainerALL.css';



class ChatContainerALL extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      toggle: true
	    }
	  }

	handleToggle = () => {
		if(!this.state.toggle){
			this.setState({
				toggle: true
			})}
		else{
			this.setState({
				toggle: false,
			
		})
	}
	}


	render() {	
		return(
			<div className="wrapper">
					<div className='rows'>
						<aside className="aside aside-1"><Sidebar EditProfile={this.handelEditProfile} Hide={this.handleToggle}/> </aside>
						{this.state.toggle ?
	  					<aside className="aside aside-2" >Toggle private messages</aside> : null}
  					</div>
  					<div className='columns'>
	  					<div className="container1">
	  						<ChatContainer/>
						</div>
						<div className='container2'>
							<SendingMessages/>
						</div>
					</div>

			</div>
			);
		}
	}

export default ChatContainerALL;   //need to export grapfql querry