import "./CSS/userFunction.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "./utils/notification/Notification";
import { isEmpty, isEmail, isLength } from "./utils/validation/Validation.js";
import PasswordChecklist from "react-password-checklist";

const initialState = {
  name: "",
  email: "",
  nic: "",
  mobile: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function Register() {
  const [user, setUser] = useState(initialState);

  const { name, email, nic, mobile, password, cf_password, err, success } =
    user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validations
    if (
      isEmpty(name) ||
      isEmpty(email) ||
      isEmpty(nic) ||
      isEmpty(mobile) ||
      isEmpty(password)
    )
      return setUser({
        ...user,
        err: "Please fill in all fields.",
        success: "",
      });

    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid email type.", success: "" });

    if (isLength(password))
      return setUser({
        ...user,
        err: "Password must have at least 8 characters.",
        success: "",
      });

    try {
      const res = await axios.post("/user/register", {
        name,
        email,
        nic,
        mobile,
        password,
      });

      setUser({ ...user, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="topic-container">
      <div style={{ backgroundColor: "#E09021" }}>
        <div className="t-title-container">
          <label className="sideLable1">Classy</label>
          <br></br>
          <label className="sideLable">Services. </label> <br className="br1" />
        </div>

        <div className="sublable-container">
          <label className="subLable">
            Get Demand For Your Skills.
            <br></br> Hire The Best Experts For Your Needs.
          </label>
        </div>

        <div className="sublable-container2">
          <label className="subLable2">Already a member?</label>
        </div>
        <br />
        <Link to="/login">
          <button type="submit" className="side-btn">
            Login Here
          </button>
        </Link>
      </div>
      <div style={{ backgroundColor: "white" }}>
        <h1 className="Hfontreg">Register Here</h1>
        <div className="reg-from-container">
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          <br></br>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="t-form-label">
                <label className="t-form-label2">*</label>
                Name
              </label>
              <input
                type="text"
                style={{ width: "450px" }}
                className="inp-fields"
                id="name"
                placeholder="Enter Name"
                value={name}
                name="name"
                onChange={handleChangeInput}
                required
              />
            </div>
            <div className="mb-3">
              <label className="t-form-label">
                <label className="t-form-label2">*</label>
                Email Address
              </label>
              <input
                type="email"
                style={{ width: "450px" }}
                className="inp-fields"
                id="email"
                placeholder="Enter Email"
                value={email}
                name="email"
                onChange={handleChangeInput}
                required
              />
            </div>
            <div className="mb-3">
              <label className="t-form-label">
                <label className="t-form-label2">*</label>
                NIC Number
              </label>
              <input
                type="text"
                style={{ width: "450px" }}
                className="inp-fields"
                id="nic"
                placeholder="Enter NIC Number"
                value={nic}
                name="nic"
                onChange={handleChangeInput}
                required
              />
            </div>
            <div className="mb-3">
              <label className="t-form-label">
                <label className="t-form-label2">*</label>
                Mobile Number
              </label>
              <input
                type="text"
                style={{ width: "450px" }}
                className="inp-fields"
                id="mobile"
                placeholder="Enter Mobile Number"
                value={mobile}
                name="mobile"
                onChange={handleChangeInput}
                required
              />
            </div>
            <div className="mb-3">
              <label className="t-form-label">
                <label className="t-form-label2">*</label>
                Enter Password
              </label>
              <input
                type="password"
                style={{ width: "450px" }}
                className="inp-fields"
                id="password"
                placeholder="Enter Password"
                value={password}
                name="password"
                onChange={handleChangeInput}
                required
              />
            </div>
            <div className="pwd-checklist">
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
              <p>
                Your password must contain at least one numeric value and
                <br></br>one uppercase letter with minimum 8 characters.
              </p>
            </div>
            <div className="mb-3">
              <label className="t-form-label">
                <label className="t-form-label2">*</label>
                Confirm Password
              </label>
              <input
                type="password"
                style={{ width: "450px" }}
                className="inp-fields"
                id="cf_password"
                placeholder="Confirm Password"
                value={cf_password}
                name="cf_password"
                onChange={handleChangeInput}
                required
              />
            </div>
            <label className="t-form-label3">
              All fields with * are required.
            </label>{" "}
            <br></br> <br></br>
            <button
              type="submit"
              className="btn-register"
              style={{
                width: "140px",
                fontWeight: "bold",
                borderRadius: "12px",
              }}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
