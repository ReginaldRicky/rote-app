import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BookingForm from "./BookingForm";
import BookingSummary from "./BookingSummary";
import { formatUSD, parsePrice } from "../data/tours";

const BOOKINGS_KEY = "customerBookings";

export default function BookingCheckout({ tour }) {
  const navigate = useNavigate();
  const today = getLocalDate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: localStorage.getItem("username") || "",
    email: localStorage.getItem("email") || "",
    phone: "",
    guests: 1,
    date: "",
    note: "",
  });

  const totalPrice = useMemo(() => {
    const price = parsePrice(tour.price);
    const guests = Number(formData.guests || 1);

    return formatUSD(price * guests);
  }, [tour.price, formData.guests]);

  function getBookings() {
    try {
      return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function getLocalDate() {
    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset() * 60_000;

    return new Date(currentDate.getTime() - timezoneOffset)
      .toISOString()
      .split("T")[0];
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const guests = Number(formData.guests);

    if (!fullName) {
      setError("Full name wajib diisi.");
      return;
    }

    if (!email) {
      setError("Email wajib diisi.");
      return;
    }

    if (!phone) {
      setError("Nomor telepon wajib diisi.");
      return;
    }

    if (!guests || guests < 1) {
      setError("Jumlah tamu minimal 1.");
      return;
    }

    if (!formData.date) {
      setError("Tanggal booking wajib dipilih.");
      return;
    }

    if (formData.date < today) {
      setError("Tanggal booking tidak boleh sebelum hari ini.");
      return;
    }

    setLoading(true);

  const currentUserId = localStorage.getItem("currentUserId");

  const newBooking = {
    bookingId: `BK-${Date.now()}`,
    customerId: currentUserId,
    tourId: tour.id,
    tourTitle: tour.title,
    tourImage: tour.image,
    location: tour.location,
    pricePerPerson: tour.price,
    totalPrice,
    fullName,
    email,
    phone,
    guests,
    date: formData.date,
    note: formData.note.trim(),
    status: "Waiting Confirmation",
    createdAt: new Date().toISOString(),
  };

    const bookings = getBookings();

    localStorage.setItem(
      BOOKINGS_KEY,
      JSON.stringify([newBooking, ...bookings])
    );

    setTimeout(() => {
      setLoading(false);
      navigate("/bookings");
    }, 500);
  }

  return (
    <main className="booking-page-clean">
      <section className="booking-page-head-clean">
        <p>Booking</p>
        <h1>Complete Your Trip</h1>
        <span>
          Fill your booking details and review your selected destination.
        </span>
      </section>

      <section className="booking-grid-clean">
        <BookingForm
          formData={formData}
          error={error}
          today={today}
          loading={loading}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        <BookingSummary
          tour={tour}
          guests={formData.guests}
          date={formData.date}
          totalPrice={totalPrice}
        />
      </section>
    </main>
  );
}