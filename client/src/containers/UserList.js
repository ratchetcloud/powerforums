import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { userListFetch, paginationChangeResultPerPage, paginationChangePage } from '../actions/userListActions'
import User from "./User"
import CreateUserForm from '../forms/createUserForm'
import {blurIfNoPermission} from "../utils/permissionChecker";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.handlePageChangeClick = this.handlePageChangeClick.bind(this);
        this.handleResultPerPageChangeClick = this.handleResultPerPageChangeClick.bind(this);
    }

    componentDidMount() {
        this.props.userListFetch()
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

    renderUserList(users) {
        return users.map(user => {
            return (
                <User key={user._id}
                      content={user} />
            )
        })
    }

    render() {
        if (this.props.usersLoading === true) {
            return (
                <div className="container">
                    <h2>Users management</h2>
                    <h2>Loading...</h2>
                </div>
            )
        } else if (this.props.error) {
            return (
                <div className="container">
                    <div className="alert alert-danger">Error: {this.props.error.message}</div>
                </div>
            )
        } else if (this.props.usersLoaded === true) {
            return (
                <div>
                    <h2>Users management</h2>
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

                    {this.renderUserList(this.props.users)}
                </div>
            )
        }  else if (this.props.error) {
            return (
                <div className="container">
                    <h2>Users management</h2>
                    <div className="alert alert-danger">Error: {this.props.error.message}</div>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

const mapStateToProps = state => ({
    usersLoading: state.userList.usersLoading,
    usersLoaded: state.userList.usersLoaded,
    users: state.userList.users,
    pagination: state.userList.pagination,
});

const mapDispatchToProps = dispatch => ({
    userListFetch: () => {
        dispatch(userListFetch())
    },
    paginationChangePage: pageNumber => {
        dispatch(paginationChangePage(pageNumber))
        dispatch(userListFetch())
    },
    paginationChangeResultPerPage: resultPerPage => {
        dispatch(paginationChangeResultPerPage(resultPerPage))
        dispatch(userListFetch())
    }
});


export default blurIfNoPermission(connect(mapStateToProps, mapDispatchToProps)(UserList))