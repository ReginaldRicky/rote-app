import React from "react";
import bgJepang from "../assets/jepang.jpg";

function Hero() {
  return (
    <section className="hero-full-banner">
    <img 
        src="/jepang.jpg" 
        alt="Background Latar Belakang" 
        className="bg-banner-image" 
      />

      {/* Overlay Gelap Tipis agar Teks Terbaca */}
      <div className="banner-overlay"></div>

      {/* Konten Tengah */}
      <div className="banner-content">
        <h1 className="main-headline-center">
          We Find The Best Tours For You
        </h1>
        
        <p className="description-center">
          Built Wicket longer admire do barton vanity itself do in it. 
          Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the.
        </p>

        {/* Tombol Play Video */}
        <div className="play-container">
          <button className="play-btn-circle">
            <span className="play-triangle"></span>
          </button>
          <span className="play-text">Watch Video</span>
        </div>
      </div>

      {/* Search Bar Melayang di Bawah */}
      <div className="search-floating-bar">
        <div className="search-item">
          <span className="search-label">Location</span>
          <input type="text" placeholder="Search For A Destination" />
        </div>
        <div className="search-item border-side">
          <span className="search-label">Guests</span>
          <input type="text" placeholder="How many Guests?" />
        </div>
        <div className="search-item border-side">
          <span className="search-label">Date</span>
          <input type="text" placeholder="Pick a date" />
        </div>
        <button className="search-submit-btn">Search</button>
      </div>
    </section>
  );
}

export default Hero;