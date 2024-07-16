import React from "react";

import firebase from "firebase";
import "firebase/firestore";

const Order = ({ data, id, name, map, setMap, setOrderLocation }) => {
  const [stage, setStage] = React.useState(0);
  const [OrderCompleted, setOrderCompleted] = React.useState(false);

  //const db = firebase.firestore();

  const OrderTaken = () => {
    const db = firebase.firestore();
    setStage(stage + 1);

    db.collection("users")
      .doc(id)
      .update({
        rider: name,
        status: "accepted",
      })
      .then(() => {
        console.log("User updated!");
      });
    console.log("Order Taken");
  };

  const completeOrder = () => {
    if (data.rider != name) {
      return;
    }
    setStage(stage + 1);
    const db = firebase.firestore();

    db.collection("users")
      .doc(id)
      .update({
        status: "completed",
      })
      .then(() => {
        console.log("User updated!");
      });
    setOrderCompleted(true);
  };


  return (
    <>
      <div className={`order-card ${data.status === "completed" ? "completed" : ""}`}>
        <div className="order-info">
          <p className="order-id">{data.order.orderId}</p>
          <p className="order-time">Ordered At: {data.order.time}</p>
          <p className="order-amount">Total Amount: {data.order.total}</p>
          <p className="order-items">Total Items: {data.order.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
          <div className="item-list">
            <p className="item-header">Items</p>
            <ul className="item">
              {data?.order?.items.map((item, index) => (
                <li key={index}>{item.name} - {item.quantity}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="order-actions">
          {data.status === "submitted" ? (
            <button className="take-order-btn" onClick={OrderTaken}>
              Take Order
            </button>
          ) : data.status === "accepted" ? (
            <button className="deliver-order-btn" onClick={completeOrder}>
              Order Delivered
            </button>
          ) : (
            <button className="track-order-btn">Order Completed</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Order;
