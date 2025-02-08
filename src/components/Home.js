import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const uId = localStorage.getItem("uId");
  const [studentCount, setStudentCount] = useState(null);
  const [courseCount, setCourseCount] = useState(null);
  const [totalEarnings, setTotalEarnings] = useState(null);
  const [allStudents, setAllStudents] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getStudentNumber();
    getCourseNumber();
    totalPayment();
    recentStudent();
  }, [uId]);

  const getStudentNumber = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3003/student/student-count/${uId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setStudentCount(response.data.data);
    } catch (error) {
      console.error("Error fetching student count:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCourseNumber = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3003/course/course-count/${uId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCourseCount(response.data.data);
    } catch (error) {
      console.error("Error fetching course count:", error);
    } finally {
      setLoading(false);
    }
  };
  

    const totalPayment = async()=>{
      try{
        const response = await axios.get('http://localhost:3003/fee/total-amount',{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
        console.log(response);
        setTotalEarnings(response.data.totalAmount)
      }catch(err){
        console.log(err)
      }
  
    }

    const recentStudent = async()=>{
      try{
        const response = await axios.get('http://localhost:3003/student/recent-students',{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
        console.log(response);
        setAllStudents(response.data.students);
      }catch(err){
        console.log(err);
      }
    }

  return (
    <div className="home-main-box">
      <div className="upper-box">
        <div
          className="courses-box"
          onClick={() => {
            navigate("/dashboard/courses");
          }}
        >
          <h1>Courses</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : courseCount !== null ? (
            <h1>{courseCount.count || courseCount}</h1>
          ) : (
            <p>No data available</p>
          )}
        </div>
        <div
          className="student-box"
          onClick={() => {
            navigate("/dashboard/all-student");
          }}
        >
          <h1>Students</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : studentCount !== null ? (
            <h1>{studentCount.count || studentCount}</h1>
          ) : (
            <p>No data available</p>
          )}
        </div>
        <div
          className="payment-box"
          onClick={() => {
            navigate("/dashboard/payment-history");
          }}
        >
          <h1>Total Earning</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : totalEarnings !== null ? (
            <h1>{totalEarnings}</h1>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
      <div className="down-box">
        <div className="student-detail-box">
          <h3>Recent Students</h3>
        <div className="student-list-wrapper">
      {allStudents.length > 0 ? (
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
            {allStudents.map((student) => (
              <tr key={student.id || student.email} className="student-row"  onClick={() => { navigate('/dashboard/student-detail/'+student._id) }}>
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
                  {new Date(student.dateOfJoining).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students found.</p>
      )}
    </div>



        </div>
      </div>
    </div>
  );
}

export default Home;
