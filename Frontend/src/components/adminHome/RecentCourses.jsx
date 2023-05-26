import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { BASEURL } from "../Constants/Constants";
import axios from "axios";
import { useState } from "react";

function RecentCourses({ setTotal }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async (req, res) => {
    await axios.get(`${BASEURL}/Allcourse?limit=5`).then((res) => {
      console.log(res, "courses");

      setCourses(res.data.response);
    });
  };

  return (
    <Table striped bordered hover variant="dark" className="bg-light rounded-1">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Modules</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {courses.length > 0
          ? courses.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.Title}</td>
                <td>{item.Lessons.length + 1}</td>
                <td>{item.Author}</td>
              </tr>
            ))
          : ""}
      </tbody>
    </Table>
  );
}

export default RecentCourses;
