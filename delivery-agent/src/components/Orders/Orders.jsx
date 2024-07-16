import React from "react";
import Modal from "react-modal";
import "./Orders.styles.css";

import Order from "../Order/Order";
import Map from "../Map/Map";
//firebase
import firebase from "firebase";
import "firebase/firestore";

const Orders = ({ name }) => {
  const [data, setData] = React.useState(null);
  const [map, setMap] = React.useState(false);
  const [orderLocation, setOrderLocation] = React.useState(null);
  const [ordersTakenBy, setOrdersTakenBy] = React.useState([]);

  React.useEffect(() => {
    const db = firebase.firestore();
    function getData() {
      db.collection("users").onSnapshot((snapshot) => {
        const orders = snapshot?.docs?.map((doc) => { return { ...doc.data(), id: doc.id } });
        // Sort orders by date and time (assuming date and time are in ISO string format) 
        orders.sort((a, b) => a.order.date.localeCompare(b.order.date));
        setData(orders);
      });
    }
    getData();
  }, []);

  const OrderTaken = (id) => {
    const db = firebase.firestore();
    db.collection("users")
      .doc(id)
      .update({
        rider: name,
        status: "accepted",
      })
      .then(() => {
        console.log("User updated!");
      });
  };

  const completeOrder = (id) => {
    if (data.rider !== name) {
      return;
    }
    const db = firebase.firestore();
    db.collection("users")
      .doc(id)
      .update({
        status: "completed",
      })
      .then(() => {
        console.log("User updated!");
      });
  };

  return (
    <div className="order-page">
      <h1 className="order-heading">Orders</h1>
      <h3 className="welcome">Welcome, {name}!</h3>
      <div className="order-table-container">
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Ordered At</th>
              <th>Total Amount</th>
              <th>Total Items</th>
              <th>Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((order, index) => (
              <tr key={index}>
                <td>{order.order.orderId}</td>
                <td>{order.order.date} - {order.order.time}</td>
                <td>{order.order.total}</td>
                <td>
                  {order.order.items.reduce((acc, item) => acc + item.quantity, 0)}
                </td>
                <td>
                  {order.order.items.map((item, index) => (
                    <span key={index} className="item-details">
                      {item.name} - {item.quantity}
                    </span>
                  ))}
                </td>
                {console.log(order)}
                <td>
                  {order.status === "submitted" ? (
                    <button onClick={() => OrderTaken(order.id)} className="action-button">
                      Take Order
                    </button>
                  ) : order.status === "accepted" ? (
                    <button onClick={() => completeOrder(order.id)} className="action-button">
                      Order Delivered
                    </button>
                  ) : (
                    <button className="action-button" disabled>
                      Order Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Orders;
