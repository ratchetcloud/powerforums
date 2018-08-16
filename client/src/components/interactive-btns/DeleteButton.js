import React from 'react';
import {hideIfNoPermission, CAN_DELETE_TOPIC, CAN_DELETE_REPLY, CAN_IF_OWNER} from '../../utils/permissionChecker';

const DeleteButton = (props) => {
    const {onClick} = props;
    return (
        <button type="button" className="btn btn-light btn-sm" onClick={onClick}>
            <i className="fas fa-trash-alt" />
            <span>Delete</span>
        </button>
    )
};

export const DeleteTopicButton = hideIfNoPermission(CAN_IF_OWNER, CAN_DELETE_TOPIC)(DeleteButton);
export const DeleteReplyButton = hideIfNoPermission(CAN_IF_OWNER, CAN_DELETE_REPLY)(DeleteButton);

