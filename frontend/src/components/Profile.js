import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLength, isMatch } from "./utils/validation/Validation";
import { showSuccessMsg, showErrMsg } from "./utils/notification/Notification";
import "./CSS/profile.css";
import PasswordChecklist from "react-password-checklist";

const initialState = {
  name: "",
  email: "",
  mobile: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};
export default function Profile() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const { user } = auth;
  const [data, setData] = useState(initialState);
  const { name, password, cf_password, about, err, success } = data;

  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <h3>Loading.....</h3>}
      </div>
      <img
        className="profimage"
        src="https://res.cloudinary.com/dl99x/image/upload/v1662162175/Sample_User_Icon_urnlt1.png"
      ></img>
      <h2 className="profhead">Edit Profile.</h2>

      <div className="profile_page">
        <div className="col-left">
          <div className="avatar">
            <img src={avatar ? avatar : user.avatar} alt="" />
            <span>
              <i className="fas fa-camera"></i>
              <p>Change </p>
              <input type="file" name="file" id="file_up" />
            </span>
          </div>
          <div className="profhead2">
            {" "}
            <p>Change Picture</p>
          </div>
          <br></br>
          <div className="col-md-13 mb-3 font" style={{ display: "flex" }}>
            <label htmlFor="name">
              <label style={{ color: "red" }}>*</label>
              Name : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              defaultValue={user.name}
              placeholder="Your name"
            />
          </div>
          <div className="col-md-13 mb-3 font" style={{ display: "flex" }}>
            <label htmlFor="email">
              <label style={{ color: "red" }}>*</label>
              Email : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              defaultValue={user.email}
              placeholder="Your email address"
              disabled
            />
          </div>
          <div className="col-md-13 mb-3 font" style={{ display: "flex" }}>
            <label htmlFor="mobile">
              <label style={{ color: "red" }}>*</label>
              Mobile Number:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              placeholder="Mobile Number"
              defaultValue={user.mobile}
            />
          </div>
          <button className="delbtn">Delete Account</button>
          <div className="col-md-13 mb-3 font" style={{ display: "flex" }}>
            <label htmlFor="password">
              Create New Password : &nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Your password"
              value={password}
            />
          </div>
          <div className="pwd-checklist-profile">
            <PasswordChecklist
              rules={["minLength", "number", "capital"]}
              minLength={8}
              value={password}
              messages={{
                minLength: "At least 8 characters.",
                number: "Minimum One Numeric Value.",
                capital: "Minimum One Uppercase Letter.",
              }}
            />
            <br></br>
          </div>
          <div className="col-md-13 mb-3 font" style={{ display: "flex" }}>
            <label htmlFor="cf_password">
              Confirm Password :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="password"
              className="form-control"
              id="cf_password"
              placeholder="Confirm password"
              value={cf_password}
            />
          </div>
          <div>
            <em
              style={{
                color: "red",
                fontFamily: "sans-serif",
                fontStyle: "italic",
              }}
            >
              All fields with * are required.
            </em>
          </div>
          <center>
            {" "}
            <button className="savebtn" disabled={loading}>
              Save & Update
            </button>{" "}
          </center>
          <br /> <br />
        </div>
      </div>
      <br></br>
    </div>
  );
}
