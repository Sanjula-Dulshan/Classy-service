import { BrowserRouter as Router, Route } from "react-router-dom";
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import CreateService from "./components/CreateService";

function App() {
  return (
    <div>
      <Router>
        <Route path="/addService" component={CreateService} />
      </Router>
    </div>
  );
}

export default App;
