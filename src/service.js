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