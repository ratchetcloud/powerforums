import React from 'react';
import {hideIfNoPermission} from '../../utils/permissionChecker';

const EditButton = (props) => {
    // TODO: Permission Control
    const {onClick} = props;
    return (
        <button type="button" className="btn btn-light btn-sm" onClick={onClick}>
            <i className="fas fa-edit" />
            <span>Edit</span>
        </button>
    )
};

export default hideIfNoPermission(EditButton);