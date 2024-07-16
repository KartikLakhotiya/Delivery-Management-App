import React from "react";

import "./shop.styles.css";

import { connect } from "react-redux";
import { selectAllItems } from "../../redux/menu/menu.selectors";
import { increment, decrement, remove } from "../../redux/index";
import { Toaster, toast } from 'react-hot-toast'

const Shop = ({ items, increment, decrement, remove }) => {

  const addToCart = (id) => {
    toast.success("Added To Cart")
    increment(id)
  }

  return (
    <div className="shop">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <h1>Shop</h1>
      <div className="shop-container" style={{ display: "flex" }}>
        {items.map((item) => {
          return (
            <div className="shop-item" key={item.id}>
              <img src={item.image} alt={item.name} className="image" />
              <h3 className="name">{item.name}</h3>
              <p className="price">₹ {item.price}</p>
              <button className="add-btn" onClick={() => addToCart(item.id)}>
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: selectAllItems(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: (id) => dispatch(increment(id)),
    decrement: (id) => dispatch(decrement(id)),
    remove: (id) => dispatch(remove(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
