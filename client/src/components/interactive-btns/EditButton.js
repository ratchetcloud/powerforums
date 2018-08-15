import React from 'react';
import {hideIfNoPermission, CAN_IF_OWNER} from '../../utils/permissionChecker';

const EditButton = (props) => {
    const {onClick} = props;
    return (
        <button type="button" className="btn btn-light btn-sm" onClick={onClick}>
            <i className="fas fa-edit" />
            <span>Edit</span>
        </button>
    )
};

export default hideIfNoPermission(CAN_IF_OWNER)(EditButton);