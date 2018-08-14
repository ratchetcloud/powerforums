import React from 'react';
import { connect } from 'react-redux'

export const CAN_CREATE_FORUM = 'canCreateForum';
export const CAN_DELETE_FORUN = 'canDeleteForum';
export const CAN_DELETE_REPLY = 'canDeleteReply';
export const CAN_DELETE_TOPIC = 'canDeleteTopic';
export const CAN_SET_STICKY = 'canSetSticky';
export const CAN_IF_OWNER = '__canIfOwner__';

/**
 * Check whether passed via permission requirements.
 * @param requiredPermissions: List of required permission (Notice: permission is applied 'or' condition.
 *                              If there is any permission matched, passed.)
 * @param userPermissions: List of permissions that user has.
 * @param currentUser: Current user for checking owner.
 * @param node: Target node for checking owner.
 * @returns True if passed, false otherwise.`
 */
const pass = (requiredPermissions, userPermissions, currentUser, node) => {
    let ownerFilter = (requiredPermissions.indexOf(CAN_IF_OWNER) !== -1 &&
                        currentUser && node.authorInformation._id === currentUser._id);

    let specialPerm = requiredPermissions.filter(value => -1 !== userPermissions.indexOf(value)).length > 0;

    return ownerFilter || specialPerm;
};


const blurOverwrapStyles = {
    position: "absolute",
    zIndex: 2,
    top: "40%",
    width: "100%",
    textAlign: "center",
};
const blurMaskStyles = {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.1)",
    width: "100%",
    height: "100%",
    zIndex: 1,
};


/**
 * If not logged-in, blur component.
 */
export function blurIfNotLogged() {
    const mapStateToProps = state => ({
        currentUser: state.login.currentUser,
    });

    return function(WrappedComponent) {
        const component = (props) => {
            if (props.currentUser)
                return <WrappedComponent {...props} />;
            else
                return (
                    <div className="position-relative">
                        <span style={blurOverwrapStyles}>Login is required</span>
                        <div style={blurMaskStyles}></div>
                        <div style={{filter: "blur(3px)"}}>
                            <WrappedComponent {...props} />;
                        </div>
                    </div>
                );
        };
        return connect(mapStateToProps)(component);
    };
}

/**
 * If there is no correct permission, show blurred component with requiring-login message
 * @param allowedPermissions: List of permissions. If there is any matched permission
 *                            of user's and allowed, blur component.
 */
export function blurIfNoPermission(...allowedPermissions) {
    const mapStateToProps = state => ({
        currentUser: state.login.currentUser,
        permissions: state.nodeView.permissions,
    });

    return function(WrappedComponent) {
        const component = (props) => {
            if (pass(allowedPermissions, props.permissions, props.currentUser, props.node))
                return <WrappedComponent {...props} />;
            else
                return (
                    <div className="position-relative">
                        <span style={blurOverwrapStyles}>You do not have correct permission</span>
                        <div style={blurMaskStyles}></div>
                        <div style={{filter: "blur(3px)"}}>
                            <WrappedComponent {...props} />;
                        </div>
                    </div>
                );
        };
        return connect(mapStateToProps)(component);
    };
}


/**
 * If there is no correct permission, show blurred component with requiring-login message
 * @param allowedPermissions: List of permissions. If there is any matched permission
 *                            of user's and allowed, hide component.
 */
export function hideIfNoPermission(...allowedPermissions) {
    const mapStateToProps = state => ({
        currentUser: state.login.currentUser,
        permissions: state.nodeView.permissions,
    });

    return function(WrappedComponent) {
        const component = (props) => {
            return pass(allowedPermissions, props.permissions, props.currentUser, props.node) ?
                <WrappedComponent {...props} /> : '';
        };
        return connect(mapStateToProps)(component);
    };
}