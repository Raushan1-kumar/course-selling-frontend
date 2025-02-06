import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const uId = localStorage.getItem("uId");
  const [studentCount, setStudentCount] = useState(null);
  const [courseCount, setCourseCount] = useState(null);
  const [totalEarnings, setTotalEarnings] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getStudentNumber();
    getCourseNumber();
    // getTotalEarnings();
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

  // const getTotalEarnings = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`http://localhost:3003/fee/payment-history`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     console.log(response.data);
  //     setTotalEarnings(response.data.studentfee); // Adjust based on API response
  //   } catch (error) {
  //     console.error("Error fetching total earnings:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const totalEarning= totalEarnings.reduce((sum, fee) => sum + (fee.amount || 0), 0);

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
        </div>
      </div>
      <div className="down-box">
        <div className="student-detail-box">Student history</div>
        <div className="payment-history-box">Payment history</div>
      </div>
    </div>
  );
}

export default Home;
