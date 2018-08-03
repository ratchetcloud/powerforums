import React from 'react';
import Navigation from "../../components/Navigation";
import Pagination from "../../components/Pagination";
import CreateReplyForm from './forms/createReplyForm';
import {Well} from "react-bootstrap";
import ReplyItem from "./list-items/ReplyItem";


const img_flag = '/assets/images/flag-128.png';

const TopicComponent = (props) => {
    const {node, children, pagination, onPaginationChange, onChildEvent} = props;

    const avatarImage = <img className="avatar" src="/assets/images/default/default_avatar_thumb.png" />;
    const creationDate = new Date(node.creationDate);
    const onReportHandler = () => onChildEvent('REPORT', node._id);

    return (
        <div className="container">
            <Navigation node={node} />
            <h2>Topic - "{node.title}"</h2>

            {/* Current Topic's Content */}
            <Well>
                <div className="topicBox">
                    <div>
                        <p>
                            <span>{avatarImage}</span>
                            <span><strong>{node.authorInformation.name}</strong></span>
                            <span>{creationDate.toLocaleString()}</span>
                        </p>
                        <p>{node.content}</p>
                    </div>
                    <div className="right">
                        <div>
                            <img src={img_flag}
                                 style={{width: 16}} alt="Report topic"
                                 onClick={onReportHandler} />
                        </div>
                    </div>
                </div>
            </Well>

            {/* Show children (Replies of this Topic) */}
            <Pagination pagination={pagination} onChange={onPaginationChange} />
            <ul className="list-group">
                {children.map(child => {
                    if (child.type === 'Reply')
                        return <ReplyItem key={child._id} node={child} onEvent={onChildEvent} />;
                })}
            </ul>
            <div>
                <CreateReplyForm parentId={node._id} />
            </div>
        </div>
    )
};
export default TopicComponent;