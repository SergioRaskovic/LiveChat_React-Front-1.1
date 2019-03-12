import React, {Component} from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import messagesicon from './messagesicon.png';
import sportsicon from './sportsicon.png';
import techicon from './techicon.png';
import travelicon from './travelicon.png';
import logouticon from './logouticon.png';
import mainchat from './mainchat.png';
import '../ChatContainerALL.css';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {withRouter} from "react-router-dom";
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const logoutMutation = gql`
  mutation logout($logged_token: String!) {
    logout(logged_token: $logged_token)
  }
`;

class Sidebar extends Component {
	constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      editProfile: false,
			logout: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleEditProfile = () => {
  	this.setState({ editProfile: true }, () => this.props.history.push('/EditProfile'))
  }

	handleLogout = async () => {
		const logged_token = JSON.parse(localStorage.getItem('jwt'));
		var logout_token = await this.props.mutate( {
			variables: {
				logged_token: logged_token.data.register || logged_token.data.login
				}
			}
		)
		localStorage.setItem('jwt', JSON.stringify(logout_token))
  	this.setState({ logout: true }, () => this.props.history.push('/'))
  }

render() {
	return(	
	<>	
	<div className="d-flex justify-content-start" id='cont'>
		<div className="groups">
			<ButtonGroup vertical>
					<Button className="Buttoni" id='button1' onClick={this.props.Hide}>
				  		<img className='imgbuttoni'  alt='messagesicon' src={messagesicon}/>				  			
				  	</Button>
				  	<Button onClick={()=>this.props.ChangingRoom("1")} className="Buttoni" id='button2'>
				  		<img className='imgbuttoni' alt='mainchat' src={mainchat}  />				  
				  	</Button>
					<Button  onClick={()=>this.props.ChangingRoom("2")} className="Buttoni" id='button3' >
						<img className='imgbuttoni' alt='travel' src={travelicon} />						
					</Button>
				    <Button onClick={()=>this.props.ChangingRoom("3")} className="Buttoni" id='button4'>
				    	<img className='imgbuttoni' alt='sportsicon' src={sportsicon} />				    
				    </Button>
					<Button onClick={()=>this.props.ChangingRoom("4")} className="Buttoni" id='button5' >
						<img className='imgbuttoni' alt='techicon' src={techicon}  />						
					</Button>
					<ButtonDropdown direction="right" isOpen={this.state.dropdownOpen} toggle={this.toggle} className="Buttoni" >
						  <DropdownToggle id='button6' className="Buttoni" caret><img className='imgbuttoni' alt='logout' src={logouticon}/>						  
						  </DropdownToggle>
						  <DropdownMenu className='pop-out-button'>
						    <DropdownItem onClick={this.handleEditProfile} >Edit profile</DropdownItem>
						    <DropdownItem onClick={this.handleLogout}>LOGOUT</DropdownItem>
						  </DropdownMenu>
						</ButtonDropdown>
				</ButtonGroup>
			</div>
	    </div>	
	</>
	);
}
}

export default graphql(logoutMutation)(withRouter(Sidebar));
