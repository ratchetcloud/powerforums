import React from 'react';
import {NavLink} from 'react-router-dom';
import TimeAgo from 'react-timeago';
import sanitizeHtml from 'sanitize-html';
import {DeleteTopicButton} from '../../../components/interactive-btns/DeleteButton';
import ToggleStickyButton from '../../../components/interactive-btns/ToggleStickyButton';
import {nodeUrl} from '../../../utils/urls';

const TopicItem = (props) => {
    const {node, onEvent} = props;

    const onDeleteHandler = () => onEvent('DELETE', node._id);
    const onToggleStickyHandler = () => onEvent('TOGGLE_STICKY', node._id, !node.sticky);

    return (
        <li className="topic-card card">
            <div className="card-header">
                {node.sticky === true && <span className="sticky"><i className="fas fa-thumbtack" /></span>}
                <span>Posted by {node.authorInformation.name}</span>
                <TimeAgo date={node.creationDate} />
            </div>
            <NavLink to={nodeUrl(node._id)}>
                <div className="card-body">
                    <h5 className="card-title">{node.title}</h5>
                    <p className="card-text"
                       dangerouslySetInnerHTML={{__html: sanitizeHtml(node.content)}} />
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
                    <ToggleStickyButton node={node} sticky={node.sticky} onClick={onToggleStickyHandler} />
                    <DeleteTopicButton node={node} onClick={onDeleteHandler}/>
                </div>
            </div>
        </li>
    )
};

export default TopicItem;