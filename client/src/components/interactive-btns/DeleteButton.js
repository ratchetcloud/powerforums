import React from 'react';
import {hideIfNoPermission} from '../../utils/permissionChecker';

const DeleteButton = (props) => {
    // TODO: Permission Control
    const {onClick} = props;
    return (
        <button type="button" className="btn btn-light btn-sm" onClick={onClick}>
            <i className="fas fa-trash-alt" />
            <span>Delete</span>
        </button>
    )
};

export default hideIfNoPermission(DeleteButton);