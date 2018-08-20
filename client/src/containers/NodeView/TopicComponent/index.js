import React from 'react';
import TimeAgo from 'react-timeago';
import sanitizeHtml from 'sanitize-html';
import Navigation from '../../../components/Navigation';
import Pagination from '../../../components/Pagination';
import CreateReplyForm from './createReplyForm';
import ReplyItem from '../items/ReplyItem';
import {DeleteTopicButton} from '../../../components/interactive-btns/DeleteButton';
import EditButton from '../../../components/interactive-btns/EditButton';


const TopicComponent = (props) => {
    const {node, children, pagination, onPaginationChange, onChildEvent} = props;

    const onDeleteHandler = () => onChildEvent('DELETE', node._id);
    const onNodeCreate = (values) => onChildEvent('CREATE', null, values);

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
                    <p dangerouslySetInnerHTML={{__html: sanitizeHtml(node.content)}} />
                    <div className="footer clearfix">
                        <div className="float-left">
                            <span className="comment">
                                <i className="fas fa-comments" />&nbsp;
                                <span>{node.replyCount} Replies</span>
                            </span>
                        </div>
                        <div className="float-right">
                            <EditButton node={node} to='./edit' />
                            <DeleteTopicButton node={node} onClick={onDeleteHandler}/>
                        </div>
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
                    <CreateReplyForm parentId={node._id}
                                     initialValues={{ parentId: node._id, type: 'Reply' }}
                                     node={node}
                                     onSubmit={onNodeCreate} />
                </div>
            </div>
        </div>
    )
};
export default TopicComponent;