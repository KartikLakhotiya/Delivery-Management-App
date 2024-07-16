import React from "react";
import Shop from "../../components/Shop/shop";
import Header from "../../components/Header/header";

const Home = () => {
  return (
    <div>
      <Header />
      <Shop />
      <footer id="footer">
        <h2>Delivery Dine &copy; all rights reserved</h2>
      </footer>
    </div>
  );
};

export default Home;
