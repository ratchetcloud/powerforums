import ReactPaginate from "react-paginate";
import React from "react";

const Pagination = (props) => {
    const {pagination, onChange} = props;

    const perPageChangeHandler = (event) => {
        // <select> onChange Event
        onChange({...pagination, ...{perPage: event.target.value}});
    };
    const currentPageChangeHandler = (event) => {
        // ReactPaginate onPageChange Event
        onChange({...pagination, ...{currentPage: event.selected}});
    };

    return (
        <div>
            <div>
                <select id="pagination-select"
                        value={pagination.perPage}
                        onChange={perPageChangeHandler}>
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
                               pageCount={pagination.totalPage}
                               forcePage={pagination.currentPage}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={currentPageChangeHandler}
                               containerClassName={"pagination"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"} />
            </div>
        </div>
    )
};
export default Pagination;