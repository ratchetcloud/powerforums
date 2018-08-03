import React from "react";

const img_trash = '/assets/images/trash-128.png';

const DeleteButton = (props) => {
    // TODO: Permission Control
    const {onClick} = props;
    return (
        <img src={img_trash} style={{width: 16}} alt="Delete" onClick={onClick} />
    )
};

export default DeleteButton;