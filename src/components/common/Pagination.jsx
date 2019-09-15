import React from 'react';
import Pagination from 'react-js-pagination';

const PaginationElement = (props) => {
const { jobsCount, pageSize, onPageChange, currentPage } = props;
const pagesCount = Math.ceil(jobsCount/pageSize);
    if (pagesCount === 1) return null;
    return <Pagination
            activePage={currentPage}
            itemsCountPerPage={pageSize}
            totalItemsCount={jobsCount}
            pageRangeDisplayed={15}
            onChange={onPageChange}
			innerClass="pagination"
			itemClass="page-item"
			activeClass="active"
			linkClass="page-link"/>
}
 
export default PaginationElement;