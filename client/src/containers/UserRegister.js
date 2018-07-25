import React, { Component } from 'react';
import SignupUserForm from '../forms/signupUserForm'



class UserRegister extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<div><SignupUserForm /></div>
		)
	}
}

export default UserRegister;