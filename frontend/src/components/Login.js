import "./CSS/userFunction.css";
import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from './utils/notification/Notification'
import {dispatchLogin} from '../redux/actions/authAction'
import {useDispatch} from 'react-redux'


const initialState = {
    email: '',
    password: '',
    user_role:'',
    err: '',
    success: ''
}

function Login() {
    const [user, setUser] = useState(initialState)
    
    const dispatch = useDispatch()
    const history = useHistory()

    const {email, password,user_role, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/login', {email, password})
            
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)
         
            dispatch(dispatchLogin())
            history.push("/profile")

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
    return (
        <div className="topic-container">
        <div style={{backgroundColor:"#FEA82F"}}>
    
            <div  className="t-title-container">
                <label className="sideLable1" >Classy</label><br></br>
                <label className="sideLable" >Services. </label> <br className="br1" />
            </div>
    
            <div className="sublable-container">
                <label className="subLable">Get Demand For Your Skills.
                <br></br> Hire The Best Experts For Your Needs.
                </label>
            </div>
    
            <div className="sublable-container2">
                <label className="subLable2">Don't Have An Account?</label>
            </div>
            <br/>
            <Link to="/register">< button type="submit" className="side-btn1">
             Signup Here</button></Link>
        </div>
           <div style={{backgroundColor:"white"}}>
           <br></br>
           <h1 className="Hfontreg2" >Login</h1> 
           <br></br>
           <h1 className="Hfontreg3" >Welcome Again!</h1> 
                <div>  
    
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                <br></br> <br></br>
    
              <form onSubmit={handleSubmit}>
    
                   <div className="mb-3">
                                <label className="t-form-label-login">
                                <label className="t-form-label2">*</label>
                                    Email Address</label>
                                <input type="email"  style={{width:"450px"}} className="t-form-reg" id="email"
                                    placeholder="Enter Valid Email"
                                    value={email}
                                    name="email"
                                    onChange={handleChangeInput}
                                    required
                                />
                       </div>
    
                   <div className="mb-3">
                                <label className="t-form-label-login">
                                <label className="t-form-label2">*</label>
                                 Password</label>
                                <input type="password"  style={{width:"450px"}} className="t-form-reg" id="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    name="password"
                                    onChange={handleChangeInput}
                                    required
                                />
                       </div>

                       <div className="mb-3">
                            <label className="t-form-label-login">What Do You Want?</label>
                            
                            <select className='form-control' name="user_role" id="user_role" 
                               style={{width:"450px",marginLeft:"18%",border:"2px solid #ced4da"}}
                               value={user_role}
                               onChange={handleChangeInput}
                            >
                                <option value="hire">Hire A Service Provider</option>
                                <option value="work">Work As A Service Provider</option>
                            </select>
                    
                </div>
                     <br></br> 
                     <div style={{display:"flex"}}>
                     <label className="t-form-label3">*Select your need from the dropdown.</label> 
                      
                     <div className="pwd" style={{display:"flex"}}>
                        <Link to="#" >Forgot Password?</Link>
                     </div>
                     </div>
                     
                     <button type="submit" className="btn-login" style={{width:"140px",fontWeight:"bold",borderRadius:"12px"}} >Login</button>
                        </form>
                
                    </div>
    
                </div>
            </div>
        );
    
    }
    export default Login;