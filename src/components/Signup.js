import React, { use, useState } from "react";
import '../components/style.css';
import axios from "axios";
import {  toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl]= useState(null);
    const [isLoading, setIsLoading]= useState(false);
    
    const navigate =useNavigate();
   const submitHandler = (e) => {
         e.preventDefault();
         setIsLoading(true);
         console.log(fullName,email,password,phone,image);
         // here we are using post method because we have to send the data to the backend
         const formData= new FormData();
         formData.append('fullName',fullName);
         formData.append('email',email);
         formData.append('phone',phone);
         formData.append('password',password);
         formData.append('image',image)
         axios.post('http://localhost:3003/user/signup',formData)
         .then(result=>{
            console.log(result);
            setIsLoading(false);
            toast.success('your account is created successfully');
            navigate('/login');
         })
         .catch(error=>{
            console.log(error);
            setIsLoading(false);
            toast.error('something is wrong . Emails has been already used or you have not proper net connection');
         })
    }  

    const fileHandler=(e)=>{
        setImage(e.target.files[0])
        setImageUrl(URL.createObjectURL(e.target.files[0]))
    }
      return (
        <>
            <div className="signup-wrapper">
                <div className="signup-box">
                    <div className="signup-left">
                        <img src={require('../asset/secondlogo.png')} alt="book-logo" />
                        <h1>Learn in easy way...</h1>
                    </div>
                    <div className="signup-right">

                        <hr></hr>
                        <form className="signup-form" onSubmit={submitHandler}>
                            <h1>Create your account</h1>
                            <input required  onChange={e => setFullName(e.target.value)} type='text' placeholder="Institute Name" />
                            <input required onChange={e => setEmail(e.target.value)} type='email' placeholder="Email" />
                            <input required onChange={e => setPhone(e.target.value)} type='text' placeholder="Phone" />
                            <input required onChange={e => setPassword(e.target.value)} type='password' placeholder="Password" />
                            <input required type="file" onChange={fileHandler} />
                           { imageUrl&&<img className="your-logo" src={imageUrl} alt="mylogo"/>}
                            <button type="submit">Signup {isLoading&&<i class="fa-solid fa-sync fa-spin"></i>}</button>
                           <Link className="link" to='/login'>already have an account</Link>

                        </form>

                    </div>
                </div>

            </div>
        </>
    );
}

export default Signup;
