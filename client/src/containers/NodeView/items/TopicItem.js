import React from 'react';
import {NavLink} from 'react-router-dom';
import TimeAgo from 'react-timeago'
import DeleteButton from '../../../components/interactive-btns/DeleteButton';
import ToggleStickyButton from '../../../components/interactive-btns/ToggleStickyButton';

const img_conversation = '/assets/images/conversation-128.png';
const img_sticky ='/assets/images/sticky-128.png';

const TopicItem = (props) => {
    const {node, onEvent} = props;

    const onDeleteHandler = () => onEvent('DELETE', node._id);
    const onToggleStickyHandler = () => onEvent('TOGGLE_STICKY', node._id);

    return (
        <li className="topic-card card">
            <div className="card-header">
                <span>Posted by {node.authorInformation.name}</span>
                <TimeAgo date={node.creationDate} />
            </div>
            <NavLink to={"/n/" + node._id}>
                <div className="card-body">
                    <h5 className="card-title">{node.title}</h5>
                    {/*<h6 className="card-subtitle mb-2 text-muted">{node.description}</h6>*/}
                    <p className="card-text">{node.content}</p>
                </div>
            </NavLink>
            <div className="card-footer bg-transparent clearfix">
                <div className="float-left">
                    <span className="comment">
                        <i className="fas fa-comments" />
                        <span>{node.replyCount} Replies</span>
                    </span>
                </div>
                <div className="float-right">
                    <ToggleStickyButton onClick={onToggleStickyHandler} />
                    <DeleteButton onClick={onDeleteHandler}/>
                </div>
            </div>
        </li>
    )
};

export default TopicItem;