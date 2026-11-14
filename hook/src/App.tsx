import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";

interface User {
  id: number ;
  name: string;
  email: string;
}

const API = "https://6a2d4abf2edd4cb330d0fb42.mockapi.io/user";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  async function getUsers() {
    try {
      let { data } = await axios.get(API);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }


  async function addUser(values: { name: string; email: string }, resetForm: () => void) {
    try {
      await axios.post(API, values);
      resetForm();
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUser(id: number | string) {
    try {
      await axios.delete(`${API}/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: ""
    },
    onSubmit: (values, { resetForm }) => {
      addUser(values, resetForm);
    }
  });

  return (
    <div>
      <h2>Add User</h2>

      <form onSubmit={formik.handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <button type="submit">Add</button>
      </form>

      <h2>Users</h2>

      {users.map((user) => (
        <div key={user.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;

