import React, { useState} from "react";
import axios from "axios";
import { useSelector} from "react-redux";
import { isLength, isMatch } from "./utils/validation/Validation";
import { showSuccessMsg, showErrMsg } from "./utils/notification/Notification";
import "./CSS/profile.css";
import PasswordChecklist from "react-password-checklist";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import ConfirmBox from "react-dialog-confirm";

const initialState = {
  name: "",
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
  const { name,mobile,password, cf_password,err, success } = data;

  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();

  const handleChange = e => {
    const {name, value} = e.target
    setData({...data, [name]:value, err:'', success: ''})
}

const changeAvatar = async(e) => {
    e.preventDefault()
    try {
        const file = e.target.files[0]

        if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

        if(file.size > 1024 * 1024)
            return setData({...data, err: "Size too large." , success: ''})

        if(file.type !== 'image/jpeg' && file.type !== 'image/png')
            return setData({...data, err: "File format is incorrect." , success: ''})

        let formData =  new FormData()
        formData.append('file', file)

        setLoading(true)
        const res = await axios.post('/api/upload_avatar', formData, {
            headers: {'content-type': 'multipart/form-data', Authorization: token}
        })

        setLoading(false)
        setAvatar(res.data.url)
        
    } catch (err) {
        setData({...data, err: err.response.data.msg , success: ''})
    }
}

const updateInfor = () => {
    try {
        axios.patch('/user/update', {
            name: name ? name : user.name,
            mobile: mobile ? mobile : user.mobile,
            avatar: avatar ? avatar : user.avatar
        },{
            headers: {Authorization: token}
            
        })

        setData({...data, err: '' , success: "Updated Success!"})
        
    } catch (err) {
        setData({...data, err: err.response.data.msg , success: ''})
    }
}

const updatePassword =async (e) => {
    if(isLength(password))
        return setData({...data, err: "Password must be at least 8 characters.", success: ''})

    if(!isMatch(password, cf_password))
        return setData({...data, err: "Password did not match.", success: ''})

    try {
        axios.post('/user/reset', {password},{
            headers: {Authorization: token}
        })

        setData({...data, err: '' , success: "Updated Success!"})
    } catch (err) {
        setData({...data, err: err.response.data.msg , success: ''})
    }
}

const handleUpdate = () => {
    if(name || avatar|| mobile) updateInfor()
    if(password) updatePassword()
}

const confirm = (id) => {
  setIsOpen(true);
  setId(id);
};

const handleClose = () => {
  setIsOpen(!isOpen);
};

const onDelete = (_id) => {
  axios
    .delete('user/delete')

    .then((res) => {
      console.log(res);
      setIsOpen(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

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
              <input type="file" name="file" id="file_up"  onChange={changeAvatar}/>
            </span>
          </div>
          <div className="profhead2">
            {" "}
            <p>Change Picture</p>
          </div>
          <br></br>

          <div style={{ position: "absolute", zIndex: "704" }}>
          <ConfirmBox // Note : in this example all props are required
            options={{
              icon: "https://img.icons8.com/ios/50/000000/error--v1.png",
              text: "Are you sure you want to delete your account?",
              confirm: "yes",
              cancel: "no",
              btn: true,
            }}
            isOpen={isOpen}
            onClose={handleClose}
            onConfirm={() => {
              onDelete(id);
            }}
            onCancel={handleClose}
          />
        </div>

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
              name="name"
              defaultValue={user.name}
              placeholder="Your name"
              onChange={handleChange}
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
              name="email"
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
              name="mobile"
              placeholder="Mobile Number"
              defaultValue={user.mobile}
              onChange={handleChange}
            />
          </div>
          <button className="delbtn"
           onClick={() => confirm(user._id)}
          >Delete Account</button>
          <div className="col-md-13 mb-3 font" style={{ display: "flex" }}>
            <label htmlFor="password">
              Create New Password : &nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Your password"
              value={password} onChange={handleChange} 
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
              name="cf_password"
              placeholder="Confirm password"
              value={cf_password}
              onChange={handleChange} 
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
            
            <button className="savebtn" disabled={loading} onClick={handleUpdate}>
              Save & Update
            </button>
          </center>
          <br /> <br />
        </div>
      </div>
      <br></br>
    </div>
  );
}
