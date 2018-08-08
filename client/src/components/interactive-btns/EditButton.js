import React from "react";

const EditButton = (props) => {
    // TODO: Permission Control
    const {onClick} = props;
    return (
        <button type="button" className="btn btn-light btn-sm" onClick={onClick}>
            <i className="fas fa-edit" />
            <span>Edit</span>
        </button>
    )
};

export default EditButton;