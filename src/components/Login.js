import React, { use, useState } from "react";
import '../components/style.css';
import axios from "axios";
import {  toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

function Login() {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading]= useState(false);
    const navigate =useNavigate();
    const submitHandler = (e) => {
         e.preventDefault();
         setIsLoading(true);
         // here we are using post method because we have to send the data to the backend
         axios.post('http://localhost:3003/user/login',{
            email:email,
            password:password, 
         })
         .then(result=>{
            console.log(result);
            setIsLoading(false);
            localStorage.setItem('email',result.data.email);
            localStorage.setItem('uId',result.data.id);
            localStorage.setItem('token',result.data.token)
            localStorage.setItem('fullName',result.data.fullName)
            localStorage.setItem('imageUrl',result.data.imageUrl);
            localStorage.setItem('imageId',result.data.imageId);
            toast.success('you logged in successfully');
            navigate('/dashboard');
         })
         .catch(error=>{
            console.log(error);
            setIsLoading(false);
            toast.error('something is wrong ');
         })
    }  

    // const fileHandler=(e)=>{
    //     setImage(e.target.files[0])
    //     setImageUrl(URL.createObjectURL(e.target.files[0]))
    // }
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
                            <h1>Login your account</h1>
                            <input required onChange={e => setEmail(e.target.value)} type='email' placeholder="Email" />
                            <input required onChange={e => setPassword(e.target.value)} type='password' placeholder="Password" />
                            <button type="submit"> Login {isLoading&&<i class="fa-solid fa-sync fa-spin"></i>} </button>
                            <Link className="link" to='/signup'>Don't have an account</Link>

                        </form>

                    </div>
                </div>

            </div>
        </>
    );
}

export default Login;
