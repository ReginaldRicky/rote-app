import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getTourById, tours } from "../data/tours";
import DetailBookingAction from "../components/DetailBookingAction";

function getStars(rating = 4) {
  const roundedRating = Math.max(0, Math.min(5, Math.round(rating)));
  return "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);
}

export default function Detail() {
  const { id } = useParams();
  const tour = getTourById(id);

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (tour) {
      setSelectedImage(tour.image);
    }
  }, [tour]);

  const galleryImages = useMemo(() => {
    if (!tour) return [];

    return Array.from(new Set([tour.image, ...(tour.gallery || [])])).slice(
      0,
      6
    );
  }, [tour]);

  const relatedTours = useMemo(() => {
    if (!tour) return [];

    return tours.filter((item) => item.id !== tour.id).slice(0, 4);
  }, [tour]);

  if (!tour) {
    return (
      <div className="detail-page">
        <Navbar />

        <main className="detail-container text-center py-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Tour Not Found
          </h1>

          <p className="text-gray-500 mb-6">
            Destination yang kamu cari tidak tersedia.
          </p>

          <Link
            to="/destinations"
            className="inline-block bg-[#AAB700] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#98a500] transition"
          >
            Back to Destinations
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Navbar />

      <main className="detail-container">
        <div className="detail-main">
          <p className="detail-breadcrumb">Tour guide &gt; City Tour</p>

          <h1 className="detail-title">{tour.title}</h1>

          <div className="detail-meta-top">
            <span>📍 {tour.location}</span>
            <span className="detail-stars">{getStars(tour.rating)}</span>
            <span>({tour.reviews} reviews)</span>
          </div>

          <div className="detail-layout">
            <div className="detail-left">
              <img
                src={selectedImage || tour.image}
                alt={tour.title}
                className="detail-hero-img"
              />

          <div className="detail-thumbnails">
            {galleryImages.map((img, index) => (
              <img
                key={`${img}-${index}`}
                src={img}
                alt={`${tour.title} thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>

          <DetailBookingAction tour={tour} />

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
                  <h4>◴ Duration {tour.duration}</h4>
                  <p>Check availability to see starting times.</p>
                </div>

                <div>
                  <h4>☘ Instant Confirmation</h4>
                  <p>Don&apos;t wait for the confirmation.</p>
                </div>

                <div>
                  <h4>♟ Live Tour Guide</h4>
                  <p>{tour.language.join(", ")}</p>
                </div>
              </div>

              <section className="detail-section">
                <h2>Description</h2>

                <p>{tour.description}</p>

                <p>
                  Continue your journey with a professional guide and enjoy a
                  comfortable travel experience. This package is designed to help
                  customers explore the destination safely, easily, and
                  memorably.
                </p>
              </section>

              <section className="detail-section">
                <h2>Activity</h2>
                <h4>What You Will Do</h4>

                <ul>
                  {tour.activityList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="detail-section included-grid">
                <h2>What Is Included / Not Included</h2>

                <div className="two-column">
                  <div>
                    <h4>Includes</h4>

                    <ul>
                      {tour.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4>Not Includes</h4>

                    <ul>
                      {tour.notIncludes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="detail-section">
                <h2>Safety</h2>
                <h4>Health Precautions</h4>

                <ul>
                  {tour.safety.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="detail-section">
                <h2>Details</h2>

                <div className="detail-info-grid">
                  <div>
                    <h4>Language</h4>

                    {tour.language.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>

                  <div>
                    <h4>Duration</h4>
                    <p>{tour.duration}</p>
                  </div>

                  <div>
                    <h4>Number Of People</h4>
                    <p>{tour.people}</p>
                  </div>
                </div>

                <h4 className="meeting-title">Meeting Point Address</h4>

                <p>{tour.meetingPoint}</p>

                <div className="map-placeholder">Google Maps Area</div>
              </section>

              <section className="detail-section">
                <div className="related-header">
                  <h2>Related Tours In Today</h2>

                  <div>
                    <button type="button">‹</button>
                    <button type="button">›</button>
                  </div>
                </div>

                <div className="related-grid">
                  {relatedTours.map((item) => (
                    <Link
                      to={`/detail/${item.id}`}
                      className="related-card"
                      key={item.id}
                    >
                      <img src={item.image} alt={item.title} />

                      <div>
                        <h3>{item.title}</h3>
                        <p>◷ Duration {item.duration}</p>
                        <p>🚐 {item.transport}</p>
                        <p>👨‍👩‍👧 {item.plan}</p>

                        <div className="related-bottom">
                          <span>{getStars(item.rating)}</span>
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
                    <h3>
                      4,30 <span>854 Reviews</span>
                    </h3>

                    <p className="big-stars">★★★★☆</p>
                  </div>

                  <div className="rating-bars">
                    <p>
                      Guide <span></span> 4.8
                    </p>
                    <p>
                      Transportation <span></span> 3.0
                    </p>
                    <p>
                      Value for money <span></span> 4.5
                    </p>
                    <p>
                      Safety <span></span> 4.0
                    </p>
                  </div>
                </div>

                {[
                  "Arlene McCoy",
                  "Jenny Wilson",
                  "Ralph Edwards",
                  "Courtney Henry",
                ].map((name) => (
                  <div className="comment-card" key={name}>
                    <div className="avatar">{name[0]}</div>

                    <div>
                      <h4>{name}</h4>
                      <p className="detail-stars">★★★★★</p>
                      <strong>Good Tour, Really Well Organised</strong>

                      <p>
                        The tour was very well organised. The guide was friendly
                        and the travel experience was comfortable and enjoyable.
                      </p>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}