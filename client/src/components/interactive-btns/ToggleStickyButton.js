import React from "react";

const ToggleStickyButton = (props) => {
    // TODO: Permission Control
    const {onClick} = props;
    return (
        <button type="button" className="btn btn-light btn-sm" onClick={onClick}>
            <i className="fas fa-thumbtack" />
            <span>Set Sticky</span>
        </button>
    )
};
export default ToggleStickyButton;
