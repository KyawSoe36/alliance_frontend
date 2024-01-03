import React, { useEffect, useState } from "react";
import Modal from "./components/Modal.js";
import OrderTable from "./components/OrderTable.js";
import {
  create,
  deleteOrder,
  getList,
  update,
} from "./service/orderService.js";
import "./styles/styles.css";
function App() {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    getList()
      .then((data) => setOrders(data.orders))
      .catch((error) => console.error("Error fetching orders:", error));
  };

  const handleCreateOrder = () => {
    create(name, quantity)
      .then((data) => {
        closeModal();
        fetchOrders();
      })
      .catch((error) => console.error("Error creating order:", error));
  };

  const handleUpdateOrder = () => {
    update(selectedOrderId, name, quantity)
      .then((data) => {
        fetchOrders();
        closeModal();
      })
      .catch((error) => console.error("Error updating order:", error));
  };

  const handleDeleteOrder = (id) => {
    deleteOrder(id)
      .then(() => {
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
      <h1>Order List</h1>
      <OrderTable
        orders={orders}
        handleEditOrder={handleEditOrder}
        handleDeleteOrder={handleDeleteOrder}
      />
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
