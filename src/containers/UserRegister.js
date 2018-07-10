import React, { Component } from 'react';
import CreateUserForm from '../forms/createUserForm'



class UserRegister extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<div><CreateUserForm /></div>
		)
	}
}

export default UserRegister;