import React from 'react'
import ReactPaginate from 'react-paginate'

function Pagination(props) {
  return (
    <ReactPaginate
        breakLabel="..."
        nextLabel=" >>>"
        onPageChange={props.handlePageClick}
        pageRangeDisplayed={5}
        pageCount={props.pagecount}
        previousLabel="<<<"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        containerClassName="pagination justify-content-end pagination-blue"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        // forcePage={CurrentPage.current - 1}
      />
  )
}

export default Pagination