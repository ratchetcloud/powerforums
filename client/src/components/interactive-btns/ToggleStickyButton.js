import React from 'react';
import {hideIfNoPermission, CAN_SET_STICKY} from '../../utils/permissionChecker';

const ToggleStickyButton = (props) => {
    const {sticky, onClick} = props;
    return (
        <button type="button" className="btn btn-light btn-sm" onClick={onClick}>
            <i className="fas fa-thumbtack" />
            <span>{sticky ? 'Unset Sticky' : 'Set Sticky'}</span>
        </button>
    )
};
export default hideIfNoPermission(CAN_SET_STICKY)(ToggleStickyButton);
