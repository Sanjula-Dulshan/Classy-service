import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import ReactStars from "react-rating-stars-component";
import RiseLoader from "react-spinners/RiseLoader";

export default function ViewProfile() {
  let flag = false;
  let serviceProviderEmail;

  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userFeedback, setUserFeedback] = useState([]);
  const [serviceProvider, setServiceProvider] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  serviceProviderEmail = localStorage.getItem("serviceProviderEmail");
  console.log("serviceProviderEmail: ", serviceProviderEmail);
  useEffect(() => {
    setTitle(localStorage.getItem("title"));
    setPhone(localStorage.getItem("phone"));
    setImage(localStorage.getItem("image"));
    setServiceProvider(localStorage.getItem("serviceProvider"));
    setAvatar(localStorage.getItem("avatar"));
    setName(localStorage.getItem("name"));

    const fetchData = async () => {
      if (flag == false) {
        axios.get(`/orders/feedback/${serviceProviderEmail}`).then((res) => {
          setUserFeedback(res.data);
          console.log("res.data:  ", res.data);

          flag = true;
        });
      }
    };
    fetchData();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (userFeedback != undefined) {
    return (
      <div>
        <div>
          <Sidebar />
          {loading ? (
            <div className="load">
              <RiseLoader color={"#FEA82F"} loading={loading} size={30} />
            </div>
          ) : (
            <div>
              <div className="container ">
                <div className="mt-5 ">
                  <Link to="/viewService">
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
                            src={avatar}
                            className="left floated ui image"
                            style={{ height: "50%", width: "50%" }}
                            alt="avatar"
                          />
                        </div>

                        <div>
                          <h4>{name}</h4>
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
                      <h4 className="ml-3">
                        <b>Ratings & Reviews :</b>
                      </h4>
                      {console.log("userfeedback", userFeedback)}
                      {userFeedback.length != 0 ? (
                        <div>
                          {userFeedback?.map((data, index) => (
                            <div className="extra content mt-4" key={index}>
                              {console.log("104 data", data)}

                              <div
                                className="card mb-3 container ml-3 pb-3 mr-3"
                                style={{ width: "90%", height: "25%" }}
                              >
                                {data.feedback?.map((feedback, index) => (
                                  <div>
                                    {console.log("114 data", feedback.rating)}
                                    <div className="row g-0" key={index}>
                                      <div className="col-md-4">
                                        <div className="card-body">
                                          <h5>
                                            <b>
                                              {data.firstName +
                                                " " +
                                                data.lastName}
                                            </b>
                                          </h5>
                                          <h4 className="card-title">
                                            {" "}
                                            <ReactStars
                                              {...{
                                                size: 20,
                                                value: feedback.rating,

                                                edit: false,
                                              }}
                                            />
                                            {console.log(
                                              "data.rating",
                                              feedback.rating
                                            )}
                                            <h5 className="card-title">
                                              {feedback.comment}
                                            </h5>
                                          </h4>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="container mt-4">
                          <h5>No Reviews Yet</h5>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
