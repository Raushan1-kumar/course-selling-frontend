import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Payment() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listCourse, setListCourse] = useState([]);
  const [courseId, setCourseId] = useState("");
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

  const handleCourseChange = (e) => {
    const selectedCourseId = e.target.value;
    setCourseId(selectedCourseId);

    // Find the selected course and set its price in the amount field
    const selectedCourse = listCourse.find((course) => course._id === selectedCourseId);
    if (selectedCourse) {
      setAmount(selectedCourse.price); // Assuming `price` is the key for the course price in your backend
    } else {
      setAmount(""); // Reset if no valid course is selected
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(fullName, phone, amount, remark);
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("phone", phone);
    formData.append("amount", amount);
    formData.append("remark", remark);
    formData.append("courseId", courseId);

    axios
      .post("http://localhost:3003/fee/add-fee", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        console.log(result);
        setIsLoading(false);
        toast.success("Fee done successfully");
        navigate("/dashboard/courses");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast.error("Something went wrong. Having trouble in getting payment.");
      });
  };

  return (
    <>
      <form className="signup-form" onSubmit={submitHandler}>
        <h1>Make a Payment</h1>
        <input
          required
          onChange={(e) => setFullName(e.target.value)}
          type="text"
          placeholder="Student Name"
        />
        <input
          required
          onChange={(e) => setPhone(e.target.value)}
          type="text"
          placeholder="Phone"
        />
        <select className="select-course" onChange={handleCourseChange}>
          <option value="">Select course</option>
          {listCourse.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseName}
            </option>
          ))}
        </select>
        <input
          required
          type="text"
          placeholder="Amount"
          value={amount}
          readOnly // Make the input read-only to prevent manual edits
        />
        <input
          required
          onChange={(e) => setRemark(e.target.value)}
          type="text"
          placeholder="Remark"
        />
        <button type="submit">
          Pay {isLoading && <i className="fa-solid fa-sync fa-spin"></i>}
        </button>
      </form>
    </>
  );
}



export default Payment;