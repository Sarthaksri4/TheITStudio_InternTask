import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    phonenumber: "",
    hobbies: "",
  });
  useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get(
        `https://cruds-app.onrender.com/api/v1/users/single/${id}`
      );
      setInput(res.data);
    };
    getAllData();
  }, [id]);

  const handleEditData = async (e) => {
    e.preventDefault();
    await axios.put(`https://cruds-app.onrender.com/api/v1/users/${id}`, input);
    navigate("/");
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 ">
            <div style={{ backgroundColor: "#00003B" }}>
              <h1 className="text-white text-center mt-2">Update</h1>
            </div>
          </div>
          <div className="col-md-12">
            <form onSubmit={handleEditData}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
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
                <label for="exampleInputPassword1" class="form-label">
                  Hobbies
                </label>
                <input
                  name="Hobbies"
                  value={input.hobbies}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>

              <button type="submit" class="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
        <button onClick={() => navigate("/")} className="btn btn-info mt-2">
          Go To Home
        </button>
      </div>
    </>
  );
};

export default Edit;
