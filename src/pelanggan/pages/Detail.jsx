import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getTourById, getTours } from "../data/tours";
import DetailBookingAction from "../components/DetailBookingAction";
import { getPackageReviews } from "../services/reviewService";

function getStars(rating = 4) {
  const roundedRating = Math.max(0, Math.min(5, Math.round(Number(rating || 0))));
  return "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);
}

function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getReviewerName(review) {
  return (
    review?.pelanggan?.name ||
    review?.customer?.name ||
    review?.name ||
    "Customer"
  );
}

export default function Detail() {
  const { id } = useParams();

  const [tour, setTour] = useState(null);
  const [relatedTours, setRelatedTours] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadTourDetail() {
      setLoading(true);
      setReviewLoading(true);
      setError("");

      try {
        const [tourData, allTours, reviewData] = await Promise.all([
          getTourById(id),
          getTours(),
          getPackageReviews(id),
        ]);

        if (cancelled) {
          return;
        }

        setTour(tourData);
        setReviews(Array.isArray(reviewData) ? reviewData : []);

        setSelectedImage(
          tourData?.image ||
            tourData?.thumbnail ||
            ""
        );

        const tourList = Array.isArray(allTours)
          ? allTours
          : [];

        setRelatedTours(
          tourList
            .filter((item) => String(item.id) !== String(id))
            .slice(0, 4)
        );
      } catch (err) {
        console.error("Gagal mengambil detail paket:", err);

        if (!cancelled) {
          setTour(null);
          setRelatedTours([]);
          setReviews([]);

          setError(
            err.response?.data?.message ||
              "Detail paket gagal dimuat."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setReviewLoading(false);
        }
      }
    }

    loadTourDetail();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const galleryImages = useMemo(() => {
    if (!tour) return [];

    return Array.from(
      new Set([tour.image, ...(tour.gallery || []), ...(tour.images || [])])
    )
      .filter(Boolean)
      .slice(0, 6);
  }, [tour]);

  const averageRating = useMemo(() => {
    if (!reviews.length) return Number(tour?.rating || 0);

    const total = reviews.reduce((sum, review) => {
      return sum + Number(review.rating || 0);
    }, 0);

    return total / reviews.length;
  }, [reviews, tour?.rating]);

  if (loading) {
    return (
      <div className="detail-page">
        <Navbar />

        <main className="detail-container text-center py-20">
          <p className="text-gray-600">
            Memuat detail paket...
          </p>
        </main>

        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-page">
        <Navbar />

        <main className="detail-container text-center py-20">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Detail Paket Gagal Dimuat
          </h1>

          <p className="text-red-600 mb-6">
            {error}
          </p>

          <Link
            to="/destinations"
            className="inline-block bg-[#AAB700] text-white px-6 py-3 rounded-full font-semibold"
          >
            Kembali ke Destinations
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

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

  const languageList = Array.isArray(tour.language)
    ? tour.language
    : ["English"];

  const activityList = Array.isArray(tour.activityList)
    ? tour.activityList
    : Array.isArray(tour.activity)
    ? tour.activity
    : [];

  const includesList = Array.isArray(tour.includes)
    ? tour.includes
    : Array.isArray(tour.included)
    ? tour.included
    : [];

  const notIncludesList = Array.isArray(tour.notIncludes)
    ? tour.notIncludes
    : [
        "Personal expenses",
        "Additional meals outside the package",
        "Travel insurance upgrade",
      ];

  const safetyList = Array.isArray(tour.safety)
    ? tour.safety
    : [
        "Professional travel guide",
        "Emergency support during the trip",
        "Verified accommodation and transport",
      ];

  const peopleText =
    tour.people || tour.groupSize || `${tour.participants || 0} travelers`;

  const meetingPointText =
    tour.meetingPoint ||
    tour.location ||
    "Meeting point will be confirmed after booking.";

  return (
    <div className="detail-page">
      <Navbar />

      <main className="detail-container">
        <div className="detail-main">
          <p className="detail-breadcrumb">Tour guide &gt; City Tour</p>

          <h1 className="detail-title">{tour.title}</h1>

          <div className="detail-meta-top">
            <span>📍 {tour.location}</span>
            <span className="detail-stars">{getStars(averageRating)}</span>
            <span>({reviews.length || tour.reviews || tour.totalReviews || 0} reviews)</span>
          </div>

          <div className="detail-layout">
            <div className="detail-left">
              {selectedImage || tour.image || tour.thumbnail ? (
                <img
                  src={selectedImage || tour.image || tour.thumbnail}
                  alt={tour.title}
                  className="detail-hero-img"
                />
              ) : (
                <div className="detail-hero-img flex items-center justify-center bg-gradient-to-br from-[#181e4b] to-[#AAB700] text-white text-3xl font-bold">
                  {tour.title}
                </div>
              )}

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
                  <p>{languageList.join(", ")}</p>
                </div>
              </div>

              <section className="detail-section">
                <h2>Description</h2>

                <p>{tour.description || "No description available."}</p>

                <p>
                  Continue your journey with a professional guide and enjoy a
                  comfortable travel experience. This package is designed to help
                  customers explore the destination safely, easily, and memorably.
                </p>
              </section>

              <section className="detail-section">
                <h2>Activity</h2>
                <h4>What You Will Do</h4>

                <ul>
                  {activityList.map((item, index) => (
                    <li key={`${item}-${index}`}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="detail-section included-grid">
                <h2>What Is Included / Not Included</h2>

                <div className="two-column">
                  <div>
                    <h4>Includes</h4>

                    <ul>
                      {includesList.map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4>Not Includes</h4>

                    <ul>
                      {notIncludesList.map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="detail-section">
                <h2>Safety</h2>
                <h4>Health Precautions</h4>

                <ul>
                  {safetyList.map((item, index) => (
                    <li key={`${item}-${index}`}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="detail-section">
                <h2>Details</h2>

                <div className="detail-info-grid">
                  <div>
                    <h4>Language</h4>

                    {languageList.map((item, index) => (
                      <p key={`${item}-${index}`}>{item}</p>
                    ))}
                  </div>

                  <div>
                    <h4>Duration</h4>
                    <p>{tour.duration || "-"}</p>
                  </div>

                  <div>
                    <h4>Number Of People</h4>
                    <p>{peopleText}</p>
                  </div>
                </div>

                <h4 className="meeting-title">Meeting Point Address</h4>

                <p>{meetingPointText}</p>

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
                      {item.image ? (
                        <img src={item.image} alt={item.title} />
                      ) : (
                        <div className="flex h-[140px] items-center justify-center bg-gradient-to-br from-[#181e4b] to-[#AAB700] text-center text-white font-bold">
                          {item.title}
                        </div>
                      )}

                      <div>
                        <h3>{item.title}</h3>
                        <p>◷ Duration {item.duration}</p>
                        <p>🚐 {item.transport || "Transport Included"}</p>
                        <p>👨‍👩‍👧 {item.plan || "Family Friendly"}</p>

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
                      {Number(averageRating || 0).toFixed(1).replace(".", ",")} <span>{reviews.length} Reviews</span>
                    </h3>

                    <p className="big-stars">{getStars(averageRating)}</p>
                  </div>

                  <div className="rating-bars">
                    <p>
                      Rating <span></span> {Number(averageRating || 0).toFixed(1)}
                    </p>
                    <p>
                      Total Reviews <span></span> {reviews.length}
                    </p>
                    <p>
                      Latest Review <span></span> {reviews[0] ? formatDate(reviews[0].created_at) : "-"}
                    </p>
                  </div>
                </div>

                {reviewLoading && (
                  <p className="text-gray-500">Memuat review...</p>
                )}

                {!reviewLoading && reviews.length === 0 && (
                  <div className="comment-card">
                    <div className="avatar">N</div>

                    <div>
                      <h4>No Review Yet</h4>
                      <p className="detail-stars">☆☆☆☆☆</p>
                      <strong>Belum ada komentar untuk package ini</strong>

                      <p>
                        Review akan muncul setelah user melakukan booking,
                        booking dikonfirmasi oleh admin, lalu user memberi rating dan komentar.
                      </p>
                    </div>
                  </div>
                )}

                {!reviewLoading && reviews.map((review) => {
                  const reviewerName = getReviewerName(review);
                  const rating = Number(review.rating || 0);

                  return (
                    <div className="comment-card" key={review.id}>
                      <div className="avatar">{reviewerName[0]}</div>

                      <div>
                        <h4>{reviewerName}</h4>
                        <p className="detail-stars">{getStars(rating)}</p>
                        <strong>{rating} / 5 Rating</strong>

                        <p>{review.comment}</p>
                        <small className="text-gray-400">
                          {formatDate(review.created_at)}
                        </small>
                      </div>
                    </div>
                  );
                })}
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
