import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddCourse() {
  const [courseName, setCourseName]=useState('');
  const [price, setPrice]=useState('');
  const [description, setDescription]=useState('');
  const [startingDate, setStartingDate]=useState('');
  const [endingDate, setEndingDate]= useState('');
  const [imageUrl, setImageUrl]= useState('');
  const [image,setImage]=useState('');
  const [isLoading, setIsLoading]= useState(false);
  const navigate= useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(courseName,price,description,startingDate,endingDate,image);
    // here we are using post method because we have to send the data to the backend
    const formData= new FormData();
    formData.append('courseName',courseName);
    formData.append('price',price);
    formData.append('description',description);
    formData.append('startingDate',startingDate);
    formData.append('endingDate',endingDate);
    formData.append('image',image);
    axios.post('http://localhost:3003/course/add-course',formData, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(result=>{
       console.log(result);
       setIsLoading(false);
       localStorage.setItem('courseId',result.data.newcourse._id);
       toast.success('new course is created successfully');
       navigate('/dashboard/courses');
    })
    .catch(error=>{
       console.log(error);
       setIsLoading(false);
       toast.error('something is wrong . Having trouble in adding new course');
    })
}  
  const fileHandler=(e)=>{
    setImage(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
}
  return (
    <>
      <form className="signup-form" onSubmit={submitHandler}>
        <h1>Create New Course
        </h1>
        <input required onChange={e => setCourseName(e.target.value)} type='text' placeholder="Course Name" />
        <input required onChange={e => setPrice(e.target.value)} type='number' placeholder="price" />
        <input required onChange={e => setDescription(e.target.value)} type='text' placeholder="description" />
        <input required onChange={e => setStartingDate(e.target.value)} type='text' placeholder="Starting Date"/>
        <input required onChange={e => setEndingDate(e.target.value)} type='text' placeholder="Ending Date"/>
        <input required type="file" onChange={fileHandler} />
        {imageUrl && <img className="your-logo" src={imageUrl} alt="mylogo" />}
        <button type="submit"> Add Course {isLoading && <i class="fa-solid fa-sync fa-spin"></i>}</button>
        {/* <Link className="link" to='/login'>already have an account</Link> */}
      </form>
    </>);
}

export default AddCourse;