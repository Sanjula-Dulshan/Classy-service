import { BrowserRouter as Router, Route } from "react-router-dom";
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
// import "semantic-ui-css/semantic.min.css";
import CreateService from "./components/CreateService";
import AllServices from "./components/AllServices";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={AllServices} />
        <Route path="/addService" component={CreateService} />
      </Router>
    </div>
  );
}

export default App;
