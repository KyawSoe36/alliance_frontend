import React from "react";

const OrderTable = ({ orders, handleEditOrder, handleDeleteOrder }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 ? (
          orders.map((order) => (
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
          ))
        ) : (
          <tr>
            <td colSpan="3">No orders available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrderTable;
