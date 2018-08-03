import React from 'react';
import {NavLink} from 'react-router-dom';
import {Well} from "react-bootstrap";
import DeleteButton from "../../../components/interactive-btns/DeleteButton";

const img_forum = '/assets/images/forum-128.png';

const ForumItem = (props) => {
    const {node, onEvent} = props;
    const lastUpdatedDate = new Date(node.lastUpdatedDate);

    const onDeleteHandler = () => onEvent('DELETE', node._id);

    return (
        <Well>
            <div className="channelBox">
                <div className="nodeImage">
                    <img src={img_forum} style={{width: 32}} alt="Channel" />
                </div>
                <div>
                    <p>
                        <NavLink to={"/n/" + node._id}>
                            <strong>{node.title}</strong>
                        </NavLink>
                    </p>
                    <p>{node.description}</p>
                </div>
                <div className="right">
                    <p>Last reply the {lastUpdatedDate.toLocaleString()}</p>

                    <p>{node.replycount ? node.replycount + ' replies' : null}</p>
                    <div>
                        <DeleteButton onClick={onDeleteHandler}/>
                    </div>
                </div>
            </div>
        </Well>
    )
};

export default ForumItem;