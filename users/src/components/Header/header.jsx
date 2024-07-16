import React from "react";
import { useHistory } from "react-router-dom";
import "./header.styles.css";
import logo from '../../assets/log-removebg-preview.png'
import { FiShoppingCart } from "react-icons/fi";

import { connect } from "react-redux";
import {
  selectCartItems,
  selectTotalAmount,
  totalItems,
} from "../../redux/menu/menu.selectors";
import { increment, decrement, remove } from "../../redux/index";

const Header = ({
  cartItems,
  totalAmount,
  totalItems,
  increment,
  decrement,
}) => {
  const [toggleCart, setToggleCart] = React.useState(false);
  const history = useHistory()
  return (
    <>
      <div className="header">
        <div className='logo-container hover-item' onClick={() => history.push('/')}>
          <img id="logo" src={logo} alt="error" />
          <h3 className="logo-text">Delivery Dine</h3>
        </div>
        <div
          className="cart-button"
          onClick={() => setToggleCart(!toggleCart)}
        >
          <FiShoppingCart
            size={26}
            className="cart-icon"
            color="white"
          />
          <div className="cart-total-items">
            <span style={{ fontSize: "11px" }}>{totalItems}</span>
          </div>

        </div>
      </div >
      {
        toggleCart ? (
          <div className="cart" >
            <>
              {cartItems.length === 0 ? (
                <div className="empty">
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div className="cart-item">
                      <img
                        className="cart-item-image"
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="cart-item-details">
                        <p>{item.name}</p>
                        <p>₹{item.price}</p>
                        <div className="change">
                          <div className="btn" onClick={() => decrement(item.id)}>
                            <p>-</p>
                          </div>
                          <p style={{ marginRight: "4px" }}> {item.quantity}x </p>
                          <div className="btn" onClick={() => increment(item.id)}>
                            <p>+</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {cartItems.length === 0 ? null : (
                <button
                  className="checkout-btn"
                  onClick={() => history.push('/checkout')}
                >
                  <p
                    style={{ textDecoration: "none", color: "#fff" }}

                  >
                    Checkout ( ₹{totalAmount} )
                  </p>
                </button>
              )}
            </>
          </div >
        ) : null}
    </>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
