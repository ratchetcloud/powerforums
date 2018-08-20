import React from 'react';
import Navigation from "../../../components/Navigation";
import Pagination from "../../../components/Pagination";
import CreateForumForm from "./createForumForm";
import ForumItem from "../items/ForumItem";
import TopicItem from "../items/TopicItem";
import {NavLink} from "react-router-dom";
import {blurIfNotLogged} from "../../../utils/permissionChecker";
import {nodeUrl} from "../../../utils/urls";

const PostNewTopicButton = blurIfNotLogged()((props) => {
    return (
        <div className="open-btn">
            <NavLink to={nodeUrl(props.node._id, 'post')}>
                Post new topic in {props.node.title}
            </NavLink>
        </div>
    );
});

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
                <PostNewTopicButton node={node} />

                <CreateForumForm parentId={node._id}
                                 initialValues={{ parentId: node._id, type: 'Forum' }}
                                 node={node}
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