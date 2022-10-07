import React from 'react'
import {MDBPagination, MDBPaginationLink, MDBPaginationItem, MDBBtn} from "mdb-react-ui-kit"; 

function Pagination({data, totalBlog, currentPage, pageLimit, loadBlogData}) {
    const renderPage = () => {
        if(currentPage === 0 && data.length < 4 || (totalBlog === pageLimit && currentPage === 0)) 
        return null;
        if(currentPage === 0){
            return (
            <MDBPagination center className='mb-0'>
                <MDBPaginationItem>
                    <MDBPaginationLink>1</MDBPaginationLink>
                </MDBPaginationItem>
                <MDBPaginationItem>
                        <MDBBtn rounded onClick={() => loadBlogData(4, 10, 1)}>
                            Next
                        </MDBBtn>
                </MDBPaginationItem>
            </MDBPagination>
            );
        }else if(currentPage < pageLimit - 1 &&
             data.length === pageLimit && 
             totalBlog * data.length !== pageLimit){
            return (
            <MDBPagination center className='mb-0'>
            <MDBPaginationItem>
                    <MDBBtn 
                    rounded 
                    onClick={() => loadBlogData((currentPage - 1) * 4, currentPage * 4, -1)}>
                        Back
                    </MDBBtn>
                    </MDBPaginationItem>
                <MDBPaginationItem>
                <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
            <MDBBtn rounded onClick={() => loadBlogData((currentPage + 1) * 4, (currentPage + 2) * 4, 1)}>
                        Next
                    </MDBBtn>
            </MDBPaginationItem>
        </MDBPagination>
            );
        }else {
            return (
            <MDBPagination center className='mb-0'>
            <MDBPaginationItem>
                    <MDBBtn rounded onClick={() => loadBlogData((currentPage - 1) * 4, currentPage * 4, -1)}>
                        Prev
                    </MDBBtn>
                    </MDBPaginationItem>
                <MDBPaginationItem>
                <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
            </MDBPaginationItem>
            </MDBPagination>
            );
        }
    };
  return (
    <div>
        {renderPage()}
    </div>
  )
}

export default Pagination