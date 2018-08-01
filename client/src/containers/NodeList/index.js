import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { nodeListFetch, parentNodeFetch, paginationChangePage, paginationChangeResultPerPage, parentNodeChange } from '../../actions/nodeListActions'
import Node from "../../components/Node"
import Navigation from "../../components/Navigation"
import CreateReplyForm from './createReplyForm'
import CreateTopicForm from './createTopicForm'
import CreateForumForm from './createForumForm'

class NodeList extends Component {
    constructor(props) {
        super(props)
        this.handlePageChangeClick = this.handlePageChangeClick.bind(this)
        this.handleResultPerPageChangeClick = this.handleResultPerPageChangeClick.bind(this)
    }

    componentDidMount() {
        // When component mounted.
        if (this.props.match.params.hasOwnProperty('nodeId')) {
            // If component was mounted through /nodelist/:nodeId route.
            // We want to change the parent node id to the one given in the URL.
            this.props.parentNodeChange(this.props.match.params.nodeId)
        } else {
            // If component was mounted through / route.
            // We want to use the default state (defined in nodeList reducer).
            this.props.nodeListFetch()
            this.props.parentNodeFetch()
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.location !== this.props.location){
            if(this.props.match.params.hasOwnProperty('nodeId')) {
                this.props.parentNodeChange(this.props.match.params.nodeId)
            } else {
                // TODO: better approach?
                this.props.parentNodeChange(null)

            }
        }
    }

    handlePageChangeClick(data) {
        // When a page change is detected.
        // Trigger the change page action.
        this.props.paginationChangePage(data.selected)
    }

    handleResultPerPageChangeClick(event) {
        // When a "number of results per page" change is detected.
        // Trigger the change results per page action.
        this.props.paginationChangeResultPerPage(event.target.value)
    }

    renderNodeList(nodes) {
        return nodes.map(node => {
            return (
                <Node key={node._id}
                      content={node}
                      nodeListChangeParentNode={this.props.parentNodeChange}
                      history={this.props.history} />
            )
        })
    }

    render() {
        if (this.props.nodesLoading === true || this.props.parentNodeLoading === true) {
            return (
                <div className="container">
                    <h2>Loading...</h2>
                </div>
            )
        } else if (this.props.error) {
            return (
                <div className="container">
                    <div className="alert alert-danger">Error: {this.props.error.message}</div>
                </div>
            )
        } else if (this.props.nodesLoaded === true && this.props.parentNodeLoaded === true) {
            // Conversation : when parent node is a topic, we want to display it.
            // Should be displayed above classical nodelist displaying and pagination stuff.
            if (this.props.parentNode.type == "Topic") {
                var parentNodeDisplay = <Node key={this.props.parentNode._id} content={this.props.parentNode} display="conversation" />
            } else {
                var parentNodeDisplay = ''
            }

            // Creation form.
            // Displayed node creation forms should depend on the parent type.

            if (this.props.parentNode.type == "Forum") {
                var creationForms = <div><CreateTopicForm /><CreateForumForm /></div>

            } else if (this.props.parentNode.type == "Topic" || this.props.parentNode.type == "Reply") {
                var creationForms = <div><CreateReplyForm /></div>
            }
            return (
                <div className="container">
                    <Navigation node={this.props.parentNode} />
                    {parentNodeDisplay}
                    <div>
                        <select id="paginaion-select"
                                value={this.props.pagination.perPage}
                                onChange={this.handleResultPerPageChangeClick}>
                            <option value="2">2</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div>
                        <ReactPaginate previousLabel={"<"}
                                       nextLabel={">"}
                                       breakLabel={<a href="">...</a>}
                                       breakClassName={"break-me"}
                                       pageCount={this.props.pagination.totalPage}
                                       forcePage={this.props.pagination.currentPage}
                                       marginPagesDisplayed={2}
                                       pageRangeDisplayed={5}
                                       onPageChange={this.handlePageChangeClick}
                                       containerClassName={"pagination"}
                                       subContainerClassName={"pages pagination"}
                                       activeClassName={"active"} />
                    </div>
                    <ul className="list-group">
                        {this.renderNodeList(this.props.nodes)}
                    </ul>
                    {creationForms}
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

const mapStateToProps = state => ({
    parentNodeLoading: state.nodeList.parentNodeLoading,
    parentNodeLoaded: state.nodeList.parentNodeLoaded,
    parentNodeId: state.nodeList.parentNodeId,
    parentNode: state.nodeList.parentNode,
    nodesLoading: state.nodeList.nodesLoading,
    nodesLoaded: state.nodeList.nodesLoaded,
    nodes: state.nodeList.nodes,
    searchResult: state.nodeList.searchResult,
    pagination: state.nodeList.pagination,
    error: state.nodeList.error,
})

const mapDispatchToProps = dispatch => ({
    nodeListFetch: () => {
        dispatch(nodeListFetch())
    },
    parentNodeFetch: () => {
        dispatch(parentNodeFetch())
    },
    parentNodeChange: parentNodeId => {
        dispatch(parentNodeChange(parentNodeId))
        dispatch(parentNodeFetch())
        dispatch(paginationChangePage(0))
        dispatch(nodeListFetch())
    },
    paginationChangePage: pageNumber => {
        dispatch(paginationChangePage(pageNumber))
        dispatch(nodeListFetch())
    },
    paginationChangeResultPerPage: resultPerPage => {
        dispatch(paginationChangeResultPerPage(resultPerPage))
        dispatch(nodeListFetch())
    }
})

export default connect(mapStateToProps, mapDispatchToProps) (NodeList)