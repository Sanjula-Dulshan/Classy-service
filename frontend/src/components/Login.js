import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from './utils/notification/Notification'
import {dispatchLogin} from '../redux/actions/authAction'
import {useDispatch} from 'react-redux'


const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}

function Login() {
    const [user, setUser] = useState(initialState)
    
    const dispatch = useDispatch()
    const history = useHistory()

    const {email, password, err, success} = user

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
            history.push("/")

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
            <Link to="/register">< button type="submit" className="side-btn">
             Signup Here</button></Link>
        </div>
           <div style={{backgroundColor:"white"}}>
    
           <h1 className="Hfontreg" style={{color:'#FFFFFFF'}}>Login</h1> 
                <div className="reg-from-container">  
    
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                <br></br>
    
              <form onSubmit={handleSubmit}>
    
                   <div className="mb-3">
                                <label className="t-form-label">
                                <label className="t-form-label2">*</label>
                                    Email Address</label>
                                <input type="email"  style={{width:"450px"}} className="t-form-reg" id="email"
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
                                    Enter Password</label>
                                <input type="password"  style={{width:"450px"}} className="t-form-reg" id="password"
                                    placeholder="Enter Password(At least 8 characters)"
                                    value={password}
                                    name="password"
                                    onChange={handleChangeInput}
                                    required
                                />
                       </div>
    
                     <label className="t-form-label3">All fields with * are required.</label> <br></br> <br></br>
                  
                     <button type="submit" className="btn-register" style={{width:"140px",fontWeight:"bold",borderRadius:"12px"}} >Login</button>
                        </form>
                
                    </div>
    
                </div>
            </div>
        );
    
    }
    export default Login;