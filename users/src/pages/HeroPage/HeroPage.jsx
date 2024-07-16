import React, { useState } from 'react'
import './HeroPage.styles.css'

// images
import contact from '../../assets/images/heropage/contact.png'
import logo from '../../assets/log-removebg-preview.png'
import img1 from '../../assets/images/heropage/img1.jpg'
import img2 from '../../assets/images/heropage/img2.jpg'
import img3 from '../../assets/images/heropage/img3.webp'
import img4 from '../../assets/images/heropage/img4.webp'
import person from '../../assets/images/heropage/person.jpg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const HeroPage = () => {
  const history = useHistory()
  // State variables for input fields and error messages
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    let valid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (name === "") {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = "Name should not contain numeric values";
      valid = false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Email is not valid";
      valid = false;
    }

    if (message === "") {
      newErrors.message = "Message is required";
      valid = false;
    }

    // If there are errors, update the state and prevent form submission
    if (!valid) {
      setErrors(newErrors);
      return;
    }

    // If validation passes, you can proceed with form submission
    // Replace this with your actual form submission logic
    console.log("Form submitted:", { name, email, message });

    // Clear the form and reset error messages
    setName("");
    setEmail("");
    setMessage("");
    setErrors({ name: "", email: "", message: "" });
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container container">
          <input type="checkbox" name="" id="" />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <ul className="menu-items">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#food">Category</a></li>
            <li><p className='hover-item' onClick={() => history.push('/menu')}>Menu</p></li>
            <li><a href="#testimonials">Testimonial</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className='logo-container'>
            <img id="logo" src={logo} alt="error" />
            <h3 className="logo-text">Delivery Dine</h3>
          </div>

        </div>
      </nav>
      <section className="showcase-area" id="showcase" >
        <div className="showcase-container">
          <h1 className="main-title" id="home">Eat Right Food</h1>
          <p>Eat Healty, it is good for our health.</p>
          <p onClick={() => history.push('/menu')} className="hero-btn btn-primary hover-item">Menu</p>
        </div>
      </section>
      <section id="about">
        <div className="about-wrapper container">
          <div className="about-text">
            <p className="small">About Us</p>
            <h2>We've been making healthy food last for 10 years</h2>
            <p>
              Discover a world of flavors with Delivery Dine. We deliver your favorite restaurant dishes to your door. Delicious, convenient, and just a click away!
            </p>
          </div>
          <div className="about-img">
            <img src={img1} alt="food" />
          </div>
        </div>
      </section>
      <section id="food">
        <h2>Types of food we deliver</h2>
        <div className="food-container container">
          <div className="food-type fruite">
            <div className="img-container">
              <img id="img2" src={img2} alt="error" />
              <div className="img-content">
                <h3>North Indian</h3>
                <a href="#northindian" className="hero-btn btn-primary" target="blank">Learn
                  More</a>
              </div>
            </div>
          </div>
          <div className="food-type vegetable">
            <div className="img-container">
              <img id="img3" src={img3} alt="error" />
              <div className="img-content">
                <h3>South Indian</h3>
                <a href="#southindian" className="hero-btn btn-primary" target="blank">Learn
                  More</a>
              </div>
            </div>
          </div>
          <div className="food-type grin">
            <div className="img-container">
              <img id="img4" src={img4} alt="error" />
              <div className="img-content">
                <h3>Chinese</h3>
                <a href="#chinese" className="hero-btn btn-primary" target="blank">Learn
                  More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials">
        <h2 className="testimonial-title">What Our Customers Say</h2>
        <div className="testimonial-container container">
          <div className="testimonial-box">
            <div className="customer-detail">
              <div className="customer-photo">
                <img src={person} alt="" />
                <p className="customer-name">Vikash Kumar</p>
              </div>
            </div>
            <div className="star-rating">
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
            </div>
            <p className="testimonial-text">
              Great Food and amazing service.
            </p>
          </div>
          <div className="testimonial-box">
            <div className="customer-detail">
              <div className="customer-photo">
                <img src={person} alt="" />
                <p className="customer-name">Pravin</p>
              </div>
            </div>
            <div className="star-rating">
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
            </div>
            <p className="testimonial-text">
              Amazing Service
            </p>
          </div>
          <div className="testimonial-box">
            <div className="customer-detail">
              <div className="customer-photo">
                <img src={person} alt="" />
                <p className="customer-name">Ayush Panchal</p>
              </div>
            </div>
            <div className="star-rating">
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
            </div>
            <p className="testimonial-text">
              Great Service
            </p>
          </div>
        </div>
      </section>
      <section id="contact">
        <div className="contact-container container">
          <div className="contact-img">
            <img id="contact" src={contact} alt="" />
          </div>
          <div className="form-container">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
              <input
                type="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
              <textarea
                cols="30"
                rows="6"
                placeholder="Type Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {errors.message && <div className="error-message">{errors.message}</div>}
              <button type="submit" className="hero-btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
      <footer id="footer">
        <h2>Delivery Dine &copy; all rights reserved</h2>
      </footer>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
      <script src="app.js"></script>
    </>
  )
}

export default HeroPage