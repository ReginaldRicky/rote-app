export default function BookingForm({
  formData,
  error,
  today,
  loading,
  onChange,
  onSubmit,
}) {
  return (
    <form className="booking-form-clean" onSubmit={onSubmit}>
      <div className="booking-card-head-clean">
        <h2>Booking Information</h2>
        <p>Enter your contact and travel information.</p>
      </div>

      {error && (
        <div className="booking-error-clean">
          {error}
        </div>
      )}

      <div className="booking-form-grid-clean">
        <div className="booking-field-clean">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className="booking-field-clean">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="booking-field-clean">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="booking-field-clean">
          <label>Guests</label>
          <input
            type="number"
            name="guests"
            min="1"
            value={formData.guests}
            onChange={onChange}
          />
        </div>

        <div className="booking-field-clean booking-field-full-clean">
          <label>Travel Date</label>
          <input
            type="date"
            name="date"
            min={today}
            value={formData.date}
            onChange={onChange}
          />
        </div>

        <div className="booking-field-clean booking-field-full-clean">
          <label>Additional Note</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={onChange}
            placeholder="Write additional request if needed"
            rows="4"
          />
        </div>
      </div>

      <div className="booking-form-footer-clean">
        <p>
          Your booking will be saved and shown in My Bookings.
        </p>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Booking"}
        </button>
      </div>
    </form>
  );
}