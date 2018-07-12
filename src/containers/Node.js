import React, { Component } from 'react'
import { Well } from 'react-bootstrap'
import Forum from './Forum'
import Topic from './Topic'
import Reply from './Reply'
import { nodeDelete, nodeReport, nodeStick, nodeEditAllow } from "../actions/nodeActions"
import { connect } from "react-redux"

class Node extends Component {
    constructor(props) {
        super(props)
        this.onNodeClickHandler = this.onNodeClickHandler.bind(this)
        this.onDeleteClickHandler = this.onDeleteClickHandler.bind(this)
        this.onEditClickHandler = this.onEditClickHandler.bind(this)
        this.onReportClickHandler = this.onReportClickHandler.bind(this)
        this.onStickClickHandler = this.onStickClickHandler.bind(this)
    }

    onNodeClickHandler(event) {
        event.stopPropagation()
        this.props.nodeListChangeParentNode(this.props.content._id)
        this.props.history.push("/nodelist/" + this.props.content._id, null)  
    }

    onEditClickHandler(event) {
        event.stopPropagation()
        this.props.nodeEdit(this.props.content._id)
    }

    onDeleteClickHandler(event) {
        event.stopPropagation()
        this.props.nodeDelete(this.props.content._id)
    }

    onReportClickHandler(event) {
        event.stopPropagation()
        this.props.nodeReport(this.props.content._id)
    }

    onStickClickHandler(event) {
        event.stopPropagation()

        if (this.props.content.hasOwnProperty('sticky') && this.props.content.sticky === true) {
            // If node is currently sticky, set sticky to false.
            this.props.nodeStick(this.props.content._id, false)
        } else if (this.props.content.hasOwnProperty('sticky') && this.props.content.sticky === false) {
            // If node is currently not sticky, set sticky to true.
            this.props.nodeStick(this.props.content._id, true)
        } else {
            // We don't want to create the properties when it does not exists...
            // Some node types can't be set sticky / unsticky. Relevant node will always have the attribute set.
        }
    }

    render() {
        if (this.props.content.type === "Forum") {
            // If Node is a Forum.
            return (
                <Well>
                    <div style={{display: 'none'}}>{this.props.content._id}</div>
                    <Forum key={this.props.content._id}
                           content={this.props.content}
                           onClick={this.onNodeClickHandler}
                           onDelete={this.onDeleteClickHandler} />
                </Well>
            )
        } else if (this.props.content.type === "Topic") {
            // If Node is a Topic, and should not be displayed as conversation.
            return (
                <Well>
                    <div style={{display: 'none'}}>{this.props.content._id}</div>
                    <Topic key={this.props.content._id}
                           content={this.props.content}
                           display={this.props.display}
                           onClick={this.onNodeClickHandler}
                           onDelete={this.onDeleteClickHandler}
                           onStick={this.onStickClickHandler} />
                </Well>
            )
        } else if (this.props.content.type === "Reply") {
            // If Node is a Reply.
            return (
                <Well>
                    <div style={{display: 'none'}}>{this.props.content._id}</div>
                    <Reply key={this.props.content._id}
                           content={this.props.content}
                           onDelete={this.onDeleteClickHandler}
                           onReport={this.onReportClickHandler}
                           onEdit={this.onEditClickHandler}
                           editing={(this.props.nodeEditAllowed === this.props.content._id) ? true : false}
                           isReportModalOpen={false} />
                </Well>
            )
        }
    }
}

const mapStateToProps = state => ({
    nodeEditAllowed: state.node.nodeEditAllowed,
    nodeEditing: state.node.nodeEditing,
    nodeEdited: state.node.nodeEdited,
    nodeDeleting: state.node.nodeDeleting,
    nodeDeleted: state.node.nodeDeleted,
    nodeReporting: state.node.nodeReporting,
    nodeReported: state.node.nodeReported,
    nodeSticking: state.node.nodeSticking,
    nodeStuck: state.node.nodeStuck
})

const mapDispatchToProps = dispatch => ({
    nodeEdit: nodeId => {
        dispatch(nodeEditAllow(nodeId));
    },
    nodeDelete: nodeId => {
        dispatch(nodeDelete(nodeId));
    },
    nodeReport: nodeId => {
        dispatch(nodeReport(nodeId));
    },
    nodeStick: (nodeId, sticky) => {
        dispatch(nodeStick(nodeId, sticky));
    }
})

export default connect(mapStateToProps, mapDispatchToProps) (Node)