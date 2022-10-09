import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import Sidebar from "./Sidebar";

export default function ViewService() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [fee, setFee] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceProvider, setServiceProvider] = useState("");

  const [loading, setLoading] = useState(false);

  let userEmail;

  const [_id, set_id] = useState("");

  useEffect(() => {
    set_id(localStorage.getItem("_id"));
    setTitle(localStorage.getItem("title"));
    setDescription(localStorage.getItem("description"));
    setCategory(localStorage.getItem("category"));
    setLocation(localStorage.getItem("location"));
    setFee(localStorage.getItem("fee"));
    setPhone(localStorage.getItem("phone"));

    userEmail = localStorage.getItem("userEmail");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    axios
      .get(`user/user/${userEmail}`)
      .then((res) => {
        setServiceProvider(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Sidebar />
      {loading ? (
        <div className="load">
          <BarLoader color={"#FEA82F"} loading={loading} size={30} />
        </div>
      ) : (
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
                <div>
                  <h4>
                    <b>{title}</b>
                  </h4>
                </div>
                <hr></hr>
                <div>
                  <i
                    className="fa-solid fas fa-phone-alt "
                    style={{ fontSize: "18px" }}
                  >
                    {" "}
                    {phone}
                  </i>
                </div>
                <br></br>
                <h5>
                  <b>Location :</b> {location}
                </h5>
                <br></br>

                <h5>
                  <b>Category :</b> {category}
                </h5>
                <br></br>
                <h5>
                  <b>Fee :</b> {fee}
                </h5>
                <br></br>
                <h5>
                  <b>Description :</b> {description}
                </h5>
                <br></br>
                <br></br>
                <div className="extra content ">
                  <div
                    className="card mb-3 container pb-3 shadow-lg p-3 mb-5 bg-white rounded"
                    style={{ width: "45%", height: "25%" }}
                  >
                    <div className="row g-0">
                      <div className="col-md-2 mt-2">
                        <img
                          src={serviceProvider.avatar}
                          className="rounded-circle shadow-4"
                          style={{ height: "80%", width: "80%" }}
                          alt="Avatar"
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="card-body">
                          <h5 className="card-title">
                            <b>{serviceProvider.name}</b>
                          </h5>
                        </div>
                        <div>
                          <Link
                            class="ui button"
                            to={"/viewServiceProfile"}
                            style={{
                              backgroundColor: "#FEA82F",
                              color: "black",
                              marginLeft: "8%",
                            }}
                          >
                            View Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
