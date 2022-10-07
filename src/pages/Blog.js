import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';
//import Badge from '../components/Badge';
//import { Badge } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { MDBRow, MDBIcon, MDBContainer, MDBCol, MDBCard, MDBCardText, MDBCardTitle, MDBCardImage, MDBCardBody, MDBTypography,} from "mdb-react-ui-kit";


function Blog() {
    const [blog, setBlog] = useState();
    const [relatedPosts, setRelatedPosts] = useState([]);
    const {id} = useParams();
    

    useEffect(() => {
        if(id) {
            getSingleBlog();
        }
    }, [id])

    //create function to get single blog via api request and also related posts 
    const getSingleBlog = async () => {
        const response = await axios.get(`http://localhost:8000/blogs/${id}`);
        const relatedPostsData = await axios.get(`http://localhost:8000/blogs/?category=${response.data.category}&_start=0&_end=3`
        );
        setRelatedPosts(relatedPostsData.data);
        if(response.status === 200 || relatedPostsData.status === 200){
           setBlog(response.data);
        }else {
            toast.error("Something is wrong")
        }
    };


    const excerpt = (string) => {
        if(string.length > 1) {
            string = string.substring(0, 4) + " ... ";
        }
        return string;
    };


    const blogStyle = {
        display: "inline",
        marginLeft: "5px",
        float: "right",
        marginTop: "7px"
    }

  return (

    <MDBContainer style={{border: "1px solid #d1ebe8"}}>
        <Link to="/">
            <strong style={{float: "left", color: "black"}} className="mt-3">
                Go Back
            </strong>
        </Link>
        <MDBTypography tag="h2" className="text-muted mt-2" style={{display: "inline-block"}}>{blog && blog.title}</MDBTypography>
        <img 
        src={blog && blog.imageUrl}
        className="img-fluid rounded"
        alt={blog && blog.title}
        style={{width: "100%", maxHeight: "600px"}}
        />
        <div style={{marginTop: "20px"}}>
            <div style={{height: "43px", background: "#f6f6f6"}}>
                <MDBIcon 
                style={{float: "left"}}
                className="mt-3"
                far
                icon="calender-alt"
                size="lg"
                />
                <strong style={{float: "left", marginTop:"12px", marginLeft:"2px"}}>
                    {blog && blog.date}
                </strong>
                <p blogStyle={blogStyle}>
                    {blog && blog.category}
                </p>
            </div>
            <MDBTypography className="load md-0">
                {blog && blog.description}
            </MDBTypography>
        </div>
        {relatedPosts && relatedPosts.length > 0 &&(
            <>
            {relatedPosts.length > 1 && <h1>Related Posts</h1>}
            <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                {relatedPosts
                .filter((item) => item.id !==id)
                .map((item, index) => (
                    <MDBCol>
                        <MDBCard>
                            <Link to={`/blog/${item.id}`}>
                                <MDBCardImage
                                    src={item.imageUrl}
                                    alt={item.title}
                                    position="top"/>
                            </Link>
                            <MDBCardBody>
                                <MDBCardTitle>{item.title}</MDBCardTitle>
                                <MDBCardText>{excerpt(item.description)}</MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                ))}
            </MDBRow>

            </>
        )}
    </MDBContainer>
    );
};

export default Blog