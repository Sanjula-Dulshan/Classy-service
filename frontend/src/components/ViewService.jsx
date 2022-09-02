import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

export default function ViewService() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [fee, setFee] = useState("");
  const [phone, setPhone] = useState("");
  const history = useHistory();

  const [_id, set_id] = useState("");

  useEffect(() => {
    set_id(localStorage.getItem("_id"));
    setTitle(localStorage.getItem("title"));
    setDescription(localStorage.getItem("description"));
    setCategory(localStorage.getItem("category"));
    setLocation(localStorage.getItem("location"));
    setFee(localStorage.getItem("fee"));
    setPhone(localStorage.getItem("phone"));
  }, []);

  const [profile, setProfile] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8070/services/" + _id)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(profile);

  return (
    <div>
      <div className="mt-5 ">
        <a href="" onClick={() => history.push("/")}>
          <i
            class="fas fa-arrow-circle-left"
            style={{ fontSize: "22px", marginLeft: "15%", color: "#FEA82F" }}
          >
            Back
          </i>
        </a>
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
            {profile.map((data, index) => (
              <div
                key={index}
                className="card mb-3 container pb-3 shadow-lg p-3 mb-5 bg-white rounded"
                style={{ width: "45%", height: "25%" }}
              >
                <div className="row g-0">
                  <div className="col-md-2 mt-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                      className="rounded-circle shadow-4"
                      style={{ height: "80%", width: "80%" }}
                      alt="Avatar"
                    />
                  </div>
                  <div className="col-md-4">
                    <div className="card-body">
                      <h5 className="card-title">
                        <b>{data._id}</b>
                      </h5>
                    </div>
                    <div
                      class="ui button"
                      style={{
                        backgroundColor: "#FEA82F",
                        color: "black",
                        marginLeft: "8%",
                      }}
                    >
                      View Profile
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
