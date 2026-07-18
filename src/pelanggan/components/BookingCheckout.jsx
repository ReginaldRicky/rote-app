import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../services/bookingService";
import { BUSINESS_WHATSAPP_NUMBER, createWhatsAppUrl } from "./WhatsAppButton";
import { formatIDR, parseNumericValue } from "../../utils/formatter";
import BookingForm from "./BookingForm";
import BookingSummary from "./BookingSummary";

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

  const basePrice = useMemo(() => {
    return parseNumericValue(tour?.priceValue ?? tour?.rawPrice ?? tour?.price, 0);
  }, [tour]);

  const totalPrice = useMemo(() => {
    const guests = Number(formData.guests || 1);
    return basePrice * guests;
  }, [basePrice, formData.guests]);

  if (!tour) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading destination data...
      </div>
    );
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

  function buildBookingWhatsAppMessage(bookingData) {
    const booking = bookingData?.data || bookingData || {};
    const packageTitle = booking.package?.title || tour?.title || "-";
    const bookingId = booking.id || "-";
    const guests = booking.guest_count || formData.guests || "-";
    const tripDate = booking.trip_date || formData.date || "-";
    const total = booking.total_price || totalPrice;

    return `Halo Nick's Holiday,

Saya sudah membuat booking dan ingin konfirmasi lewat WhatsApp.

Booking ID: ${bookingId}
Package: ${packageTitle}
Nama: ${formData.fullName}
Email: ${formData.email}
Nomor HP: ${formData.phone}
Tanggal Travel: ${tripDate}
Jumlah Tamu: ${guests}
Total Harga: ${formatIDR(total)}

Catatan: ${formData.note || "-"}

Mohon bantu konfirmasi booking saya ya.`;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const guests = Number(formData.guests);

    if (!fullName) return setError("Full name wajib diisi.");
    if (!email) return setError("Email wajib diisi.");
    if (!phone) return setError("Nomor telepon wajib diisi.");
    if (!guests || guests < 1) return setError("Jumlah tamu minimal 1.");
    if (!formData.date) return setError("Tanggal wajib dipilih.");
    if (formData.date < today) {
      return setError("Tanggal tidak boleh sebelum hari ini.");
    }

    const participantLimit = Number(tour?.participant_limit || tour?.participants || 0);

    if (participantLimit > 0 && guests > participantLimit) {
      return setError(
        `Jumlah tamu tidak boleh lebih dari ${participantLimit} peserta.`
      );
    }

    setLoading(true);

    try {
      const bookingResponse = await createBooking({
        package_id: tour.id,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        guest_count: guests,
        trip_date: formData.date,
        note: formData.note,
      });

      const whatsappUrl = createWhatsAppUrl(
        BUSINESS_WHATSAPP_NUMBER,
        buildBookingWhatsAppMessage(bookingResponse)
      );

      if (whatsappUrl) {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }

      navigate("/bookings");
    } catch (err) {
      console.error(err.response?.data || err);

      setError(
        err.response?.data?.message ||
          "Gagal membuat booking. Coba lagi."
      );
    } finally {
      setLoading(false);
    }
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
