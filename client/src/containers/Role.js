import React, { Component } from 'react';
import { connect } from "react-redux";
import { roleDelete } from "../actions/roleActions";
import img_trash from '../public/images/trash-128.png';

class Role extends Component {
    constructor(props) {
        super(props);

        this.onDeleteClickHandler = this.onDeleteClickHandler.bind(this);
    }

    onDeleteClickHandler(event) {
        this.props.roleDelete(this.props.content._id);
    }

    render() {
        return <div>
            <span>{this.props.content.name}</span> : <span>{this.props.content.permissions.join(', ')}</span>
            <span> - </span>
            <span><img src={img_trash} style={{width: 16}} alt="Delete this role." onClick={this.onDeleteClickHandler} /></span>
        </div>;
    }
}

const mapStateToProps = state => ({
    roleDeleting: state.role.roleDeleting,
    roleDeleted: state.role.roleDeleted
});

const mapDispatchToProps = dispatch => ({
    roleDelete: roleId => {
        dispatch(roleDelete(roleId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Role);