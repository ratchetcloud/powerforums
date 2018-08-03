import React from "react";

const img_sticky ='/assets/images/sticky-128.png';

const ToggleStickyButton = (props) => {
    // TODO: Permission Control
    const {onClick} = props;
    return (
        <img src={img_sticky}
             style={{width: 16}}
             alt="Make this topic sticky/unsticky."
             onClick={onClick}/>
    )
};
export default ToggleStickyButton;
