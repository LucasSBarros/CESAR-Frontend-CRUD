import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct, updateProduct } from "../../Api";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.items);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditedProduct({ ...product });
  };

  const handleCancel = () => {
    setEditingProductId(null);
    setEditedProduct({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      await updateProduct(id, {
        ...editedProduct,
        preco: parseFloat(editedProduct.preco),
        quantidade: parseInt(editedProduct.quantidade, 10),
      });
      await fetchProducts();
      setEditingProductId(null);
      setEditedProduct({});
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      await fetchProducts();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  if (loading)
    return <p style={{ textAlign: "center", color: "#333" }}>Carregando...</p>;

  return (
    <div className="table-container">
      <h2 className="table-title">Lista de Produtos</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço (R$)</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              {editingProductId === product.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="nome"
                      value={editedProduct.nome}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      step="0.01"
                      name="preco"
                      value={editedProduct.preco}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="descricao"
                      value={editedProduct.descricao}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="quantidade"
                      value={editedProduct.quantidade}
                      onChange={handleChange}
                    />
                  </td>
                  <td className="action-buttons">
                    <button
                      className="update-button"
                      onClick={() => handleUpdate(product.id)}
                    >
                      Atualizar
                    </button>
                    <button className="cancel-button" onClick={handleCancel}>
                      Cancelar
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{product.nome}</td>
                  <td>{product.preco}</td>
                  <td>{product.descricao}</td>
                  <td>{product.quantidade}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(product)}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(product.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
