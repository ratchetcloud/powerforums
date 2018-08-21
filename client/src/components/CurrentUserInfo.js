import React from 'react';
import { NavLink } from 'react-router-dom'

const CurrentUserInfo = (props) => {
    if (props.currentUser) {
        return (
            <div className="current-user-info">
                <span className="pr-3">Hi {props.currentUser.name}</span>
                <button className="btn btn-outline-primary btn-sm" onClick={props.onLogout}>Logout</button>
            </div>
        );

    }else{
        return (
            <div className="current-user-info">
                <NavLink to={"/login?next=" + encodeURIComponent(location.pathname)} className="btn btn-outline-primary btn-sm">
                    LOGIN
                </NavLink>
                <NavLink to="/signup" className="btn btn-primary btn-sm">
                    SIGN UP
                </NavLink>
            </div>
        );
    }
};
export default CurrentUserInfo;
