import React from 'react';
import NodeEditorForm from './form';
import './editor.css';

const NodeEditorComponent = (props) => {
    const {node, mode, onSubmit} = props;
    const tree = node.ancestorList.concat([{_id: node._id, title: node.title}]);

    // If editing mode, set `_id`, `title` and `content` of original node to initialValues,
    // else, means submitting new node, only set `parentId` that new node belongs to.
    const initialValues = (mode === 'edit') ?
        { type: 'Topic', _id: node._id, title: node.title, content: node.content } :
        { type: 'Topic', parentId: node._id };

    return (
        <div className="editor container mt-5">
            <h2 className="mb-1">
                {(mode === 'edit') ? 'Edit topic' : 'Post new topic'}
            </h2>
            <div className="editor-body">
                <NodeEditorForm tree={tree.map((node) => node.title).join('/')}
                                initialValues={initialValues}
                                onSubmit={onSubmit}/>
            </div>
        </div>
    );
};
export default NodeEditorComponent;