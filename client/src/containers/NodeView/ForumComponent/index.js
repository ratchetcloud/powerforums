import React from 'react';
import Navigation from "../../../components/Navigation";
import Pagination from "../../../components/Pagination";
import CreateTopicForm from "./createTopicForm";
import CreateForumForm from "./createForumForm";
import ForumItem from "../items/ForumItem";
import TopicItem from "../items/TopicItem";

const ForumComponent = (props) => {
    const {node, children, pagination, onPaginationChange, onChildEvent} = props;
    const onNodeCreate = (values) => onChildEvent('CREATE', null, values);

    return (
        <div className="forum-view node-view">
            <div className="header container-fluid">
                <div className="container p-0">
                    <Navigation node={node} />
                    <div>{node.description}</div>
                </div>
            </div>
            <div className="forum-body container">
                <h3>Forums</h3>
                <ul className="row forums list-unstyled">
                    {children.map(child => {
                        if (child.type === 'Forum')
                            return <ForumItem key={child._id} node={child} onEvent={onChildEvent} />;
                    })}
                </ul>

                <h3>Topics</h3>
                <CreateTopicForm parentId={node._id}
                                 initialValues={{ parentId: node._id, type: 'Topic' }}
                                 onSubmit={onNodeCreate} />

                <CreateForumForm parentId={node._id}
                                 initialValues={{ parentId: node._id, type: 'Forum' }}
                                 onSubmit={onNodeCreate} />

                <ul className="topics list-unstyled mt-3">
                    {children.map(child => {
                        if (child.type === 'Topic')
                            return <TopicItem key={child._id} node={child} onEvent={onChildEvent} />;
                    })}
                </ul>

                <Pagination pagination={pagination} onChange={onPaginationChange} />
            </div>
        </div>
    )
};
export default ForumComponent;