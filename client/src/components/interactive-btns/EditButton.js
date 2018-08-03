import React from "react";

const img_edit = '/assets/images/edit-128.png';

const EditButton = (props) => {
    // TODO: Permission Control
    const {onClick} = props;
    return (
        <img src={img_edit} style={{width: 16}} alt="Edit" onClick={onClick} />
    )
};

export default EditButton;