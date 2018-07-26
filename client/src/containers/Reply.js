import React, { Component } from 'react'
import img_flag from '../public/images/flag-128.png'
import img_trash from '../public/images/trash-128.png'
import img_edit from '../public/images/edit-128.png'
import { connect } from "react-redux"
import { submit } from 'redux-form'
import DynamicModal from './DynamicModal'
import { show } from 'redux-modal'
import { bindActionCreators } from 'redux'
import CreateReportForm from '../forms/createReportForm'
import UpdateReplyForm from '../forms/updateReplyForm'
import { nodeFetchAuthorDetails } from "../actions/nodeActions"
import ToolTip from "react-portal-tooltip"

/**
 * Component for Reply rendering.
 * Should always be invoked as a "child" of a "Node" component.
 */
class Reply extends Component {
    constructor(props) {
        super(props)

        this.getUserInfos = this.getUserInfos.bind(this)
    }

    onClickReportModalOpen = name => () => {
        this.props.show(name, {
            title: 'Report a content',
            content: <div><CreateReportForm form={`CreateReportForm_${this.props.content._id}`} externalSubmit={true} /></div>,
            hideButtonLabel: "Close",
            primaryButtonLabel: "Report",
            externalHandleClose: () => {
                // We use a custom function for handling the modal closure. We use a redux mapped function.
                console.log("this.props.externalHandleClose", "external submit");
                this.props.externalHandleClose(this.props.content._id)
            }
        })
    }

    getUserInfos = event => {
        event.stopPropagation()
        this.props.getUserInfos(this.props.content.authorInformation._id)
    }

    render() {
        // Turn timestamps to Date objects.
        var creationDate = new Date(this.props.content.creationDate)

        var avatarImage = ''
        if (this.props.content.content.hasOwnProperty('avatar')) {
            avatarImage = <img className="avatar"
                               src={this.props.forumCoreUrl + '/' + this.props.content.content.avatar.avatarpath}
                               alt="" />
        } else {
            avatarImage = <img className="avatar"
                               src={this.props.forumCoreUrl + "/images/default/default_avatar_thumb.png"}
                               alt="" />
        }

        if (this.props.hasOwnProperty('editing') && this.props.editing === true) {
            return (
                <div key={this.props.index} className="replyBox">
                    <div>
                        <p>
                            <span>{avatarImage}</span>
                            <span><strong>{this.props.content.authorInformation.name}</strong></span>
                            <span>{creationDate.toLocaleString()}</span>
                        </p>
                        <div><UpdateReplyForm form={`UpdateReplyForm_${this.props.content._id}`} initialValues={{ _id: this.props.content._id, content: this.props.content.content }} commentLabel={''} /></div>
                    </div>
                </div>
            )
        } else {
            return (
                <div key={this.props.index} className="replyBox">
                    <div>
                        <p>
                            <span>{avatarImage}</span>
                            <span onMouseOver={this.getUserInfos} onClick={this.getUserInfos}><strong>{this.props.content.authorInformation.name}</strong></span>
                            <span>{creationDate.toLocaleString()}</span>
                        </p>
                        <p>{this.props.content.content}</p>
                    </div>
                    <div className="right">
                        <div>
                            <img src={img_flag}
                                 style={{width: 16}}
                                 alt="Report reply"
                                 onClick={this.onClickReportModalOpen(`reportModal_${this.props.content._id}`)} />

                            <DynamicModal name={"reportModal_" + this.props.content._id} />
                        </div>
                        <div>
                            <img src={img_edit}
                                 style={{width: 16}}
                                 alt="Edit reply"
                                 onClick={this.props.onEdit} />

                            <img src={img_trash}
                                 style={{width: 16}}
                                 alt="Delete reply"
                                 onClick={this.props.onDelete} />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    getUserInfos: authorId => {
        dispatch(nodeFetchAuthorDetails(authorId))
    },
    ...bindActionCreators({ show }, dispatch),
    ...{ externalHandleClose: nodeid => dispatch(submit(`CreateReportForm_${nodeid}`)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Reply)

