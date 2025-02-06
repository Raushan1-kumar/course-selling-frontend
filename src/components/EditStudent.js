import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditStudent() {
    const [studentDetail, setstudentDetail] = useState({});
    const [fullName, setFullName] = useState('');
    const [phone, setphone] = useState('');
    const [email, setemail] = useState('');
    const [address, setaddress] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getStudent();
    }, []);

    useEffect(() => {
        if (studentDetail) {
            setFullName(studentDetail.fullName || '');
            setphone(studentDetail.phone || '');
            setemail(studentDetail.email || '');
            setaddress(studentDetail.address || '');
        }
    }, [studentDetail]);

    const getStudent = () => {
        setLoading(true);
        axios.get(`http://localhost:3003/student/particular-student/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((result) => {
                console.log("API Response:", result.data);
                setstudentDetail(result.data.students || {});
            })
            .catch((err) => {
                console.log("Error fetching course details:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("image", image);

        axios
            .put(`http://localhost:3003/student/update-student/${params.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((result) => {
                console.log(result);
                setIsLoading(false);
                toast.success("Student detail updated successfully");
                navigate("/dashboard/all-student");
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                toast.error("Something went wrong while updating the student");
            });
    };

    const fileHandler = (e) => {
        setImage(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <>
            <form className="signup-form" onSubmit={submitHandler}>
                <h1>Update Student Detail</h1>
                <input
                    required
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    placeholder="fullName"
                    value={fullName}
                />
                <input
                    required
                    onChange={(e) => setphone(e.target.value)}
                    type="number"
                    placeholder="phone"
                    value={phone}
                />
                <input
                    required
                    onChange={(e) => setemail(e.target.value)}
                    type="email"
                    placeholder="email"
                    value={email}
                />
                <input
                    required
                    onChange={(e) => setaddress(e.target.value)}
                    type="text"
                    placeholder="Address"
                    value={address}
                />
                <input type="file" onChange={fileHandler} />
                {imageUrl && <img className="your-logo" src={imageUrl} alt="Preview" />}
                <button type="submit">
                    Update Student Detail  {isLoading && <i className="fa-solid fa-sync fa-spin"></i>}
                </button>
            </form>
        </>
    );
}

export default EditStudent;
