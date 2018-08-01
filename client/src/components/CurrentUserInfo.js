import React from 'react';
import { NavLink } from 'react-router-dom'

const CurrentUserInfo = (props) => {
    if (props.currentUser) {
        return (
            <div>
                <span>Hi {props.currentUser.name}</span><br/>
                <button onClick={props.onLogout}>Logout</button>
            </div>
        );
    }else{
        return (
            <div>
                <NavLink to="/login">
                    <button>Login</button>
                </NavLink>
                <NavLink to="/signup">
                    <button>SignUp</button>
                </NavLink>
            </div>
        );
    }
};
export default CurrentUserInfo;
