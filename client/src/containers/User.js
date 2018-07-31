import React, { Component } from 'react';
import { connect } from "react-redux";
import { userDelete } from "../actions/userActions";

const img_trash = '/assets/images/trash-128.png';

class User extends Component {
    constructor(props) {
        super(props);

        this.onDeleteClickHandler = this.onDeleteClickHandler.bind(this);
    }

    onDeleteClickHandler(event) {
        this.props.userDelete(this.props.content._id);
    }

    render() {
        return (
            <div>
                <span>{this.props.content._id}</span><span> - </span>
                <span>{this.props.content.name}</span><span> - </span>
                <span>{this.props.content.email}</span><span> - </span>
                <span>{this.props.content.accountId}</span><span> - </span>
                <span><img src={img_trash} style={{width: 16}} alt="Delete this user." onClick={this.onDeleteClickHandler} /></span>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userDeleting: state.user.userDeleting,
    userDeleted: state.user.userDeleted
});

const mapDispatchToProps = dispatch => ({
    userDelete: userId => {
        dispatch(userDelete(userId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(User);