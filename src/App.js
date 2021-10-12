import React from 'react';
import "boxicons";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import ProductDetail from "./components/ProductDetail";
import ProductList from "./components/ProductList";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

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
      <ToastContainer />
    </div>
  );
}

export default App;
