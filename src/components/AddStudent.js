import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



function AddStudent() {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [listCourse, setListCourse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [courseId,setCourseId] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        getCourses();
      }, []);
    const getCourses = () => {
        axios
            .get("http://localhost:3003/course/all-course", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((result) => {
                console.log(result.data.course);
                setListCourse(result.data.course); // Correctly updating the state
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(fullName, phone, email, image);
        // here we are using post method because we have to send the data to the backend
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('address',address);
        formData.append('image', image);
        formData.append('courseId',courseId);
        axios.post('http://localhost:3003/student/add-student', formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(result => {
                console.log(result);
                setIsLoading(false);
                toast.success('new student added  successfully');
                navigate('/dashboard/all-student');
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                toast.error('something is wrong . Having trouble in adding new student');
            })
    }
    const fileHandler = (e) => {
        setImage(e.target.files[0])
        setImageUrl(URL.createObjectURL(e.target.files[0]))
    }
    return (
        <>
            <form className="signup-form" onSubmit={submitHandler}>
                <h1>Add New Student</h1>
                <input required onChange={e => setFullName(e.target.value)} type='text' placeholder="Student Name" />
                <input required onChange={e => setPhone(e.target.value)} type='text' placeholder="Phone" />
                <input required onChange={e => setEmail(e.target.value)} type='email' placeholder="Email" />
                <input required onChange={e => setAddress(e.target.value)} type='text' placeholder="Address" />
                <select className="select-course" onChange={e => setCourseId(e.target.value)}>
                    <option>select course</option>
                    {listCourse.map((course) => (
                       <option value={course._id}>{course.courseName}</option>
                    ))}
                </select>
                <input required type="file" onChange={fileHandler} />
                {imageUrl && <img className="your-logo" src={imageUrl} alt="mylogo" />}
                <button type="submit">Add Student {isLoading && <i class="fa-solid fa-sync fa-spin"></i>}</button>
                {/* <Link className="link" to='/login'>already have an account</Link> */}

            </form>
        </>
    );
}

export default AddStudent;