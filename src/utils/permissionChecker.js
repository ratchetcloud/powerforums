import React from 'react';
import { connect } from 'react-redux'

/**
 * If there is no correct permission, show blurred component with requiring-login message
 * @param WrappedComponent
 */
export function blurIfNoPermission(WrappedComponent) {
    const mapStateToProps = state => ({
        user: state.user.authentication.currentUser
    });

    return connect(mapStateToProps)(
        class extends React.Component {
            constructor(props) {
                super(props);
            }

            render() {
                if (this.props.user) {
                    // TODO: check for permission for each node
                    return <WrappedComponent {...this.props} />;
                }else {
                    return (
                        <div style={{position: "relative"}}>
                            <span style={{position:"absolute", zIndex:2, top: "40%", left: "200px"}}>Login is required</span>
                            <div style={{position: "absolute", backgroundColor: "rgba(255,255,255,0.7)", width: "100%", height: "100%", zIndex:1}}></div>
                            <div style={{filter: "blur(3px)"}}>
                                <WrappedComponent {...this.props} />;
                            </div>
                        </div>
                    )
                }
            }
        }
    );
}