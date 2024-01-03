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
  const [orderData, setOrderData] = useState({ name: "", quantity: 1 });

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderValid, setIsOrderValid] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    getList()
      .then((data) => setOrders(data.orders))
      .catch((error) => console.error("Error fetching orders:", error));
  };

  const handleCreateOrder = () => {
    create(orderData)
      .then((data) => {
        closeModal();
        fetchOrders();
      })
      .catch((error) => console.error("Error creating order:", error));
  };

  const handleUpdateOrder = () => {
    update(selectedOrderId, orderData)
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
    setOrderData({
      name: order.name,
      quantity: order.quantity,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrderId(null);
    setOrderData({ name: "", quantity: 1 });
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const dataIsValid = orderData.name !== "" && orderData.quantity >= 1;
    setIsOrderValid(dataIsValid);
  }, [orderData]);

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
        isDisableBtn={isOrderValid}
        onClose={closeModal}
        onSubmit={selectedOrderId ? handleUpdateOrder : handleCreateOrder}
        title={selectedOrderId ? "Update Order" : "Create New Order"}
      >
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={orderData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={orderData.quantity}
            onChange={handleInputChange}
          />
        </div>
      </Modal>
      <button onClick={() => setIsModalOpen(true)}>Create New Order</button>
    </div>
  );
}

export default App;
