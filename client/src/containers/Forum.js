import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom'

const img_forum = '/assets/images/forum-128.png';
const img_trash = '/assets/images/trash-128.png';

/**
 * Component for Forum rendering.
 * Should always be invoked as a "child" of a "Node" component.
 */
class Forum extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Turn dates to objects.
        var lastupdateDate = new Date(this.props.content.lastupdateDate);

        if (0) {
            // If user doesn't have delete permissions.
            var deleteHTML = '';
        } else {
            // If user does have delete permission.
            var deleteHTML = <p><img src={img_trash} style={{width: 16}} alt="Delete this topic." onClick={this.props.onDelete} /></p>;
        }
        // Formatting.
        return (
            <div key={this.props.index} onClick={this.props.onClick} className='channelBox'>
                <div className="nodeImage">
                    <img src={img_forum} style={{width: 32}} alt="Channel" />
                </div>
                <div>
                    <p>
                        <NavLink to={"/nodelist/" + this.props.content._id}>
                            <strong>{this.props.content.title}</strong>
                        </NavLink>
                    </p>
                    <p>{this.props.content.description}</p>
                </div>
                <div className="right">
                    <p>Last reply the {lastupdateDate.toLocaleString()}</p>
                    <p>{(this.props.content.hasOwnProperty('replycount')) ? this.props.content.replycount + ' replies' : null}</p>
                    <div>
                        <span>{deleteHTML}</span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Forum)