import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AllStudents() {
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const fetchAllStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3003/student/all-student-detail", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllStudents(response.data.students || []);
    } catch (error) {
      console.error("Error fetching student details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-student/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:3003/student/delete-student/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("Student deleted successfully!");
        fetchAllStudents(); // Refresh the list
      } catch (error) {
        console.error("Error deleting student:", error);
        toast.error("Failed to delete student.");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
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
              <th>Actions</th>
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
                <td>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(student._id)}
                    title="Edit Student"
                  >
                   <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(student._id)}
                    title="Delete Student"
                  >
                    🗑️
                  </button>
                </td>
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

export default AllStudents;
