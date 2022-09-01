import "./CSS/topicsub.css";
import "./CSS/btrap.css";
import React, {useState} from 'react'
import { Link,useHistory} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from './utils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from './utils/validation/Validation.js';


const initialState = {
  name:'',
  email: '',
  nic:'',
  mobile:'',
  password: '',
  cf_password:'',
  err: '',
  success: ''
}

function Register() {

    const dispatch = useDispatch()
    const history = useHistory()

  const [user, setUser] = useState(initialState)

  const {name,email,nic,mobile,password,cf_password,err, success} = user

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value, err: '', success: ''})
}

const handleSubmit = async e => {
  e.preventDefault()
  //Validations
  if(isEmpty(name) || isEmpty(email)|| isEmpty(nic)||  isEmpty(mobile)||isEmpty(password))
  return setUser({...user, err: "Please fill in all fields.", success: ''})

  if(!isEmail(email))
  return setUser({...user, err: "Invalid email type.", success: ''})

  if(isLength(password))
  return setUser({...user, err: "Password must be at least 8 characters.", success: ''})

  if(!isMatch(password, cf_password))
  return setUser({...user, err: "Passwords did not match.", success: ''})


  try {
    const res = await axios.post('/user/register', {
      name, email, nic, mobile, password
  })

  setUser({...user, err: '', success: res.data.msg})

  } catch (err) {
      err.response.data.msg && 
      setUser({...user, err: err.response.data.msg, success: ''})
  }
}


  return (
    <div className="topic-container">
    <div style={{backgroundColor:"#0F0934"}}>

        <div>
            <img className="img-side" src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1653068950/logo11_ggebb3.png"></img>
        </div>

        <div  className="t-title-container">
            <label className="sideLable" style={{color:"#FF5631"}}>SLIIT </label> <br className="br1" />
            <label className="sideLable" >Classy</label><br className="br1" />
            <label className="sideLable" >Services </label> <br className="br1" />
        </div>

        <div className="sublable-container">
            <label className="subLable">Already a member?</label>
        </div>
        <br/>
        <Link to="/login">< button type="submit" className="side-btn">
         Login Here</button></Link>
    </div>
       <div style={{backgroundColor:"white"}}>

       <h1 className="Hfont" style={{color:"#322B5F",fontWeight:"bold"}}>Register Here</h1> 
            <div className="reg-from-container">  

            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            

          <form onSubmit={handleSubmit}>

             <div className="mb-3">
                            <label className="t-form-label" style={{color:"#322B5F"}}> Name</label>
                            <input type="text"  style={{width:"450px"}} className="t-form-control" id="name"
                                placeholder="Enter Name"
                                value={name}
                                name="name"
                                onChange={handleChangeInput}
                                required
                            />
                 </div>

               <div className="mb-3">
                            <label className="t-form-label" style={{color:"#322B5F"}}>Email Address</label>
                            <input type="email"  style={{width:"450px"}} className="t-form-control" id="email"
                                placeholder="Enter Email"
                                value={email}
                                name="email"
                                onChange={handleChangeInput}
                                required
                            />
                   </div>

               <div className="mb-3">
                            <label className="t-form-label" style={{color:"#322B5F"}}>Mobile Number</label>
                            <input type="text"  style={{width:"450px"}} className="t-form-control" id="mobile"
                                placeholder="Enter Mobile Number"
                                value={mobile}
                                name="mobile"
                                onChange={handleChangeInput}
                                required
                                   />
                   </div>

               <div className="mb-3">
                            <label className="t-form-label" style={{color:"#322B5F"}}>Enter Password</label>
                            <input type="password"  style={{width:"450px"}} className="t-form-control" id="password"
                                placeholder="Enter Password(At least 8 characters)"
                                value={password}
                                name="password"
                                onChange={handleChangeInput}
                                required
                            />
                   </div>

              <div className="mb-3">
                            <label className="t-form-label" style={{color:"#322B5F"}}>Confirm Password</label>
                            <input type="password"  style={{width:"450px"}} className="t-form-control" id="cf_password"
                               placeholder="Confirm Password"
                                value={cf_password}
                                name="cf_password"
                                onChange={handleChangeInput}
                                required
                            />
                 </div>

              
                 <button type="submit" className="btn btn-success" style={{width:"200px",fontWeight:"bold"}} >Register</button>
                    </form>
            
                </div>

            </div>
        </div>
    );

}
export default Register;