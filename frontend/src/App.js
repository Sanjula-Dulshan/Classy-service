import { BrowserRouter, Routes, Route } from "react-router-dom";
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
// import "semantic-ui-css/semantic.min.css";
import CreateService from "./components/CreateService";
import AllServices from "./components/AllServices";
import UserAllServices from "./components/UserAllServices";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<AllServices />} />
          <Route path="/addService" exact element={<CreateService />} />
          <Route path="/editService/:id" exact element={<CreateService />} />

          <Route path="/userServices" exact element={<UserAllServices />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
