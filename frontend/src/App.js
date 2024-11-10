import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import ProductForm from "./pages/ProductForm/ProductForm";
import ProductList from "./pages/ProductList/ProductList";
import "./App.css";

function App() {
  return (
    <Router>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Cadastrar Produto
        </NavLink>
        <NavLink
          to="/produtos"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Lista de Produtos
        </NavLink>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<ProductForm />} />
          <Route path="/produtos" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
