import axios from "axios";

const baseUrl = "http://localhost:5000/api/v1";

export const getList = () => {
  return axios
    .get(`${baseUrl}/order`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error("Error fetching orders:", error);
      throw error;
    });
};

export const create = (data) => {
  const { name, quantity } = data;
  return axios
    .post(`${baseUrl}/order/`, { name, quantity })
    .then((response) => {
      console.log("Order created:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating order:", error);
      throw error;
    });
};

export const update = (id, data) => {
  const { name, quantity } = data;
  return axios
    .put(`${baseUrl}/order/${id}`, { name, quantity })
    .then((response) => {
      console.log("Order updated:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating order:", error);
      throw error;
    });
};

export const deleteOrder = (id) => {
  return axios
    .delete(`${baseUrl}/order/${id}`)
    .then((response) => {
      console.log("Order deleted:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error deleting order:", error);
      throw error;
    });
};
