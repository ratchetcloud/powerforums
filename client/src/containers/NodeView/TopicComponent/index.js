import React from 'react';
import Navigation from "../../../components/Navigation";
import Pagination from "../../../components/Pagination";
import CreateReplyForm from './createReplyForm';
import ReplyItem from "../items/ReplyItem";
import TimeAgo from "react-timeago";
import {NavLink} from "react-router-dom";
import ToggleStickyButton from "../../../components/interactive-btns/ToggleStickyButton";
import DeleteButton from "../../../components/interactive-btns/DeleteButton";


const TopicComponent = (props) => {
    const {node, children, pagination, onPaginationChange, onChildEvent} = props;

    const avatarImage = <img className="avatar" src="/assets/images/default/default_avatar_thumb.png" />;
    const creationDate = new Date(node.creationDate);
    const onReportHandler = () => onChildEvent('REPORT', node._id);

    return (
        <div className="topic-view node-view">
            <div className="header container-fluid">
                <div className="container p-0">
                    <Navigation node={node} />
                </div>
            </div>
            <div className="topic-body container">
                <article>
                    <div className="header">
                        <span>Posted by {node.authorInformation.name}</span>
                        <TimeAgo date={node.creationDate} />
                    </div>
                    <h2>{node.title}</h2>
                    <p>
                        {node.content}
                    </p>
                    <div className="footer">
                        <span className="comment">
                            <i className="fas fa-comments" />&nbsp;
                            <span>{node.replyCount} Replies</span>
                        </span>
                    </div>
                </article>

                <ul className="replies list-unstyled">
                    {children.map(child => {
                        if (child.type === 'Reply')
                            return <ReplyItem key={child._id} node={child} onEvent={onChildEvent} />;
                    })}
                </ul>
                { children.length > 0 && <Pagination pagination={pagination} onChange={onPaginationChange}/> }

                <div>
                    <CreateReplyForm parentId={node._id} />
                </div>
            </div>
        </div>
    )
};
export default TopicComponent;