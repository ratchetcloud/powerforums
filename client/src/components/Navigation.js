import React from 'react';
import { NavLink } from 'react-router-dom';
import {nodeUrl} from '../utils/urls';

const Navigation = (props) => {
    const {node} = props;

    let ancestorList;
    if (node.hasOwnProperty('ancestorList')) {
        // If parent node does have an ancestor list.
        // Add itself to the ancestor list.
        // var parentNodeAncestorList = this.props.parentNode.ancestorList does copy by REFERENCE (original object updated after push).
        ancestorList = JSON.parse(JSON.stringify(node.ancestorList));
        ancestorList.push({_id: node._id, title: node.title});

    }else {
        // If parent node does not have an ancestor list.
        // Parent node must be the root node. Add itself to the ancestor list.
        ancestorList = [{_id: node._id, title: node.title}];
    }

    return (
        <ul className="nav">
            {ancestorList.map((node) => {
                return (
                    <li key={node._id} className="nav-item">
                        <NavLink to={nodeUrl(node._id)}>{node.title}</NavLink>
                    </li>
                )
            })}
        </ul>
    );
};
export default Navigation;