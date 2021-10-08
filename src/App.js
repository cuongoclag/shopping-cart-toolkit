import 'boxicons'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NavBar from "./components/Navbar"
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <h1>HELLO CHuan Hoang</h1>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
