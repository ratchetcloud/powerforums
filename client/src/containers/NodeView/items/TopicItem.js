import React from 'react';
import {NavLink} from 'react-router-dom';
import {Well} from "react-bootstrap";
import DeleteButton from "../../../components/interactive-btns/DeleteButton";
import ToggleStickyButton from "../../../components/interactive-btns/ToggleStickyButton";

const img_conversation = '/assets/images/conversation-128.png';
const img_sticky ='/assets/images/sticky-128.png';

const TopicItem = (props) => {
    const {node, onEvent} = props;
    const creationDate = new Date(node.creationDate);
    const lastUpdatedDate = new Date(node.lastUpdatedDate);

    const onDeleteHandler = () => onEvent('DELETE', node._id);
    const onToggleStickyHandler = () => onEvent('TOGGLE_STICKY', node._id);

    const stickyHTML = node.sticky ?
        <img src={img_sticky} style={{width: 24}} alt="Topic is sticky" /> : '';

    return (
        <Well>
            <div className="topicBox">
                <div className="topicImage">
                    <img src={img_conversation} style={{width: 32}} alt="Topic" /><br />
                    {stickyHTML}
                </div>
                <div>
                    <p>
                        <NavLink to={"/n/" + node._id}>
                            <strong>{node.title}</strong>
                        </NavLink>
                    </p>
                    <p>{node.description}</p>
                    <p>Created by {node.authorInformation.name}, the {creationDate.toLocaleString()}</p>
                </div>
                <div className="right">
                    <p>Last reply the {lastUpdatedDate.toLocaleString()}</p>
                    <p>{node.replycount} replies</p>
                    <div>
                        <ToggleStickyButton onClick={onToggleStickyHandler} />
                        <DeleteButton onClick={onDeleteHandler}/>
                    </div>
                </div>
            </div>
        </Well>
    )
};

export default TopicItem;