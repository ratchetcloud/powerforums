import React, { Component } from 'react';
import {connect} from 'react-redux';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import Error404 from '../../components/Error404';
import Error410 from '../../components/Error410';
import ForumComponent from './ForumComponent';
import TopicComponent from './TopicComponent';
import * as actions from './actions';
import './nodeview.css';

const ROOT_FORUM_ID = '000000000000000000000000';

class NodeView extends Component {
    constructor(props) {
        super(props);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
        this.handleChildEvent = this.handleChildEvent.bind(this);
    };

    _loadFromRouteParam() {
        // If component was mounted through /nodelist/:nodeId route, use that param.
        // Otherwise, component was mounted through / route, use ROOT_FORUM_ID constant.
        let nodeId = this.props.match.params.hasOwnProperty('nodeId') ?
            this.props.match.params.nodeId :
            ROOT_FORUM_ID;
        this.props.load(nodeId);
    }

    componentDidMount() {
        this._loadFromRouteParam();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location)
            this._loadFromRouteParam();
    }

    handlePaginationChange(newPagination) {
        this.props.reload(newPagination.currentPage, newPagination.perPage);
    }

    handleChildEvent(eventType, nodeId, values=null) {
        switch (eventType) {
            case 'CREATE':
                this.props.createNode(values);
                break;

            case 'UPDATE':
                this.props.updateNode({...values, ...{_id: nodeId}});
                break;

            case 'DELETE':
                // If deleting current page's node, redirect to parent node.
                let nextNodeId = (nodeId === this.props.node._id) ? this.props.node._parentId : undefined;
                this.props.deleteNode(nodeId, nextNodeId);
                break;

            case 'TOGGLE_STICKY':
                this.props.stickNode(nodeId, values);
                break;

            default:
                alert('Unhandled event:\n' + eventType + ':' + nodeId);
        }
    }

    render() {
        const {node, children, pagination, error} = this.props;
        let component;

        if (error && error.response.status === 404)
            return <Error404 />;

            if (error && error.response.status === 410)
            return <Error410 />;

        if (!node || !children) {
            // Node or children are not load yet.
            component = <Loading />;

        }else {
            switch (node.type) {
                case 'Forum':
                    component = <ForumComponent node={node}
                                    children={children}
                                    pagination={pagination}
                                    onPaginationChange={this.handlePaginationChange}
                                    onChildEvent={this.handleChildEvent}/>;
                    break;

                case 'Topic':
                    component = <TopicComponent node={node}
                                    children={children}
                                    pagination={pagination}
                                    onPaginationChange={this.handlePaginationChange}
                                    onChildEvent={this.handleChildEvent}/>;
                    break;

                default:
                    return <ErrorMessage error={{message: 'Invalid node type'}}/>;
            }
        }

        return (
            <div>
                {error !== false && <ErrorMessage error={error} />}
                {component}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    node: state.nodeView.node,
    children: state.nodeView.children,
    pagination: state.nodeView.pagination,
    error: state.nodeView.error,
    currentUser: state.login.currentUser,
});

const mapDispatchToProps = dispatch => ({
    load: (nodeId) => {
        dispatch(actions.load(nodeId));
    },
    reload: (currentPage=undefined, perPage=undefined) => {
        dispatch(actions.reload(currentPage, perPage));
    },
    createNode: (node) => {
        dispatch(actions.createNode(node))
    },
    updateNode: (node) => {
        dispatch(actions.updateNode(node));
    },
    deleteNode: (node, nextNodeId=undefined) => {
        dispatch(actions.deleteNode(node, nextNodeId));
    },
    stickNode: (node, sticky) => {
        dispatch(actions.stickNode(node, sticky));
    }
});

export default connect(mapStateToProps, mapDispatchToProps) (NodeView);