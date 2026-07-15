// src/components/LandingPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./LandingPage.css";
import ChatBot from "./ChatBot"; 


// Images
import heroImage from "../assets/coffee-hero.jpg";
import brazilImg from "../assets/brazil.jpg";
import vietnamImg from "../assets/vietnam.jpg";
import indonesiaImg from "../assets/indonesia.jpg";
import gallery1 from "../assets/gallery1.jpg";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="landing">
      {/* 🔥 Header */}
      <header className="header">
        <div className="logo">☕ <span>COFFEE Coop</span></div>
        <nav>
          <a href="#home">Home</a>
          <a href="#story">Story</a>
          <a href="#offers">Offers</a>
          <a href="#blogs">Blogs</a>
          <a href="#contact">Contact</a>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </nav>
      </header>
      {/* 🌄 Hero Section */}
<section className="hero" id="home" style={{ backgroundImage: `url(${heroImage})` }} data-aos="fade-in">
  <div className="hero-overlay">
    <div className="hero-content">
      <h1>CoffeeHouse ☕</h1>
      <h2>Modern Dining, Perfect Timing</h2>
      <p>Where Great Flavors Meet Smart Service!</p>
      <div className="hero-buttons">
        <button onClick={() => navigate("/customer-booking")}>BOOK A TABLE</button>
        <button onClick={() => navigate("/menu")}>VIEW MENU</button>
      </div>
      <div className="hero-stats">
        <div className="stat">
          <span>🍽️</span>
          <p>50+ Menu Items</p>
        </div>
        <div className="stat">
          <span>😊</span>
          <p>2000+ Happy Customers</p>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* 📖 Our Story */}
      <section className="story" id="story" data-aos="fade-up">
        <div className="story-content">
          <div className="story-text">
            <h2>Our Story</h2>
            <p>
              Coffee Coop is a smart café management system where customers can book tables, order food, and enjoy a smooth dining experience. Chefs and waiters coordinate in real-time to serve fresh coffee and meals.
            </p>
            <button>Learn More</button>
          </div>
          <div className="story-image">
            <img src={gallery1} alt="Our Story" />
          </div>
        </div>
      </section>

      {/* 💡 Our Offers */}
      <section className="offers" id="offers" data-aos="fade-up">
        <h2>Our Offer</h2>
        <div className="offer-grid">
          <div className="offer-card" style={{ "--delay": "0s" }}>
            <img src={brazilImg} alt="Original Coffee" />
            <h3>Original Coffee</h3>
            <p>10% OFF — Exquisite tastes in every cup</p>
          </div>
          <div className="offer-card" style={{ "--delay": "0.2s" }}>
            <img src={vietnamImg} alt="20 Coffee Flavors" />
            <h3>20 Coffee Flavors</h3>
            <p>20% OFF — Explore specialty brews</p>
          </div>
          <div className="offer-card" style={{ "--delay": "0.4s" }}>
            <img src={indonesiaImg} alt="Pleasant Ambience" />
            <h3>Pleasant Ambience</h3>
            <p>5% OFF — Feel the perfect blend of comfort</p>
          </div>
        </div>
      </section>

      {/* 🌟 Most Popular Product */}
      <section className="popular-product" id="popular" data-aos="zoom-in">
        <h2>Our Most Popular</h2>
        <div className="product-highlight">
          <img src={brazilImg} alt="Popular Coffee" />
          <div className="product-info">
            <h3>Freshly Grinded Block Coffee</h3>
            <p>$12.00 ★★★★★</p>
            <button>Add to Cart</button>
          </div>
        </div>
      </section>

      {/* ☕ Why Our Coffee Is Best */}
      <section className="why-best" id="why-best" data-aos="fade-up">
        <div className="why-content">
          <div className="why-text">
            <h2>Why Our Coffee Is The Best</h2>
            <p>
              We only use the best quality beans and our roasting process is designed to bring out the best flavor in every cup.
            </p>
          </div>
          <div className="why-image">
            <img src={gallery1} alt="Barista brewing coffee" />
          </div>
        </div>
      </section>

      {/* 🎁 Promo Offer */}
      <section className="promo-offer" id="promo" data-aos="fade-up">
        <h2>Join in and get $25 OFF!</h2>
        <p>Sign up for our newsletter and receive a $25 discount on your first purchase.</p>
        <button>Sign Up</button>
      </section>

      {/* 📰 Blogs Section */}
      <section className="blogs" id="blogs" data-aos="fade-up">
        <h2>Latest Blogs</h2>
        <div className="blog-grid">
          <div className="blog-card" data-aos="fade-up" data-aos-delay="0">
            <h3>The Art of Brewing Coffee</h3>
            <p>Discover how different brewing methods bring out unique flavors in your cup.</p>
            <button>Read More</button>
          </div>
          <div className="blog-card" data-aos="fade-up" data-aos-delay="200">
            <h3>Top 5 Coffee Beans from Around the World</h3>
            <p>Explore Brazil, Vietnam, and Indonesia’s finest beans and what makes them special.</p>
            <button>Read More</button>
          </div>
          <div className="blog-card" data-aos="fade-up" data-aos-delay="400">
            <h3>Healthy Benefits of Coffee</h3>
            <p>Learn how coffee can boost energy, focus, and even support your wellness journey.</p>
            <button>Read More</button>
          </div>
        </div>
      </section>

      {/* 📬 Contact Section */}
      <section className="contact" id="contact" data-aos="fade-up">
        <h2>Have an inquiry?</h2>
        <form>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">Send</button>
        </form>
      </section>

      {/* 🧭 Footer */}
      <footer className="footer">
        <p>NUMBER ONE IN YOUR CITY</p>
        <p>© 2025 Coffee Coop. All rights reserved.</p>
        <div className="socials">📸 🐦 📘</div>
      </footer>
      <ChatBot />
    </div>
  );
}

export default LandingPage;
