import axios from "axios";
import { useEffect, useState } from "react";
import "./studentt.css"; // Import the CSS file for styling

function Student() {
  const [studentid, setId] = useState("");
  const [studentname, setName] = useState("");
  const [studentaddress, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [students, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get(
      "http://localhost:8089/api/v1/student/getAll"
    );
    setUsers(result.data);
    console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8089/api/v1/student/save", {
        studentname: studentname,
        studentaddress: studentaddress,
        mobile: mobile,
      });
      alert("Student Registration Successful");
      setId("");
      setName("");
      setAddress("");
      setMobile("");
      Load();
    } catch (err) {
      alert("Student Registration Failed");
    }
  }

  async function editStudent(students) {
    setName(students.studentname);
    setAddress(students.studentaddress);
    setMobile(students.mobile);
    setId(students._id);
  }

  async function DeleteStudent(studentid) {
    await axios.delete(
      "http://localhost:8089/api/v1/student/delete/" + studentid
    );
    alert("Student Deleted Successfully");
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put(
        "http://localhost:8089/api/v1/student/edit/" + studentid,
        {
          studentname: studentname,
          studentaddress: studentaddress,
          mobile: mobile,
        }
      );
      alert("Registration Updated");
      setId("");
      setName("");
      setAddress("");
      setMobile("");
      Load();
    } catch (err) {
      alert("Student Update Failed");
    }
  }

  return (
    <div className="student-container">
      <div className="overlay">
        <div className="container mt-5">
          <h1 className="text-center mb-4 text-white">
            Student Management System
          </h1>
          <div className="card shadow">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Student Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="studentname"
                    value={studentname}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Student Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="studentaddress"
                    value={studentaddress}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Mobile</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary" onClick={save}>
                    Register
                  </button>
                  <button className="btn btn-warning" onClick={update}>
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
          <br />
          <div className="card shadow">
            <div className="card-body">
              <table className="table table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Student Name</th>
                    <th scope="col">Student Address</th>
                    <th scope="col">Student Mobile</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td>{student.studentname}</td>
                      <td>{student.studentaddress}</td>
                      <td>{student.mobile}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm mr-2"
                          onClick={() => editStudent(student)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => DeleteStudent(student._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
