import React, { useState } from "react";
import { createProduct } from "../../Api";
import "./ProductForm.css";

function ProductForm() {
  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
    descricao: "",
    quantidade: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        ...formData,
        preco: parseFloat(formData.preco),
        quantidade: parseInt(formData.quantidade, 10),
      });
      setMessage("Produto cadastrado com sucesso!");
      setFormData({ nome: "", preco: "", descricao: "", quantidade: "" });
    } catch (error) {
      setMessage("Erro ao cadastrar o produto.");
      console.error("Erro:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Cadastrar Produto</h2>
      {message && (
        <p
          className={`form-message ${message.includes("Erro") ? "error" : ""}`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Preço:</label>
          <input
            type="number"
            step="0.01"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <input
            type="text"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Quantidade:</label>
          <input
            type="number"
            name="quantidade"
            value={formData.quantidade}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
