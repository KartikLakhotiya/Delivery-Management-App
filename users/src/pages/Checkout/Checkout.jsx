import React, { useCallback, useState } from "react";
import "./Checkout.styles.css";
import { useHistory } from "react-router-dom";
import useRazorpay from "react-razorpay";
import firebase from "firebase";
import "firebase/firestore";
import { AiOutlineLeft } from 'react-icons/ai'
import { connect } from "react-redux";
import {
  selectCartItems,
  selectTotalAmount,
  totalItems,
} from "../../redux/menu/menu.selectors";
import { increment, decrement, remove, clear } from "../../redux/index";

const Checkout = ({ cartItems, totalAmount, increment, decrement, clear }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("")
  const [mobileError, setMobileError] = useState("");
  const history = useHistory();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const [Razorpay] = useRazorpay();

  const handlePayment = useCallback((e) => {
    e.preventDefault()

    const nameForm = e.target.name.value
    const addressForm = e.target.address.value
    const mobileForm = e.target.mobile.value

    const nameValidation = /^[A-Za-z\s]+$/.test(nameForm);
    const mobileValidation = /^\d{10}$/.test(mobileForm);
    const addressValidation = addressForm.trim() !== "";

    if (!nameValidation) {
      setNameError("Name should only contain alphabets");
    } else {
      setNameError("");
    }

    if (!mobileValidation) {
      setMobileError("Mobile number must be 10 digits");
    } else {
      setMobileError("");
    }

    if (!addressValidation) {
      setAddressError("Address cannot be empty");
    } else {
      setAddressError("");
    }

    if (nameValidation && mobileValidation && addressValidation) {
      const order = {
        name: name,
        items: cartItems.map((item) => {
          return {
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          };
        }),
        orderId: Math.floor(1000 + Math.random() * 9000),
        total: totalAmount,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };

      fetch('http://localhost:3000/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total: totalAmount,
          name,
          date: new Date().toLocaleDateString()
        }),
      })
        .then(response => response.json())
        .then(data => {
          const resp = data

          const options = {
            key: "rzp_test_qWgN5pwJJZpb5h",
            amount: (order.total) * 100,
            currency: "INR",
            name: "Restaurant App",
            description: "Order Payment",
            order_id: resp.id,
            handler: (res) => {
              console.log(res);
            },
            prefill: {
              name: "Restaurant App",
              email: "myrestaurant@example.com",
              contact: "81042355393",
            },
            notes: {
              address: "CR 47, Mukesh Patel",
            },
            theme: {
              color: "#3399cc",
            },
          };

          const db = firebase.firestore();

          db.collection("users")
            .doc()
            .set(
              {
                location: {
                  lat: lat,
                  lng: lng,
                },
                order,
                status: "submitted",
                rider: null,
              },
              { merge: true }
            )
            .then(() => {
              console.log("Document successfully written!");
              history.push('/success')
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });

          const rzpay = new Razorpay(options);
          rzpay.open();
          clear();
        })
        // .then(() => {
        //   try {
        //     const db = firebase.firestore();

        //     db.collection("users")
        //       .doc()
        //       .set(
        //         {
        //           location: {
        //             lat: lat,
        //             lng: lng,
        //           },
        //           order,
        //           status: "submitted",
        //           rider: null,
        //         },
        //         { merge: true }
        //       )
        //       .then(() => {
        //         console.log("Document successfully written!");
        //         history.push('/success')
        //       })
        //       .catch((error) => {
        //         console.error("Error writing document: ", error);
        //       });
        //   } catch (error) {

        //   }
        // })
        .catch(error => {
          console.error('Error:', error);
        });

    }



  }, [Razorpay]);


  return (
    <div className="checkout-page">
      <form className="container" onSubmit={handlePayment}>
        <div className="form">
          <div className="back-container" onClick={() => history.push('/menu')}>
            <AiOutlineLeft />
            <p>Back</p>
          </div>
          <h1 className="head">Checkout</h1>
          <p className="form-header">Shipping Details</p>
          {/* <p className="note">** Note: It will use the current location.</p> */}
          <p className="title">Name</p>
          <input
            className={`input-box ${nameError ? "error" : ""}`}
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className="error-message">{nameError}</p>}
          <p className="title">Address</p>
          <input
            className={`input-box ${addressError ? "error" : ""}`}
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {addressError && <p className="error-message">{addressError}</p>}
          <p className="title">Mobile No</p>
          <input
            className={`input-box ${mobileError ? "error" : ""}`}
            type="tel"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          {mobileError && <p className="error-message">{mobileError}</p>}
        </div>
        <hr />
        <div className="orders-details">
          <p className="form-header order-head">Order Details</p>
          <div className="orders">
            {cartItems.map((item, index) => {
              return (
                <div className="order">
                  <div className="order-details">
                    <p className="name">{item.name}</p>
                    <p className="price">₹{item.price}</p>
                    <div className="change">
                      <div
                        className="check-btn"
                        onClick={() => decrement(item.id)}
                      >
                        <p>-</p>
                      </div>
                      <p style={{ marginRight: "4px" }}> {item.quantity}x </p>
                      <div
                        className="check-btn"
                        onClick={() => increment(item.id)}
                      >
                        <p>+</p>
                      </div>
                    </div>
                  </div>
                  <img src={item.image} className="img" alt="img" />
                </div>
              );
            })}
          </div>
          <div className="total">
            <p className="total-price">Total: ₹{totalAmount}</p>
          </div>
          <div className="buy">
            <button type="submit" className="buy-btn">
              Buy
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: selectCartItems(state),
    totalAmount: selectTotalAmount(state),
    totalItems: totalItems(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: (id) => dispatch(increment(id)),
    decrement: (id) => dispatch(decrement(id)),
    remove: (id) => dispatch(remove(id)),
    clear: () => dispatch(clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
