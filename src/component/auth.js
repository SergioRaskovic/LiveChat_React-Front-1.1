import React, { Component } from 'react';
import axios from 'axios';

const getJWTtoken = () => {
	return localStorage.getItem('jwt'); 
}

class Auth extends Component {            //pomocu ove komponente cemo provjeravati autorizaciju usera, "wrap" oko glavne komponente chata
	constructor(props) {
		super(props);
		this.state = {
			user: undefined;
		}
	}

	componentDidMount() {
		const jwt = getJWTtoken();
		if(!jwt) {                  // ako nemamo JWT znaci da nismo logirani
			this.props.history.push('/Login')
		}

		/*axios.get('/getUser', { headers: Authorization: `Bearer ${jwt}` }).then(res => res.setState({ user: res.data  //getUser provjeriti u backendu routs
		})).catch(err => {
			localStorage.removeItem('MP-jwt');
			this.state.history.push('/Login');                   //razraditi error catch, ako je problem u serveru nema smisla pušati na login?
		})
	}*/

	render() {
		if(user === undefined){
			return(
			<div>Loading user(s)</div>
		);
		}
		return (
			<div>
				{this.props.children}
			</div>
		);
	}


}

export default Auth;