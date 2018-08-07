import React from "react";

const DeleteButton = (props) => {
    // TODO: Permission Control
    const {onClick} = props;
    return (
        <button type="button" className="btn btn-light btn-sm" onClick={onClick}>
            <i className="fas fa-trash-alt"></i>
            <span>Delete</span>
        </button>
    )
};

export default DeleteButton;