import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {isLength, isMatch} from './utils/validation/Validation'
import {showSuccessMsg, showErrMsg} from './utils/notification/Notification'
import "./CSS/profile.css";


const initialState = {
    name: '',
    email:'',
    mobile:'',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}
export default function Profile() {

    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const {user} = auth
    const [data, setData] = useState(initialState)
    const {name, password, cf_password,about, err, success} = data

    
    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    

      

  return (
      <div>
    <div>
    {err && showErrMsg(err)}
    {success && showSuccessMsg(success)}
    {loading && <h3>Loading.....</h3>}
    </div>
       <h2 className='profhead'>Edit Profile.</h2>
    <div className="profile_page">
    <div className="col-left">
        <div className="avatar">

        <img src={avatar ? avatar : user.avatar} alt=""/>
        <span>
             <i className="fas fa-camera"></i>
            <p>Change Picture</p>
             <input type="file" name="file" id="file_up" 
              />
         </span>
        </div>

        <div className="col-md-13 mb-3 font">
         <label htmlFor="name">Name</label>
         <input type="text"
          className="form-control"
         name="name" id="name" defaultValue={user.name}
          placeholder="Your name" 
           />
    </div>

    <div className="col-md-13 mb-3 font">
                    <label htmlFor="email">Email</label>
                    <input type="email"
                     className="form-control"
                    name="email" id="email" defaultValue={user.email}
                    placeholder="Your email address" disabled />
                </div>

                <div className="col-md-13 mb-3 font">
                    <label htmlFor="about">About</label>
                    <input type="text"
                    className="form-control"
                    name="about" id="about"
                    placeholder="Details"defaultValue={user.about}  
                    />
                </div>




                <div className="col-md-13 mb-3 font">
                    <label htmlFor="password">New Password</label>
                    <input type="password"
                     className="form-control"
                    name="password" id="password"
                    placeholder="Your password" value={password} 
                    />
                </div>

                <div className="col-md-13 mb-3 font">
                    <label htmlFor="cf_password">Confirm New Password</label>
                    <input type="password"
                    className="form-control"
                    name="cf_password" id="cf_password"
                    placeholder="Confirm password" value={cf_password}  
                    />
                </div>


              <br/>
                <div>
                    <em style={{color: "crimson"}}> 
                    All fields with * are required.
                    </em>
                </div>
                <br/>
               <center> <button disabled={loading} 
                >Update</button> </center>

<br/>  <br/>
            </div>


    </div>
    </div>
    
  )
}
