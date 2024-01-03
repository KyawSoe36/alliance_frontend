import React, { useEffect, useState } from "react";
import Modal from "./components/Modal.js";
import "./styles/styles.css";

function App() {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseUrl = "http://localhost:5000/api/v1";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch(`${baseUrl}/order`)
      .then((response) => response.json())
      .then((data) => setOrders(data.data.orders))
      .catch((error) => console.error("Error fetching orders:", error));
  };

  const handleCreateOrder = () => {
    fetch("http://localhost:5000/api/v1/order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, quantity }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order created:", data);
        fetchOrders();
      })
      .catch((error) => console.error("Error creating order:", error));
  };

  const handleUpdateOrder = () => {
    fetch(`http://localhost:5000/api/v1/order/${selectedOrderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, quantity }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order updated:", data);
        fetchOrders();
        setSelectedOrderId(null);
        setName("");
        setQuantity("");
      })
      .catch((error) => console.error("Error updating order:", error));
  };

  const handleDeleteOrder = (id) => {
    fetch(`http://localhost:5000/api/v1/order/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("Order deleted:", id);
        fetchOrders();
      })
      .catch((error) => console.error("Error deleting order:", error));
  };

  const handleEditOrder = (order) => {
    setSelectedOrderId(order.id);
    setName(order.name);
    setQuantity(order.quantity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrderId(null);
    setName("");
    setQuantity("");
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.name}</td>
              <td>{order.quantity}</td>
              <td>
                <button onClick={() => handleEditOrder(order)}>Edit</button>
                <button onClick={() => handleDeleteOrder(order.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={selectedOrderId ? handleUpdateOrder : handleCreateOrder}
        title={selectedOrderId ? "Update Order" : "Create New Order"}
      >
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
      </Modal>
      <button onClick={() => setIsModalOpen(true)}>Create New Order</button>
    </div>
  );
}

export default App;
