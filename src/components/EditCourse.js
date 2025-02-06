import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditCourse() {
    const [courseDetail, setCourseDetail] = useState({});
    const [courseName, setCourseName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [startingDate, setStartingDate] = useState('');
    const [endingDate, setEndingDate] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getCourses();
    }, []);

    useEffect(() => {
        if (courseDetail) {
            setCourseName(courseDetail.courseName || '');
            setPrice(courseDetail.price || '');
            setDescription(courseDetail.description || '');
            setStartingDate(courseDetail.startingDate || '');
            setEndingDate(courseDetail.endingDate || '');
        }
    }, [courseDetail]);

    const getCourses = () => {
        setLoading(true);
        axios
            .get(`http://localhost:3003/course/course-detail/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((result) => {
                console.log("API Response:", result.data);
                setCourseDetail(result.data.course || {});
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
        formData.append("courseName", courseName);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("startingDate", startingDate);
        formData.append("endingDate", endingDate);
        formData.append("image", image);

        axios.put(`http://localhost:3003/course/update-course/${params.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((result) => {
                console.log(result);
                setIsLoading(false);
                toast.success("Course updated successfully");
                navigate("/dashboard/courses");
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                toast.error("Something went wrong while updating the course");
            });
    };

    const fileHandler = (e) => {
        setImage(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <>
            <form className="signup-form" onSubmit={submitHandler}>
                <h1>Update Course Detail</h1>
                <input
                    required
                    onChange={(e) => setCourseName(e.target.value)}
                    type="text"
                    placeholder="Course Name"
                    value={courseName}
                />
                <input
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    placeholder="Price"
                    value={price}
                />
                <input
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    placeholder="Description"
                    value={description}
                />
                <input
                    required
                    onChange={(e) => setStartingDate(e.target.value)}
                    type="text"
                    placeholder="Starting Date"
                    value={startingDate}
                />
                <input
                    required
                    onChange={(e) => setEndingDate(e.target.value)}
                    type="text"
                    placeholder="Ending Date"
                    value={endingDate}
                />
                <input  type="file" onChange={fileHandler} />
                {imageUrl && <img className="your-logo" src={imageUrl} alt="Preview" />}
                <button type="submit">
                    Update Course {isLoading && <i className="fa-solid fa-sync fa-spin"></i>}
                </button>
            </form>
        </>
    );
}

export default EditCourse;
