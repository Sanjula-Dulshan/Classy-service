import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-notifications-component/dist/theme.css";
import "./App.css";
import axios from "axios";
import NotFound from "./components/utils/NotFound/NotFound";
import { useDispatch, useSelector } from "react-redux";

import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";
import CreateService from "./components/CreateService";
import AllServices from "./components/AllServices";
import ViewService from "./components/ViewService";
import Wishlist from "./components/Wishlist";
import UserAllServices from "./components/UserAllServices";
import Register from "./components/Register";
import Header from "./components/header/Header";
import AddBank from "./components/AddBank";
import EditBank from "./components/EditBank";
import Checkout from "./components/Checkout";

import SelectPayMethod from "./components/SelectPayMethod";
import TransactionReport from "./components/TransactionReport";

import Login from "./components/Login";
import ActivationEmail from "./components/ActivationEmail";
import Profile from "./components/Profile";
import PendingOrders from "./components/PendingOrders";
import RejectedOrders from "./components/RejectedOrders";
import AcceptedOrders from "./components/AcceptedOrders";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("/user/refresh_token", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());

        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <div>
      <BrowserRouter>
        <ReactNotifications />

        <Header />
        <Routes>
          <Route
            path="/"
            exact
            element={isLogged ? <AllServices /> : <NotFound />}
          />
          <Route
            path="/addService"
            exact
            element={isLogged ? <CreateService /> : <NotFound />}
          />
          <Route path="/editService/:id" exact element={<CreateService />} />
          <Route
            path="/userServices"
            exact
            element={isLogged ? <UserAllServices /> : <NotFound />}
          />
          <Route
            path="/pending"
            exact
            element={isLogged ? <PendingOrders /> : <NotFound />}
          />
          <Route
            path="/rejected"
            exact
            element={isLogged ? <RejectedOrders /> : <NotFound />}
          />
          <Route
            path="/accepted"
            exact
            element={isLogged ? <AcceptedOrders /> : <NotFound />}
          />
          <Route
            path="/userServices"
            exact
            element={isLogged ? <UserAllServices /> : <NotFound />}
          />

          <Route path="/register" exact element={<Register />} />
          <Route
            path="/user/activate/:activation_token"
            exact
            element={<ActivationEmail />}
          />
          <Route path="/login" exact element={<Login />} />
          <Route
            path="/profile"
            exact
            element={isLogged ? <Profile /> : <NotFound />}
          />

          <Route
            path="/wishlist"
            exact
            element={isLogged ? <Wishlist /> : <NotFound />}
          />
          <Route
            path="/viewService"
            exact
            element={isLogged ? <ViewService /> : <NotFound />}
          />

          <Route path="/addBank" exact element={<AddBank />} />
          <Route path="/editBank" exact element={<EditBank />} />
          <Route path="/selectPayMethod" exact element={<SelectPayMethod />} />

          <Route path="/checkout" exact element={<Checkout />} />

          <Route
            path="/transactionReport"
            exact
            element={<TransactionReport />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
