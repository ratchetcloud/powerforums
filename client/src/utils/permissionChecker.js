import React from 'react';
import { connect } from 'react-redux'

export const CAN_CREATE_FORUM = 'canCreateForum';
export const CAN_DELETE_FORUM = 'canDeleteForum';
export const CAN_DELETE_REPLY = 'canDeleteReply';
export const CAN_DELETE_TOPIC = 'canDeleteTopic';
export const CAN_SET_STICKY = 'canSetSticky';
export const CAN_IF_OWNER = '__canIfOwner__';

/**
 * Check whether passed via permission requirements.
 * @param requiredPermissions: List of required permission. If there is any permission matched, passes.
 *                              (Notice: permission is applied with 'or' condition, not 'and')
 * @param currentUser: Current user for checking owner and permissions.
 * @param node: Target node for checking owner and permissions.
 * @return boolean. True if passed, false otherwise.
 */
const pass = (requiredPermissions, currentUser, node) => {
    if (!currentUser)
        return false;

    // If requiredPermissions has `CAN_IF_OWNER`, then check whether current user is node's author.
    if (requiredPermissions.indexOf(CAN_IF_OWNER) !== -1 &&
            currentUser && node.authorInformation._id === currentUser._id)
        return true;

    // Then check for current user has special permission in this scope.
    if (currentUser.permissions) {
        let ancestorIds = node.ancestorList.map(ancestor => ancestor._id);

        // Each permissionObject has '_nodeId' and 'permissionRules',
        // where _nodeId means scope of permission could applied,
        // and permissionRules means list of permissions.
        for (let permissionObject of currentUser.permissions) {
            // If there is no ancestor node matched, continue this scope,
            // Else, check whether user has corresponding permission.
            if (ancestorIds.indexOf(permissionObject._nodeId) === -1)
                continue;

            for (let permission of permissionObject.permissionRules)
                if (requiredPermissions.indexOf(permission) !== -1)
                    return true;
        }
    }

    return false;
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
        currentUser: state.auth.currentUser,
    });

    return function(WrappedComponent) {
        const component = (props) => {
            if (props.currentUser)
                return <WrappedComponent {...props} />;
            else
                return (
                    <div className="position-relative">
                        <span style={blurOverwrapStyles}>Login is required</span>
                        <div style={blurMaskStyles} />
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
        currentUser: state.auth.currentUser,
    });

    return function(WrappedComponent) {
        const component = (props) => {
            if (pass(allowedPermissions, props.currentUser, props.node))
                return <WrappedComponent {...props} />;
            else
                return (
                    <div className="position-relative">
                        <span style={blurOverwrapStyles}>You do not have correct permission</span>
                        <div style={blurMaskStyles} />
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
        currentUser: state.auth.currentUser,
    });

    return function(WrappedComponent) {
        const component = (props) => {
            return pass(allowedPermissions, props.currentUser, props.node) ?
                <WrappedComponent {...props} /> : '';
        };
        return connect(mapStateToProps)(component);
    };
}