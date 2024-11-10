const baseURL = "http://localhost:9000/api";

const request = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    if (response.status === 204) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const getProducts = () =>
  request(`${baseURL}/product`, {
    method: "GET",
  });

export const getProduct = (id) =>
  request(`${baseURL}/product/${id}`, {
    method: "GET",
  });

export const createProduct = (product) =>
  request(`${baseURL}/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

export const updateProduct = (id, product) =>
  request(`${baseURL}/product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

export const deleteProduct = (id) =>
  request(`${baseURL}/product/${id}`, {
    method: "DELETE",
  });

export default {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
