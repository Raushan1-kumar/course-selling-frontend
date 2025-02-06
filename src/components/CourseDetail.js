import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CourseDetail() {
    const [courseDetail, setCourseDetail] = useState({});
    const [studentList, setStudentList] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();    
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourseDetails();
    }, [params.id]);
    const fetchCourseDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:3003/course/course-detail/${params.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setCourseDetail(response.data.course || {});
            setStudentList(response.data.students || []);
        } catch (error) {
            console.error("Error fetching course details:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteCourse = async () => {
        if (!window.confirm("Do you really want to delete this course and its students?")) {
            return;
        }

        try {
            // Delete the course
            await axios.delete(`http://localhost:3003/course/delete-course/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // Delete all students enrolled in the course
            await axios.delete(
                `http://localhost:3003/student/delete-course-student/${params.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            alert("Course and enrolled students deleted successfully.");
            navigate("/dashboard/courses"); // Redirect to courses list
        } catch (error) {
            console.error("Error deleting course or students:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="course-main-wrapper">
            {courseDetail && (
                <>
                    <div className="course-main-content">
                        <div className="course-detail-wrapper">
                            <img className="course-img" src={courseDetail.thumbnail} alt="Course Thumbnail" />
                            <div className="course-middle-content">
                                <h1 className="course-Name">{courseDetail.courseName}</h1>
                                <p>Price: {courseDetail.price}</p>
                                <p>Starting Date: {courseDetail.startingDate}</p>
                                <p>End Date: {courseDetail.endingDate}</p>
                            </div>
                            <div>
                                <div className="edit-delete">
                                    <button
                                        onClick={() => navigate(`/dashboard/edit-course/${courseDetail._id}`)}
                                    >
                                        Edit <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button onClick={deleteCourse}>
                                        Delete <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                                <div className="description-detail">
                                    <h3 className="description-name">Course Description</h3>
                                    <div className="course-description-container">
                                        <p>{courseDetail.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="student-list-wrapper">
                        {studentList.length > 0 ? (
                            <table className="student-table">
                                <thead>
                                    <tr>
                                        <th>Student's Pic</th>
                                        <th>Full Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Date of Joining</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentList.map((student) => (
                                        <tr key={student.id || student.email} className="student-row" onClick={() => { navigate('/dashboard/student-detail/'+student._id) }}>
                                            <td>
                                                <img
                                                    alt="student-profile"
                                                    src={student.imageurl || "default-avatar.png"}
                                                    className="student-image"
                                                />
                                            </td>
                                            <td>{student.fullName}</td>
                                            <td>{student.phone}</td>
                                            <td>{student.email}</td>
                                            <td>
                                                {new Date(student.dateOfJoining).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    }
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No students found.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default CourseDetail;
