import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import axios from "axios";
import {MDBContainer, MDBTypography, MDBCol, MDBRow} from "mdb-react-ui-kit";
import Blogs from '../components/Blogs';
import Search from '../components/Search';
import Category from '../components/Category';
import LatestBlog from '../components/LatestBlog';
import Pagination from '../components/Pagination';

function Home() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState(""); 
    const [latestBlog, setLatestBlog] = useState([]);
    const [totalBlog, setTotalBlog] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLimit] = useState(4); 

    const options = ["EPL", "Bundesliga", "La Liga", "MLS", "SuperSport", "Serie A"];


    useEffect(() => {
        loadBlogData(0, 4, 0);
        fetchLatestBlog();
    }, [])

    const loadBlogData = async (start, end, increase, operation) => {
        const blogMax = await axios.get('http://localhost:8000/blogs');
        setTotalBlog(blogMax.data.length);
        
        const response = await axios.get(`http://localhost:8000/blogs?_start=${start}&_end=${end}`);
        if(response.status === 200) {
            setData(response.data);
            if(operation) {
                setCurrentPage(0)
            }else {
                setCurrentPage(currentPage + increase);
            }
        }else{
            toast.error("Please try again!");
        }
    }
    console.log("data", data);


    //Display card component data
    const excerpt = (string) => {
        if(string.length > 1) {
            string = string.substring(0, 4) + " ... ";
        }
        return string;
    };

    
    //Function to fetch the last 3 blogs that will be displayed 
    const fetchLatestBlog = async () =>{
        const blogMax = await axios.get('http://localhost:8000/blogs');
        const start = blogMax.data.length - 3;
        const end = blogMax.data.length;

        const response = await axios.get(`http://localhost:8000/blogs?_start=${start}&_end=${end}`);
        if(response.status === 200) {
            setLatestBlog(response.data);
        }else{
            toast.error("Error");
        }
    };


    //Make api request to allow deletion of blog from json
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to proceeed to delete this blog?")) 
        {
            const response = await axios.delete(`http://localhost:8000/blogs/${id}`);
            if (response.status === 200) {
                toast.success("Deleted Successfully");
                loadBlogData(0, 5, 0, "delete");
            }else{
                toast.error('Please try again');
            }
            
        }
    };


    //When input is deleted the homepage is able to capture all blogs from json server
    const onInputChange = (event) =>{
        if(!event.target.value){
            loadBlogData(0, 4, 0);
        }
        setSearch(event.target.value);
    }
    

    //request from json to fetch searched data
    const handleSearch = async (event) =>{
        event.preventDefault();
        const response = await axios.get(`http://localhost:8000/blogs/?q=${search}`);
        if(response.status === 200){
            setData(response.data)
        }else{
            toast.error("Nothing Found!")
        }
    }

    //League sidebar function
    const handleCategory = async (category) => {
        const response = await axios.get(`http://localhost:8000/blogs?category=${category}`);
        if(response.status === 200) {
            setData(response.data)
        }else {
            toast.error("Link not working");
        }
    };

    //display all blogs in card component
  return (
    <>
    <Search 
    search={search} 
    onInputChange={onInputChange} 
    handleSearch={handleSearch} />
    <MDBRow>
        {data.length === 0 && (
            <MDBTypography className="text-center mb-0" tag="h2">
                     <div>
      <img src="https://i.stack.imgur.com/6M513.png" alt="NOT FOUND"/>
    </div>
            </MDBTypography>
        )}
        <MDBCol>
            <MDBContainer>
                <MDBRow>
                {data && data.map((item, index) => (
        <Blogs
        key={index}
        {...item}
        excerpt={excerpt}
        handleDelete={handleDelete}
        />
    ))}
                </MDBRow>
            </MDBContainer>
        </MDBCol>
        <MDBCol size="3">
            <h4 className="text-start">Latest Posts</h4>
            {latestBlog && latestBlog.map((item, index) => (
                <LatestBlog key={index} {...item}/>
            ))}
            <Category options={options} handleCategory={handleCategory}/>
        </MDBCol>
    </MDBRow>
    <div className="mt-3">
        <Pagination 
        currentPage={currentPage}
        loadBlogData={loadBlogData} 
         pageLimit={pageLimit}
          data={data}
          blog={totalBlog}/>
    </div>
 
    
    </>
  );
};

export default Home;