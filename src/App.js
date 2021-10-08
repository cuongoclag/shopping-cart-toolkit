import "boxicons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={ProductList} />
          <Route path="/product/:id" exact component={ProductDetail} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/login" exact component={Login} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
