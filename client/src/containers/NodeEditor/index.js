import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Loading from '../../components/Loading';
import NodeEditorComponent from './component';
import {nodeUrl} from '../../utils/urls';
import * as actions from './actions';

class NodeEditor extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    };

    _loadFromRouteParam() {
        let nodeId = this.props.match.params.nodeId;
        this.props.load(nodeId);

        // URL url for edit: `/n/:nodeId/edit`, for post: `/n/:parentNodeId/post`
        this.mode = this.props.match.path.indexOf('edit') !== -1 ? 'edit' : 'post';
    }

    componentDidMount() {
        this._loadFromRouteParam();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location !== this.props.location)
            this._loadFromRouteParam();
    }

    componentWillUnmount() {
        this.props.finishEditing();
    }

    onSubmit(values) {
        switch (this.mode) {
            case 'post':
                this.props.createNode(values);
                break;

            case 'edit':
                this.props.updateNode(values);
                break;

            default:
                alert('Error: invalid type');
        }
    }

    render() {
        const {node, nextNodeId} = this.props;

        if (!node)
            // Node or children are not load yet.
            return <Loading/>;

        if (nextNodeId)
            // Submission succeed, go to target node
            return <Redirect to={nodeUrl(nextNodeId)} />;

        return <NodeEditorComponent node={node} mode={this.mode} onSubmit={this.onSubmit} />
    }
}


const mapStateToProps = state => ({
    node: state.nodeEditor.node,
    nextNodeId: state.nodeEditor.nextNodeId,
});

const mapDispatchToProps = dispatch => ({
    load: (nodeId) => {
        dispatch(actions.load(nodeId));
    },
    createNode: (values) => {
        dispatch(actions.createNode(values));
    },
    updateNode: (values) => {
        dispatch(actions.updateNode(values));
    },
    finishEditing: () => {
        dispatch(actions.finishEditing());
    }
});

export default connect(mapStateToProps, mapDispatchToProps) (NodeEditor);