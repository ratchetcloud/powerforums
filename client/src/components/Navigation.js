import React, { Component } from 'react';
import styles from './Navigation.css';
import { NavLink } from 'react-router-dom'

/**
 *
 */
export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.onItemClickHandler = this.onItemClickHandler.bind(this);
    }

    onItemClickHandler(nodeid, position) {
        this.props.nodeListParentNodeChange(nodeid);
        this.props.history.push("/nodelist/" + nodeid, null)  
    }

    render() {
        const self = this;
        return (
            <ul className="navigationBar">
                {this.props.parentNodeAncestorList.map((content, index) => {
                    return (
                        <li key={content._id} onClick={() => self.onItemClickHandler(content._id, index)}>
                            <NavLink to={"/nodelist/"+content._id}>{content.title}</NavLink>
                        </li>
                    )
                })}
            </ul>
        );
    }
}