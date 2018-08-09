import React, { Component } from 'react'
import UpdateReplyForm from './updateReplyForm';
import DeleteButton from "../../../../components/interactive-btns/DeleteButton";
import EditButton from "../../../../components/interactive-btns/EditButton";
import {Well} from "react-bootstrap";
import TimeAgo from "react-timeago";
import ToggleStickyButton from "../../../../components/interactive-btns/ToggleStickyButton";

const img_flag = '/assets/images/flag-128.png';
const img_trash = '/assets/images/trash-128.png';
const img_edit = '/assets/images/edit-128.png';


export default class ReplyItem extends Component {
    constructor(props) {
        super(props);
        this.state = {'editing': false};

        this.startEditingHandler = this.startEditingHandler.bind(this);
        this.finishEditingHandler = this.finishEditingHandler.bind(this);
    }

    startEditingHandler() {
        this.setState({'editing': true});
    }

    finishEditingHandler() {
        this.setState({'editing': false});
    }

    render() {
        const {node, onEvent} = this.props;

        const onDeleteHandler = () => onEvent('DELETE', node._id);
        const onEditHandler = (values) => onEvent('UPDATE', node._id, values);
        const onToggleStickyHandler = () => onEvent('TOGGLE_STICKY', node._id, !node.sticky);

        const header = (
            <div className="card-header">
                {node.sticky === true && <span className="sticky"><i className="fas fa-thumbtack" /></span>}
                <span>By {node.authorInformation.name}</span>
                <TimeAgo date={node.creationDate} />
            </div>
        );

        if (this.state.editing) {
            return (
                <li className="card reply-card">
                    {header}
                    <div className="card-body">
                        <UpdateReplyForm form={`UpdateReplyForm_${node._id}`}
                                         initialValues={{ _id: node._id, content: node.content }}
                                         onSubmit={onEditHandler}
                                         onCancel={this.finishEditingHandler}/>
                    </div>
                </li>
            )
        } else {
            return (
                <li className="card reply-card">
                    {header}
                    <div className="card-body">
                        <p className="card-text">{node.content}</p>
                    </div>
                    <div className="card-footer bg-transparent">
                        <EditButton onClick={this.startEditingHandler} />
                        <DeleteButton onClick={onDeleteHandler}/>
                        <ToggleStickyButton sticky={node.sticky} onClick={onToggleStickyHandler} />
                    </div>
                </li>
            )
        }
    }
}
