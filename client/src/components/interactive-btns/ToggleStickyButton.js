import React from 'react';
import {hideIfNoPermission} from '../../utils/permissionChecker';

const ToggleStickyButton = (props) => {
    // TODO: Permission Control
    const {sticky, onClick} = props;
    return (
        <button type="button" className="btn btn-light btn-sm" onClick={onClick}>
            <i className="fas fa-thumbtack" />
            <span>{sticky ? 'Unset Sticky' : 'Set Sticky'}</span>
        </button>
    )
};
export default hideIfNoPermission(ToggleStickyButton);
