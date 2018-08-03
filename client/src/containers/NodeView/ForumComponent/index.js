import React from 'react';
import Navigation from "../../../components/Navigation";
import Pagination from "../../../components/Pagination";
import CreateTopicForm from "./createTopicForm";
import CreateForumForm from "./createForumForm";
import ForumItem from "../items/ForumItem";
import TopicItem from "../items/TopicItem";

const ForumComponent = (props) => {
    const {node, children, pagination, onPaginationChange, onChildEvent} = props;
    return (
        <div className="container">
            <Navigation node={node} />
            <Pagination pagination={pagination} onChange={onPaginationChange} />

            {/* Show children (Sub-forums or Topics of this Forum) */}
            <ul className="list-group">
                {children.map(child => {
                    if (child.type === 'Forum')
                        return <ForumItem key={child._id} node={child} onEvent={onChildEvent} />;
                    else if (child.type === 'Topic')
                        return <TopicItem key={child._id} node={child} onEvent={onChildEvent} />;
                })}
            </ul>
            <div>
                <CreateTopicForm parentId={node._id} />
                <CreateForumForm parentId={node._id} />
            </div>
        </div>
    )
};
export default ForumComponent;