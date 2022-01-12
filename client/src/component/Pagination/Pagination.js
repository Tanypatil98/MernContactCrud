import React from 'react';
import Pagination from "react-js-pagination";

const PaginationList = (props) => {
    const { length, activePage, handlePage } = props;
    

    return (
        <Pagination
            activePage={activePage}
            itemsCountPerPage={5}
            totalItemsCount={length}
            pageRangeDisplayed={3}
            onChange={handlePage}
        />
    );
}

export default PaginationList;