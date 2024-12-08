import React from 'react'
import { Link } from 'react-router-dom'
import '../styles.css'
function Footer() {
  return (
    <footer className="footer">
    <div className="section__container footer__container">
      <div className="footer__col">
        <h3>Health<span>Care</span></h3>
        <p>
          We are honored to be a part of your healthcare journey and committed
          to delivering compassionate, personalized, and top-notch care every
          step of the way.
        </p>
        <p>
          Trust us with your health, and let us work together to achieve the
          best possible outcomes for you and your loved ones.
        </p>
      </div>
      <div className="footer__col">
        <h4>About Us</h4>
        <p><a href="#home">Home</a></p>
        <p><a href="#about">About Us</a></p>
        <p><a href="#work">Work With Us</a></p>
        <p><a href="#blog">Our Blog</a></p>
        <p><Link to={"/Harar_terms&conditions"} target='_blank'>Terms & Conditions</Link></p>
      </div>
      <div className="footer__col">
        <h4>Services</h4>
        <p><a href="#search-terms">Search Terms</a></p>
        <p><a href="#advance-search">Advance Search</a></p>
        <p><Link to={"/Harar_privacy_policy"}  target='_blank'>Privacy Policy</Link></p>
        <p><a href="#suppliers">Suppliers</a></p>
        <p><a href="#stores">Our Stores</a></p>
      </div>
      <div className="footer__col">
        <h4>Contact Us</h4>
        <p>
          <i className="ri-map-pin-2-fill"></i> 0340,Kerugoya, Kirinyaga
        </p>
        <p><i className="ri-mail-fill"></i> support@Harar.com</p>
        <p><i className="ri-phone-fill"></i> (+254) 3456 789</p>
      </div>
    </div>
    <div className="footer__bar">
      <div className="footer__bar__content">
        <p>Copyright © 2024 Harar HealthCare. All rights reserved.</p>
        <div className="footer__socials">
          <span><i className="ri-instagram-line"></i></span>
          <span><i className="ri-facebook-fill"></i></span>
          <span><i className="ri-heart-fill"></i></span>
          <span><i className="ri-twitter-fill"></i></span>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer