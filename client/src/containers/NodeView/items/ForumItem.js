import React from 'react';
import {NavLink} from 'react-router-dom';
import {nodeUrl} from '../../../utils/urls';
import DeleteButton from "../../../components/interactive-btns/DeleteButton";

const img_forum = '/assets/images/forum-128.png';

const ForumItem = (props) => {
    const {node, onEvent} = props;

    const onDeleteHandler = () => onEvent('DELETE', node._id);

    return (
        <li className="col-md-6">
            <div className="forum-card card">
                <NavLink to={nodeUrl(node._id)}>
                    <div className="card-body">
                        <h5 className="card-title">{node.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{node.description}</h6>
                    </div>
                </NavLink>
            </div>
        </li>
    )
};

export default ForumItem;