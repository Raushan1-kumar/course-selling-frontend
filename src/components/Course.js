import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Course = () => {
  const [listCourse, setListCourse] = useState([]);
  const navigate= useNavigate();
  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    axios.get("http://localhost:3003/course/all-courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        console.log(result.data.courses);
        setListCourse(result.data.courses); // Note the updated response key
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
    
  return (
    <>
      <div className="course-wrapper">
        {listCourse.length > 0 ? (
          listCourse.map((course) => (
            <div className="course-box" onClick={() => { navigate('/dashboard/course-detail/' + course._id) }} key={course._id}>
              <img className="course-thumbnail" src={course.thumbnail} alt="Course Thumbnail" />
              <p className="course-name">{course.courseName}</p>
              <div className="course-bottom">
                <p className="course-price">Price : {course.price} only</p>
                <p className="course-student">{course.studentCount} <i className="fa-solid fa-user"></i></p>
              </div>
            </div>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </div>
    </>
  );
}

export default Course;
