import axios from 'axios';

export const getProducts = async () => {
  console.log("Entrando a getProducts");
  try {
    const response = await axios.get(`https://fakestoreapi.com/products?limit=15`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log("DAtos getProducts", response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching getProducts:', error);
    throw error;
  }
};
export const getProductById = async (id) => {
  console.log("Entrando a getProductById");
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log("Datos getProductById", response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching getProductById:', error);
    throw error;
  }
};
export const getSameCategory = async (category) => {
  console.log("Entrando a getSameCategory");
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log("Datos getSameCategory", response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching getSameCategory:', error);
    throw error;
  }
};
export const postReview = async (data) => {
  console.log("Entrando a postReview");
  try {
    const response = await axios.get(`https://dummyjson.com/c/c234-6163-419d-89c7`,data, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log("Datos postReview", response);

    return response;
  } catch (error) {
    console.error('Error fetching postReview:', error);
    throw error;
  }
};