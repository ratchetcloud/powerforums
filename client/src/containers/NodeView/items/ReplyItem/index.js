import React, { Component } from 'react'
import UpdateReplyForm from './updateReplyForm';
import TimeAgo from 'react-timeago';
import {DeleteReplyButton} from '../../../../components/interactive-btns/DeleteButton';
import EditButton from '../../../../components/interactive-btns/EditButton';
import ToggleStickyButton from '../../../../components/interactive-btns/ToggleStickyButton';


export default class ReplyItem extends Component {
    constructor(props) {
        super(props);
        this.state = {'editing': false};

        this.startEditingHandler = this.startEditingHandler.bind(this);
        this.finishEditingHandler = this.finishEditingHandler.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Init `editing` state if `node` is changed
        // (eg. reload is executed after editing finished)
        if (this.props.node !== prevProps.node)
            this.setState({'editing': false});
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
                        <EditButton node={node} onClick={this.startEditingHandler} />
                        <DeleteReplyButton node={node} onClick={onDeleteHandler}/>
                        <ToggleStickyButton node={node} sticky={node.sticky} onClick={onToggleStickyHandler} />
                    </div>
                </li>
            )
        }
    }
}
