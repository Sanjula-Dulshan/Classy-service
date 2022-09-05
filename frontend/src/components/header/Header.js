import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  const auth = useSelector((state) => state.auth);

  const { user, isLogged, isWorker, iscustomer } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      localStorage.clear();
      window.location.href = "/login";
    } catch (err) {
      window.location.href = "/login";
    }
  };

  const userLink = () => {
    return (
      <li className="drop-nav">
        <Link to="/profile" className="avatar">
          <img src={user.avatar} alt="" />{" "}
          <li>
            <Link className="header-al" to="/login" onClick={handleLogout}>
              Logout
            </Link>
          </li>
          <i className="fas fa-angle-down"></i>
        </Link>
      </li>
    );
  };

  const transForm = {
    transform: isLogged ? "translateY(10px)" : 0,
  };

  return (
    <header>
      <div className="logo-head">
        <h1 className="logo-name">
          <Link to="/">&nbsp;&nbsp; Classy Services</Link>
        </h1>

        <ul style={transForm}>
          <li>
            <Link className="header-al" to="/">
              {" "}
              Home
            </Link>
          </li>

          <li>
            {iscustomer ? (
              <Link className="header-al" to="/wishlist">
                {" "}
                My Wishlist
              </Link>
            ) : (
              ""
            )}
          </li>
          <li>
            {isWorker ? (
              <Link className="header-al" to="/userServices">
                {" "}
                My Services
              </Link>
            ) : (
              ""
            )}
          </li>
          <li>
            {isWorker ? (
              <Link className="header-al" to="/addService">
                {" "}
                Create Services
              </Link>
            ) : (
              ""
            )}
          </li>
          <li>
            <Link className="header-al" to="#">
              {" "}
              About
            </Link>
          </li>
          <li>
            <Link className="header-al" to="#">
              {" "}
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <ul style={transForm}>
        {isLogged ? (
          userLink()
        ) : (
          <li>
            <Link className="header-al" to="/register">
              <i className="fas fa-user"></i> Sign up
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}
