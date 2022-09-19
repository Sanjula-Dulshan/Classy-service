import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function ViewProfile() {
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [_id, set_id] = useState("");
  const [serviceProvider, setServiceProvider] = useState("");

  let userEmail;

  useEffect(() => {
    set_id(localStorage.getItem("_id"));
    setTitle(localStorage.getItem("title"));
    setPhone(localStorage.getItem("phone"));

    userEmail = localStorage.getItem("userEmail");

    axios
      .get(`user/user/${userEmail}`)
      .then((res) => {
        console.log(res.data);
        setServiceProvider(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="container ">
        <div className="mt-5 ">
          <Link to="/">
            <i
              class="fas fa-arrow-circle-left"
              style={{
                fontSize: "22px",
                marginLeft: "15%",
                color: "#FEA82F",
              }}
            >
              Back
            </i>
          </Link>

          <div className="container" style={{ width: "90%" }}>
            <form
              className="container mt-5 pb-4 shadow-lg p-3 mb-5 bg-white rounded"
              style={{ backgroundColor: "#FBFDF3", marginLeft: "15%" }}
            >
              <div class="content">
                <div className="col-md-2 mt-2">
                  <img
                    src={serviceProvider.avatar}
                    className="left floated ui image"
                    style={{ height: "50%", width: "50%" }}
                    alt="Avatar"
                  />
                </div>

                <div>
                  <h4>{title}</h4>
                </div>
              </div>

              <br></br>

              <br></br>
              <div className="mt-4 ml-3">
                <i
                  className="fa-solid fas fa-phone-alt "
                  style={{ fontSize: "18px" }}
                >
                  {" "}
                  {phone}
                </i>
              </div>

              <br></br>
              <h5 className="ml-3">
                <b>Ratings & Reviews :</b>
              </h5>
              <div className="extra content mt-4">
                <div
                  className="card mb-3 container ml-3 pb-3 mr-3"
                  style={{ width: "90%", height: "25%" }}
                >
                  <div className="row g-0">
                    <div className="col-md-2 mt-2">
                      <img
                        className="rounded-circle shadow-4"
                        style={{ height: "80%", width: "80%" }}
                        alt="Avatar"
                      />
                    </div>
                    <div className="col-md-4">
                      <div className="card-body">
                        <h5 className="card-title">dddd</h5>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">dddd</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
