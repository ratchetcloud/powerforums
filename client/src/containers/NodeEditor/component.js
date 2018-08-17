import React from 'react';
import NodeEditorForm from './form';
import './editor.css';

const NodeEditorComponent = (props) => {
    const {node, onSubmit} = props;
    const tree = node.ancestorList.concat([{_id: node._id, title: node.title}]);

    return (
        <div className="editor container mt-5">
            <div>
                <h2 className="mb-1">Post new topic</h2>
            </div>
            <div className="editor-body">
                <NodeEditorForm tree={tree.map((node) => node.title).join('/')}
                                initialValues={{ parentId: node._id, type: 'Topic' }}
                                onSubmit={onSubmit}/>
            </div>
        </div>
    );
};
export default NodeEditorComponent;