import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "/node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import axios from "axios";
import { NotFound } from "./components/utils/NotFound/NotFound.js";
import {useDispatch, useSelector} from 'react-redux'
import {dispatchLogin,fetchUser, dispatchGetUser} from './redux/actions/authAction'
// import "semantic-ui-css/semantic.min.css";
import CreateService from "./components/CreateService";
import AllServices from "./components/AllServices";
import UserAllServices from "./components/UserAllServices";
import Register from "./components/Register";
import Login from "./components/Login";
import ActivationEmail from './components/ActivationEmail';

function App() {

  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)


  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged, dispatch])


  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])

  return (
    <div>

      <Router>
        <Route path="/" exact component={AllServices} />
        <Route path="/addService" component={CreateService} />
        <Route path="/editService/:id" exact element={<CreateService />} />
        <Route path="/userServices" exact element={<UserAllServices />} />
        <Route path="/register" exact component={Register} />
        <Route path="/user/activate/:activation_token" exact component={ActivationEmail}/>
        <Route path="/login" exact component={Login} />
      </Router>

    </div>
  );
}

export default App;
