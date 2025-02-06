import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DetailOfStudent() {
    const [courseName,setCourseName] = useState('');
    const [studentFee, setstudentFee] = useState([]);
    const [studentList, setStudentList] = useState({ });
    const [loading, setLoading] = useState(true);
    const params = useParams();    
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudentDetails();
    }, [params.id]);
    
    useEffect(() => {
        if (studentList.phone) {
            getStudentFeeHistory();
        }
    }, [studentList.phone]);

    useEffect(() => {
        if (studentList.courseId) {
            getCourseName();
        }
        else{
            console.log("dont have courseId");
        }
    }, [studentList.courseId]);
    
    const fetchStudentDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:3003/student/particular-student/${params.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setStudentList(response.data.students || {});
        } catch (error) {
            console.error("Error fetching course details:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const getStudentFeeHistory = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:3003/fee/student-payment/${studentList.phone}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setstudentFee(response.data.feeDetail || []);
        } catch (error) {
            console.error("Error fetching fee details:", error);
        } finally {
            setLoading(false);
        }
    };
    const getCourseName = async ()=>{
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:3003/course/course-detail/${studentList.courseId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setCourseName(response.data.course.courseName ||'course not found');
        } catch (error) {
            console.error("Error fetching course details:", error);
        } finally {
            setLoading(false);
        }
    }
    const deleteStudent = async () => {
        if (!window.confirm("Do you really want to delete students?")) {
            return;
        }

        try {
            // Delete the course
            await axios.delete(`http://localhost:3003/course/delete-student/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            navigate("/dashboard/all-student"); // Redirect to courses list
        } catch (error) {
            console.error("Error deleting  students:", error);
            alert("Failed to delete  students.");
        }
    };

    if (loading) return <p>Loading...</p>;

    return ( 
        <>
         <div className="course-main-wrapper">
            {studentList && (
                <>
                    <div className="main-content-student">
                        <div className="course-detail-wrapper ">
                            <img className="student-img" src={studentList.imageurl} alt="Course Thumbnail" />
                            <div className="course-middle-content student-detail-wrapper">
                                <h1 className="course-Name">{studentList.fullName}</h1>
                                <p>{studentList.phone}</p>
                                <p>{studentList.email}</p>
                                <p>{studentList.address}</p>
                            </div>
                            <div className="edit-div">
                                <div className="edit-delete-student">
                                    <button
                                        onClick={() => navigate(`/dashboard/edit-student/${studentList._id}`)}>
                                        Edit <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button onClick={deleteStudent}>
                                        Delete <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p>Payment History...</p>
                    <div className="student-list-wrapper">
                        {studentFee.length > 0 ? (
                            <table className="student-table">
                                <thead>
                                    <tr>
                                        <th>CourseName</th>
                                        <th>Phone</th>
                                        <th>Amount</th>
                                        <th>Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentFee.map((student) => (
                                        <tr key={student.id || student.email} className="student-row">
                                            <td>{courseName}</td>
                                            <td>{student.phone}</td>
                                            <td>{student.amount}</td>
                                            <td>{student.remark}</td>
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
        </>
     );
}

export default DetailOfStudent;