import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import activity1 from "../assets/activity1.jpg";
import activity2 from "../assets/activity2.jpg";
import activity3 from "../assets/activity3.jpg";
import activity4 from "../assets/activity4.jpg";
import activity5 from "../assets/activity5.jpg";
import activity6 from "../assets/activity6.jpg";
import activity7 from "../assets/activity7.jpg";
import activity8 from "../assets/activity8.jpg";

const tours = [
  {
    id: 1,
    title: "Vintage Double Decker Bus Tour & Thames River Cruise",
    image: activity1,
    price: "$78.90",
    location: "Gothenburg",
  },
  {
    id: 2,
    title: "Alaska Westminster to Greenwich River Thames",
    image: activity2,
    price: "$35.00",
    location: "London",
  },
  {
    id: 3,
    title: "Magic of London Tour with Afternoon Tea",
    image: activity3,
    price: "$50.00",
    location: "London",
  },
  {
    id: 4,
    title: "Family Adventure Holiday Tour",
    image: activity4,
    price: "$42.00",
    location: "Alaska",
  },
];

const thumbnails = [activity1, activity2, activity3, activity4, activity5, activity6];

export default function Detail() {
  const { id } = useParams();
  const tour = tours.find((item) => item.id === Number(id)) || tours[0];

  return (
    <div className="detail-page">
      <Navbar />
      <div className="navbar-spacer"></div>

      <main className="detail-container">
        <div className="detail-main">
          <p className="detail-breadcrumb">Tour guide &gt; City Tour</p>

          <h1 className="detail-title">{tour.title}</h1>

          <div className="detail-meta-top">
            <span>📍 {tour.location}</span>
            <span className="detail-stars">★★★★★</span>
            <span>(348 reviews)</span>
          </div>

          <div className="detail-layout">
            <div className="detail-left">
              <img src={tour.image} alt={tour.title} className="detail-hero-img" />

              <div className="detail-thumbnails">
                {thumbnails.map((img, index) => (
                  <img key={index} src={img} alt="thumbnail" />
                ))}
              </div>

              <div className="detail-feature-box">
                <div>
                  <h4>◎ Free Cancellation</h4>
                  <p>Cancel up to 24 hours in advance to receive a full refund.</p>
                </div>
                <div>
                  <h4>⌘ Health Precautions</h4>
                  <p>Special health and safety measures apply.</p>
                </div>
                <div>
                  <h4>▣ Mobile Ticketing</h4>
                  <p>Use your phone or print your voucher.</p>
                </div>
                <div>
                  <h4>◴ Duration 3.5 Hours</h4>
                  <p>Check availability to see starting times.</p>
                </div>
                <div>
                  <h4>☘ Instant Confirmation</h4>
                  <p>Don&apos;t wait for the confirmation.</p>
                </div>
                <div>
                  <h4>♟ Live Tour Guide In English</h4>
                  <p>English</p>
                </div>
              </div>

              <section className="detail-section">
                <h2>Description</h2>
                <p>
                  See the highlights of London via two classic modes of transport on this
                  half-day adventure. First, you will enjoy great views of Westminster
                  Abbey, the Houses of Parliament, and the London Eye.
                </p>
                <p>
                  Continue to see St. Paul’s Cathedral, Sir Christopher Wren’s architectural
                  masterpiece. Then continue to the Tower of London and discover the history
                  of the city with an experienced tour guide.
                </p>
              </section>

              <section className="detail-section">
                <h2>Activity</h2>
                <h4>What You Will Do</h4>
                <ul>
                  <li>Discover London on board a classic vintage double decker bus</li>
                  <li>Cruise down the River Thames</li>
                  <li>See the Changing of the Guard</li>
                  <li>Go to Westminster Abbey</li>
                  <li>Listen to the chimes of Big Ben</li>
                </ul>
              </section>

              <section className="detail-section included-grid">
                <h2>What Is Included / Not Included</h2>
                <div className="two-column">
                  <div>
                    <h4>Includes</h4>
                    <ul>
                      <li>Double-decker Routemaster tour</li>
                      <li>Short trip along the River Thames</li>
                      <li>Changing of the Guard</li>
                      <li>Gratuities</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Not Includes</h4>
                    <ul>
                      <li>Hotel pickup</li>
                      <li>Lunch</li>
                      <li>Personal expenses</li>
                      <li>Extra ticket</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="detail-section">
                <h2>Safety</h2>
                <h4>Health Precautions</h4>
                <ul>
                  <li>All required protective equipment is provided</li>
                  <li>All areas that customers touch are frequently cleaned</li>
                  <li>You must keep social distance while in vehicles</li>
                  <li>The number of visitors is limited to reduce crowds</li>
                </ul>
              </section>

              <section className="detail-section">
                <h2>Details</h2>
                <div className="detail-info-grid">
                  <div>
                    <h4>Language</h4>
                    <p>English</p>
                    <p>French</p>
                  </div>
                  <div>
                    <h4>Duration</h4>
                    <p>2 hours</p>
                  </div>
                  <div>
                    <h4>Number Of People</h4>
                    <p>5 People</p>
                  </div>
                </div>

                <h4 className="meeting-title">Meeting Point Address</h4>
                <p>
                  Meet your guide inside the west entrance of Altab Ali Park. Look for a
                  guide wearing Nick&apos;s Holiday attire.
                </p>

                <div className="map-placeholder">Google Maps Area</div>
              </section>

              <section className="detail-section">
                <div className="related-header">
                  <h2>Related Tours In Today</h2>
                  <div>
                    <button>‹</button>
                    <button>›</button>
                  </div>
                </div>

                <div className="related-grid">
                  {tours.map((item) => (
                    <Link to={`/detail/${item.id}`} className="related-card" key={item.id}>
                      <img src={item.image} alt={item.title} />
                      <div>
                        <h3>{item.title}</h3>
                        <p>◷ Duration 2 hours</p>
                        <p>🚐 Transport Facility</p>
                        <p>👨‍👩‍👧 Family Plan</p>
                        <div className="related-bottom">
                          <span>★★★★★</span>
                          <strong>{item.price}</strong>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="detail-section">
                <h2>Customer Review</h2>
                <div className="review-summary">
                  <div>
                    <h3>4,30 <span>854 Reviews</span></h3>
                    <p className="big-stars">★★★★☆</p>
                  </div>
                  <div className="rating-bars">
                    <p>Guide <span></span> 4.8</p>
                    <p>Transportation <span></span> 3.0</p>
                    <p>Value for money <span></span> 4.5</p>
                    <p>Safety <span></span> 4.0</p>
                  </div>
                </div>

                {["Arlene McCoy", "Jenny Wilson", "Ralph Edwards", "Courtney Henry"].map(
                  (name, index) => (
                    <div className="comment-card" key={index}>
                      <div className="avatar">{name[0]}</div>
                      <div>
                        <h4>{name}</h4>
                        <p className="detail-stars">★★★★★</p>
                        <strong>Good Tour, Really Well Organised</strong>
                        <p>
                          The tour was very well organised. The guide was friendly and the
                          travel experience was comfortable and enjoyable.
                        </p>
                      </div>
                    </div>
                  )
                )}
              </section>
            </div>

            <aside className="booking-card">
              <h3>Booking</h3>

              <label>From</label>
              <input type="date" />

              <label>To</label>
              <input type="date" />

              <label>No. Of Guest</label>
              <select>
                <option>2 adults</option>
                <option>3 adults</option>
                <option>4 adults</option>
              </select>

              <p className="subtotal">Subtotal</p>
              <h2>{tour.price}</h2>

              <Link to={`/booking/${tour.id}`} className="confirm-btn">
                Confirm Booking
              </Link>

              <button className="outline-btn">♡ Save To Wishlist</button>
              <button className="outline-btn">↗ Share The Activity</button>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}