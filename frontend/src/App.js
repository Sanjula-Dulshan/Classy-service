import { BrowserRouter as Router, Route } from "react-router-dom";
import AddServices from "./components/AddServices";

function App() {
  return (
    <div>
      <Router>
        <Route path="/addService" component={AddServices} />
      </Router>
    </div>
  );
}

export default App;
