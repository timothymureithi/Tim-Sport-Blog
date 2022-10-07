import React from 'react'
import { MDBRow, MDBCol, MDBCardImage, MDBCardBody, MDBCard } from "mdb-react-ui-kit";
import {Link} from "react-router-dom";

function LatestBlog({imageUrl, title, id}) {
  return (
    <div>
        <Link to={`/blog/${id}`}>
            <MDBCard style={{maxWidth: "300px", height: "80px"}} className='mt-2'>
                <MDBRow className='g-0'>
                    <MDBCol md='3'>
                        <MDBCardImage
                        src={imageUrl}
                        alt={title}
                        fluid
                        className='rounded-circle'
                        style={{height: "75px"}}/>

                    </MDBCol>
                    <MDBCol md='9'>
                        <MDBCardBody>
                            <p className="text-start latest-title">{title}</p>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </Link>
    </div>
  );
};

export default LatestBlog