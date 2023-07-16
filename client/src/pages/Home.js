import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Home = () => {
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    phonenumber: "",
    hobbies: "",
  });
  useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get("https://cruds-app.onrender.com/api/v1/users");
      setUsers(res.data);
    };
    getAllData();
  }, [render]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://cruds-app.onrender.com/api/v1/users", input);
    setRender(true);
    setInput({
        name: "",
        email: "",
        phonenumber: "",
        hobbies: "",
    });
  };

  const handelDelete = async (id) => {
    await axios.delete(`https://cruds-app.onrender.com/api/v1/users/${id}`);
    const newUsers = users.filter((item) => {
      return item._id !== id;
    });
    setUsers(newUsers);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-20 ">
            <div style={{ backgroundColor: "#00003B" }}>
              <h1 className="text-white text-center mt-2">CRUDSimplified</h1>
              <h3 className="text-white text-center mt-2">Your Trusted Source for Data Control</h3>
              
            </div>
          </div>
          <div className="col-md-30" >
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Name
                </label>
                <input
                  name="name"
                  value={input.name}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Email
                </label>
                <input
                  name="email"
                  value={input.email}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  type="email"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Phone Number
                </label>
                <input
                  value={input.phonenumber}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  name="phonenumber"
                  type="number"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Hobbies
                </label>
                <input
                  name="hobbies"
                  value={input.hobbies}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>

              <button type="submit" class="btn btn-primary">
                Save
              </button>
            </form>
          </div>
          <div className="col-md-12">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">PhoneNUmber</th>
                  <th scope="col">Email</th>
                  <th scope="col">Hobbies</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => {
                    return (
                      <tr key={user._id}>
                       <td>{user.name}</td>
                        <td>{user.phonenumber}</td>
                        <td>{user.email}</td>
                        <td>{user.hobbies}</td>
                        <td>
                          <Link to={`/edit/${user._id}`}>
                            <button className="btn btn-primary">Update</button>
                          </Link>
                        </td>
                        <td>
                          <button
                            onClick={() => handelDelete(user._id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
