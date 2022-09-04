import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import axios from "axios";
import { NotFound } from "./components/utils/NotFound/NotFound.js";
// import "semantic-ui-css/semantic.min.css";
import CreateService from "./components/CreateService";
import AllServices from "./components/AllServices";
import Register from "./components/Register";

import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div>
      <Router>
        <Sidebar />
        <Route path="/" exact component={AllServices} />
        <Route path="/addService" component={CreateService} />
        <Route path="/register" component={Register} />
      </Router>
    </div>
  );
}

export default App;
