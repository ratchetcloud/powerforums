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
        this.props.submit(values);
    }

    render() {
        const {node, nextNodeId} = this.props;

        if (!node)
            // Node or children are not load yet.
            return <Loading/>;

        if (nextNodeId)
            // Submission succeed, go to target node
            return <Redirect to={nodeUrl(nextNodeId)} />;

        return <NodeEditorComponent node={node} onSubmit={this.onSubmit} />
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
    submit: (values) => {
        dispatch(actions.createNode(values));
    },
    finishEditing: () => {
        dispatch(actions.finishEditing());
    }
});

export default connect(mapStateToProps, mapDispatchToProps) (NodeEditor);