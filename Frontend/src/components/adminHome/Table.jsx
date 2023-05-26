import axios from "axios";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { BASEURL } from "../Constants/Constants";
import { useState } from "react";

function UserTable({setTotal}) {
  const [users, Setusers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    await axios.get(`${BASEURL}/Users?page=1&limit=10`).then((res) => {
      setTotal(res.data.totalusers);
      Setusers(res.data.results);
    });
  };

  return (
    <Table striped bordered hover variant="dark" className="bg-light rounded-1">
      <thead>
        <tr>
          <th>index</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0
          ? users.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.FirstName}</td>
                <td>{item.LastName}</td>
                <td>{item.Email}</td>
              </tr>
            ))
          : <tr >
          <td>0</td>
          <td>Jhon</td>
          <td>Doe</td>
          <td>JhonDoe@gmail.com</td>
        </tr>}
      </tbody>
    </Table>
  );
}

export default UserTable;
