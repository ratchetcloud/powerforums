import React, { Component } from 'react'
import UpdateReplyForm from './updateReplyForm';
import DeleteButton from "../../../../components/interactive-btns/DeleteButton";
import EditButton from "../../../../components/interactive-btns/EditButton";
import {Well} from "react-bootstrap";

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

        const creationDate = new Date(node.creationDate);
        const avatarImage = <img className="avatar" src="/assets/images/default/default_avatar_thumb.png" />;

        if (this.state.editing) {
            return (
                <Well>
                    <div className="replyBox">
                        <div>
                            <p>
                                <span>{avatarImage}</span>
                                <span><strong>{node.authorInformation.name}</strong></span>
                                <span>{creationDate.toLocaleString()}</span>
                            </p>
                            <div>
                                <UpdateReplyForm form={`UpdateReplyForm_${node._id}`}
                                                 initialValues={{ _id: node._id, content: node.content }}
                                                 onSubmit={onEditHandler}
                                                 onCancel={this.finishEditingHandler}/>
                            </div>
                        </div>
                    </div>
                </Well>
            )
        } else {
            return (
                <Well>
                    <div className="replyBox">
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
                                <EditButton onClick={this.startEditingHandler} />
                                <DeleteButton onClick={onDeleteHandler}/>
                            </div>
                        </div>
                    </div>
                </Well>
            )
        }
    }
}
