import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { roleListFetch } from '../actions/roleListActions'
import Role from "./Role"
import CreateRoleForm from '../forms/createRoleForm'
import { paginationChangePage, paginationChangeResultPerPage, userListFetch } from "../actions/userListActions";

class RoleList extends Component {
    constructor(props) {
        super(props);
        this.handlePageChangeClick = this.handlePageChangeClick.bind(this);
        this.handleResultPerPageChangeClick = this.handleResultPerPageChangeClick.bind(this);
    }

    componentDidMount() {
        this.props.roleListFetch()
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

    renderRoleList(roles) {
        return roles.map(role => {
            return (
                <Role key={role._id}
                      content={role} />
            )
        })
    }

    render() {
        if (this.props.rolesLoading === true) {
            return (
                <div className="container">
                    <h2>Roles management</h2>
                    <h2>Loading...</h2>
                </div>
            );
        } else if (this.props.rolesLoaded === true) {
            return (
                <div>
                    <h2>Roles management</h2>
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
                    {this.renderRoleList(this.props.roles)}
                    <div><CreateRoleForm/></div>
                </div>
            );
        } else if (this.props.error) {
            return (
                <div className="container">
                    <h2>Roles management</h2>
                    <div className="alert alert-danger">Error: {this.props.error.message}</div>
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

const mapStateToProps = state => ({
    rolesLoading: state.roleList.rolesLoading,
    rolesLoaded: state.roleList.rolesLoaded,
    roles: state.roleList.roles,
    pagination: state.roleList.pagination
})

const mapDispatchToProps = dispatch => ({
    roleListFetch: () => {
        dispatch(roleListFetch())
    },
    paginationChangePage: pageNumber => {
        dispatch(paginationChangePage(pageNumber))
        dispatch(roleListFetch())
    },
    paginationChangeResultPerPage: resultPerPage => {
        dispatch(paginationChangeResultPerPage(resultPerPage))
        dispatch(roleListFetch())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RoleList)