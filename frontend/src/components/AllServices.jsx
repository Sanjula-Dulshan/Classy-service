import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./allServices.css";
import RiseLoader from "react-spinners/RiseLoader";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { Store } from "react-notifications-component";

export default function AllServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    axios
      .get("/services/")

      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const wishlistHandler = (data) => {
    axios.post("/wishlist/", data).then((res) => {
      Store.addNotification({
        title: "Service Added to Wishlist",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        type: "success",
        insert: "top",
        container: "top-right",

        dismiss: {
          duration: 2500,
          onScreen: true,
          showIcon: true,
        },

        width: 400,
      });
      console.log(res);
    });
  };

  const setData = (data) => {
    let { title, description, category, location, fee, phone, userEmail } =
      data;
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
    localStorage.setItem("category", category);
    localStorage.setItem("location", location);
    localStorage.setItem("fee", fee);
    localStorage.setItem("phone", phone);
    localStorage.setItem("userEmail", userEmail);

    console.log(data);
  };

  return (
    <div>
      <Sidebar />
      {loading ? (
        <div className="load">
          <RiseLoader color={"#FEA82F"} loading={loading} size={30} />
        </div>
      ) : (
        <div
          class="ui cards mt-5 all_services container"
          style={{ marginLeft: "10%", marginBottom: "30px" }}
        >
          {services.map((data, index) => (
            <div
              class="card"
              key={index}
              style={{ backgroundColor: "#FBFDF3" }}
            >
              <div class="content">
                <div className="heart">
                  <a href="#" onClick={() => wishlistHandler(data)}>
                    <i
                      class="heart icon right floated"
                      data-tip="Add to Wishlist"
                    />
                  </a>
                </div>

                <img
                  class="left floated ui image"
                  style={{ height: "60px", width: "70px" }}
                  src={data.image.url}
                  alt=""
                />

                <div class="header">
                  <b>{data.title}</b>
                </div>
                <div class="meta">{data.location}</div>
                <i class="bi bi-telephone ">{data.phone}</i>
              </div>
              <div class="extra content">
                <div class="ui two buttons" style={{ marginLeft: "10%" }}>
                  <tr>
                    <td>
                      <Link
                        class="ui button"
                        to={"/addBank"}
                        data-tip="Click to Buy service"
                        style={{ backgroundColor: "#FEA82F", color: "black" }}
                      >
                        Buy
                      </Link>
                    </td>
                    <td>
                      <Link
                        class="ui button"
                        to={"/viewService"}
                        data-tip="Click to view Service Details"
                        style={{
                          marginLeft: "50px",
                          backgroundColor: "#423E3B",
                          color: "white",
                        }}
                        onClick={() => setData(data)}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                </div>
              </div>
            </div>
          ))}
          <ReactTooltip />
        </div>
      )}
    </div>
  );
}
