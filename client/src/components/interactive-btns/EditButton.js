import React from 'react';
import {NavLink} from 'react-router-dom';
import {hideIfNoPermission, CAN_IF_OWNER} from '../../utils/permissionChecker';

const EditButton = (props) => {
    const {onClick, to} = props;

    if (to) {
        return (
            <NavLink role="button" to={to} className="btn btn-light btn-sm">
                <i className="fas fa-edit"/>
                <span>Edit</span>
            </NavLink>
        );

    }else {
        return (
            <button type="button" onClick={onClick} className="btn btn-light btn-sm">
                <i className="fas fa-edit"/>
                <span>Edit</span>
            </button>
        );
    }
};

export default hideIfNoPermission(CAN_IF_OWNER)(EditButton);