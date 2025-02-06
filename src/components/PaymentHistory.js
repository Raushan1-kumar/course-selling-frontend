import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function PaymentHistory() {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [courseNames, setCourseNames] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      const result = await axios.get("http://localhost:3003/fee/payment-history", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const studentFeeData = result.data.studentfee;
      setPaymentHistory(studentFeeData);
      fetchCourseNames(studentFeeData);
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong. Having trouble getting payment.");
    }
  };

  const fetchCourseNames = async (studentFeeData) => {
    setLoading(true);
    const courseIds = [...new Set(studentFeeData.map((student) => student.courseId))];

    try {
      const courseNamePromises = courseIds.map(async (courseId) => {
        try {
          const response = await axios.get(
            `http://localhost:3003/course/course-detail/${courseId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          return { courseId, courseName: response.data.course.courseName || "Course not found" };
        } catch (error) {
          console.error(`Error fetching course details for courseId ${courseId}:`, error);
          return { courseId, courseName: "Error fetching course name" };
        }
      });

      const courseNameResults = await Promise.all(courseNamePromises);
      const courseNameMap = courseNameResults.reduce((acc, { courseId, courseName }) => {
        acc[courseId] = courseName;
        return acc;
      }, {});
      setCourseNames(courseNameMap);
    } catch (error) {
      console.error("Error fetching course names:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-list-wrapper">
      {paymentHistory.length > 0 ? (
        <table className="student-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Amount</th>
              <th>Course Name</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((student) => (
              <tr key={student._id} className="student-row">
                <td>{student.fullName}</td>
                <td>{student.phone}</td>
                <td>{student.amount}</td>
                <td>{courseNames[student.courseId] || "Loading..."}</td>
                <td>{student.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
}

export default PaymentHistory;
