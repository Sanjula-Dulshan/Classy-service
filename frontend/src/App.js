import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "/node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import axios from "axios";
import { NotFound } from "./components/utils/NotFound/NotFound.js";
// import "semantic-ui-css/semantic.min.css";
import CreateService from "./components/CreateService";
import AllServices from "./components/AllServices";
import UserAllServices from "./components/UserAllServices";
import Register from "./components/Register";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<AllServices />} />
          <Route path="/addService" exact element={<CreateService />} />
          <Route path="/editService/:id" exact element={<CreateService />} />
          <Route path="/userServices" exact element={<UserAllServices />} />
          <Route path="/register" exact element={<Register />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
