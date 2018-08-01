import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom'

const img_conversation = '/assets/images/conversation-128.png';
const img_trash = '/assets/images/trash-128.png';
const img_sticky ='/assets/images/sticky-128.png';
const img_flag = '/assets/images/flag-128.png';

/**
 * Component for Topic rendering.
 * Should always be invoked as a "child" of a "Node" component.
 */
class Topic extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Turn timestamps to Date objects.
        const lastUpdatedDate = new Date(this.props.content.lastUpdatedDate);
        const creationDate = new Date(this.props.content.creationDate);

        if (0) {
            // If user doesn't have delete permissions.
            var deleteHTML = '';
        } else {
            // If user does have delete permission.
            var deleteHTML = <p><img src={img_trash} style={{width: 16}} alt="Delete this topic." onClick={this.props.onDelete} /></p>;
        }

        if (this.props.content.sticky === true) {
            var stickyHTML = <img src={img_sticky} style={{width: 24}} alt="Topic is sticky" />;
        } else {
            var stickyHTML = '';
        }

        if (this.props.hasOwnProperty('display') && this.props.display === "conversation") {
            // If topic should be displayed as a "conversation".
            // conversation = topic children views : topic should be displayed as the "first" reply...
            var avatarImage = '';
            if (this.props.content.content.hasOwnProperty('avatar')) {
                avatarImage = <img className="avatar"
                                   src={this.props.forumCoreUrl + '/' + this.props.content.content.avatar.avatarpath}
                                   alt="" />
            } else {
                avatarImage = <img className="avatar"
                                   src={this.props.forumCoreUrl + "/images/default/default_avatar_thumb.png"}
                                   alt="" />
            }

            return (
                <div key={this.props.index} className="topicBox">
                    <div>
                        <p>
                            <span>{avatarImage}</span>
                            <span><strong>{this.props.content.authorInformation.name}</strong></span>
                            <span>{creationDate.toLocaleString()}</span>
                        </p>
                        <p>{this.props.content.content}</p>
                    </div>
                    <div className="right">
                        <div>
                            <img src={img_flag}
                                 style={{width: 16}} alt="Report topic"
                                 onClick={this.props.onReport} />
                        </div>
                    </div>
                </div>
            )
        } else {
            // If topic should be displayed as a... topic?
            // topic view = don't display children...
            return (
                <div key={this.props.index} onClick={this.props.onClick} data-for={this.props.content._id}
                     data-tip={this.props.content.content} className='topicBox'>
                    <div className="topicImage">
                        <img src={img_conversation} style={{width: 32}} alt="Topic" /><br />
                        {stickyHTML}
                    </div>
                    <div>
                        <p>
                            <NavLink to={"/nodelist/" + this.props.content._id}>
                                <strong>{this.props.content.title}</strong>
                            </NavLink>
                        </p>
                        <p>{this.props.content.description}</p>
                        <p>Created by <a href={this.props.content.authorInformation._id}>{this.props.content.authorInformation.name}</a>, the {creationDate.toLocaleString()}</p>
                    </div>
                    <div className="right">
                        <p>Last reply the {lastUpdatedDate.toLocaleString()}</p>
                        <p>{this.props.content.replycount} replies</p>
                        <div>
                            <span>
                                <img src={img_sticky}
                                       style={{width: 16}}
                                       alt="Make this topic sticky/unsticky."
                                       onClick={this.props.onStick}/>
                            </span>
                            <span>{deleteHTML}</span>
                        </div>
                    </div>
                    <ReactTooltip id={this.props.content._id} />
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Topic)