import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./allServices.css";
import RiseLoader from "react-spinners/RiseLoader";
import Sidebar from "./Sidebar";
import { Link, useParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { Store } from "react-notifications-component";
import { useSelector } from "react-redux";

export default function AllServices() {
  const auth = useSelector((state) => state.auth);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterEmpty, setFilterEmpty] = useState(false);
  const param = useParams();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    axios
      .get("/services/")

      .then((res) => {
        setServices(res.data);
        console.log("30", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param]);

  useEffect(() => {
    console.log("param.category: ", param.category);

    if (param.category) {
      const getServices = async () => {
        const res = await axios.get(`/services/filter/${param.category}`);
        setServices(res.data);
        if (res.data.length === 0) {
          setFilterEmpty(true);
        } else {
          setFilterEmpty(false);
        }
        console.log("27 ", res);
      };
      getServices();
    }
  }, [param]);

  const filterData = (data,searchKey) => {
    const result = data.filter((item) =>
    
      item.title.toLowerCase().includes(searchKey) || 
      item.category.toLowerCase().includes(searchKey) ||
      item.title.toUpperCase().includes(searchKey) ||
      item.category.toUpperCase().includes(searchKey)

    );

    
    setServices(result);
  };

  function handleSearch(e) {
    const searchKey = e.target.value;

    axios.get("/services/").then((res) => {
      filterData(res.data, searchKey);
    });

  }

  

  const wishlistHandler = (data) => {
    const { email } = auth.user;
    console.log("34", data);
    axios.post(`/wishlist/${email}`, data).then((res) => {
      Store.addNotification({
        title: "Service Added to Wishlist",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        type: "success",
        insert: "top",
        container: "top-right",

        dismiss: {
          duration: 2000,
          onScreen: true,
          showIcon: true,
        },

        width: 400,
      });
      console.log(res);
    });
  };

  const setData = (data) => {
    let {
      title,
      description,
      category,
      location,
      fee,
      phone,
      userEmail,
      serviceProviderEmail,
      image,
    } = data;
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
    localStorage.setItem("category", category);
    localStorage.setItem("location", location);
    localStorage.setItem("fee", fee);
    localStorage.setItem("phone", phone);
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("serviceProviderEmail", serviceProviderEmail);
    localStorage.setItem("image", image);

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
        <div style={{ marginLeft: "250px" }}>
          {filterEmpty ? (
            <div className="d-flex align-items-center justify-content-center vh-100">
              <div className="text-center">
                <p className="fs-3">
                  {" "}
                  <span className="text-danger">Opps!</span> Services not found.
                </p>
                <p className="lead">
                  The services you’re looking for doesn’t exist.
                </p>
              </div>
            </div>
          ) : (
            <div
              className="ui cards mt-5  container"
              style={{ marginLeft: "10%", marginBottom: "30px", zIndex: "3" }}
            >
              
               <div className="search">
                
                  <input
                    className="form-control "
                    type="search"
                    placeholder="search"
                    name="search"
                    onChange={handleSearch}

                  />
                    
                </div>
                
              {services.map((data, index) => (
                <div
                  className="card mt-5"
                  
                  key={index}
                  style={{ backgroundColor: "#FBFDF3" }}
                >
                  <div className="content">
                    <div className="heart">
                      <a href="/allServices" onClick={() => wishlistHandler(data)}>
                        <i
                          className="heart icon right floated"
                          
                          data-tip="Add to Wishlist"
                        />
                      </a>
                      <ReactTooltip globalEventOff="click" />
                    </div>

                    <img
                      className="left floated ui image"
                      style={{ height: "60px", width: "70px" }}
                      src={data.image.url}
                      alt=""
                    />

                    <div className="header">
                      <b>{data.title}</b>
                    </div>
                    <div className="meta">{data.location}</div>
                    <i className="bi bi-telephone ">{data.phone}</i>
                  </div>
                  <div className="extra content">
                    <div
                      className="ui two buttons"
                      style={{ marginLeft: "10%" }}
                    >
                      <tr>
                        <td>
                          <Link
                            className="ui button"
                            to={"/addBank"}
                            data-tip="Click to Buy service"
                            style={{
                              backgroundColor: "#FEA82F",
                              color: "black",
                            }}
                          >
                            Buy
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="ui button"
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
           
            </div>
          )}
        </div>
      )}
    </div>
  );
}
