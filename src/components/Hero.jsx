import travelerImg from "../assets/Traveler.jpeg";

export default function Hero() {
  return (
    <section className="hero-container">
      <div className="hero-text">
        <p className="sub-headline">Best Destinations around the world</p>
        <h1 className="main-headline">
          Travel, <span className="highlight">enjoy</span> and live a new and full life
        </h1>
        <p className="description">
          Built Wicket longer admire do barton vanity itself do in it.
          Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the.
        </p>
        <button className="cta-button">Find out more</button>
      </div>

      <div className="hero-image-area">
        <div className="yellow-bg-shape"></div>
        <img src={travelerImg} alt="traveler" className="traveler-img" />
      </div>
    </section>
  );
}

