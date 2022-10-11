import React, { useState, useEffect } from 'react'
import { MDBInput, MDBBtn, MDBValidation,MDBTextArea  } from "mdb-react-ui-kit";
import {toast} from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
//qu2trmjj cloudinary 

const initialState = {
    title: "",
    description: "",
    category: "",
    imageUrl: ""
}

const options = ["EPL", "Bundesliga", "La Liga", "MLS", "SuperSport", "Serie A"];

function AddBlogPost() {
    const [formValue, setFormValue] = useState(initialState);
    const [categoryErrorMsg, setCategoryErrorMsg] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const {title, description, category, imageUrl} = formValue;
    const navigate = useNavigate();
    
    const {id} = useParams();
    
    useEffect(() => {
        if (id) {
            setEditMode(true);
            getSingleBlog(id)
        } else {
            setEditMode(false);
            setFormValue({...initialState});
        }
    }, [id]);

    //fetch single blog based on id
    const getSingleBlog = async (id) => {
        const singleBlog = await axios.get(`https://my-json-server.typicode.com/timothymureithi/db.json/blogs/${id}`);
        if(singleBlog.status === 200) {
            setFormValue({ ...singleBlog.data });
        }else {
            toast.error("Please try again!")
        }
    };


    //get current time of blog upload
    const getDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0");
        let yy = today.getFullYear();

        today = dd + "/" + mm + "/" + yy;
        return today;

    };

    //define handle submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!category){
            setCategoryErrorMsg("PLEASE SELECT A CATEGORY!");
        }
        const imageValidation = !editMode ? imageUrl : true;
        if(title && description && imageUrl && category) {
            const currentDate = getDate();
            if(!editMode ){
                const updateBlogData = {...formValue, date: currentDate};
                const response = await axios.post("https://my-json-server.typicode.com/timothymureithi/db.json", 
                updateBlogData 
                );
                if(response.status === 201) {
                    toast.success("Post created Successfully")
                } else {
                    toast.error("Hmm something is not right, please try again");
                }
    
            } else {
                const response = await axios.put(`https://my-json-server.typicode.com/timothymureithi/db.json/blogs/${id}`, 
                formValue
                );
                if(response.status === 200) {
                    toast.success("Blog Post updated Successfully")
                }else{
                    toast.error("Hmm something is not right, please try again");
                }
            }
         
           
            //clear input field after upload blog and redirect to homepage
            setFormValue({title: "", description: "", category: "", imageUrl: ""})
            navigate('/');
        }
    };

    //define onInputChange then receive the event
    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({...formValue, [name]: value});
    };

    //define onUploadImage
    //set up toast to display message that image has be uploaded
    const onUploadImage = (file) => {
        console.log("file", file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "qu2trmjj");
        axios
        .post("http://api.cloudinary.com/v1_1/db15gy9h6/image/upload", formData)
        .then((res) => {
            toast.info("Image Uploaded Successfully");
            setFormValue({...formValue, imageUrl: res.data.url});
        })
        .catch((error) => {
            toast.error("Please try again!");
        });
    };
    

    //define onCategoryChange
    const onCategoryChange = (e) => {
        setCategoryErrorMsg(null)
        setFormValue({...formValue, category: e.target.value});
    };

  return (
    //bootstrap UI/pass noValidate props
    <MDBValidation className="row g-3" style={{marginTop: "100px"}} noValidate onSubmit={handleSubmit}>
        <p className="fs-2 fw-bold">{editMode ? "Update Blog Post" : "Add Blog Post"}</p>
        <div style={{
            padding: "15px",
            margin: "auto",
            maxWidth: "400px",
            alignContent: "center",
        }}>
            <MDBInput 
            value={title || ""}
            name="title"
            type="text"
            onChange={onInputChange}
            required
            label="Title"
            validation="Please provide a title"
            invalid
            />
            <br />
            <MDBTextArea
            value={description || ""}
            name="description"
            type="text"
            onChange={onInputChange}
            required
            label="Description"
            validation="Please provide a description!"
            textarea
            rows={4}
            invalid
            />
            <br />
            {/**File Upload */}
            {!editMode &&(
                <>
                 <MDBInput 
            type="file"
            onChange={(e) => onUploadImage(e.target.files[0])}
            required
            validation="Please provide a title"
            invalid
            />
                </>
            )}
           
            <br />
            {/**Dropdown */}
            <select className="categoryDropdown" onChange={onCategoryChange} value={category}>
                <option>Please select a league</option>
                {options.map((option, index) => (
                    <option value={option || ""} 
                    key={index}>{option}</option>
                ))}
                
            </select>
            {categoryErrorMsg && (
                    <div className="ErrorMsg">{categoryErrorMsg}</div>
            )}
            <br />
            <br />  
            <MDBBtn type="submit" style={{marginRight: "10px"}}>
                {editMode ? "Update" : "Add"}
            </MDBBtn>
            <MDBBtn color="danger" style={{marginRight: "10px"}} onClick={() => navigate("/")}>Please Go Back!</MDBBtn>
        </div>

    </MDBValidation>

  );
};

export default AddBlogPost