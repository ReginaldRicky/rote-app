import { useState } from "react";
import { createBookingReview } from "../services/reviewService";

export default function BookingReviewForm({ booking, onSuccess }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canReview = ["confirmed", "completed"].includes(booking?.status);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!canReview) {
      return setError("Review hanya bisa diberikan setelah booking dikonfirmasi.");
    }

    if (!rating || rating < 1 || rating > 5) {
      return setError("Rating harus antara 1 sampai 5.");
    }

    if (!comment.trim()) {
      return setError("Komentar wajib diisi.");
    }

    try {
      setLoading(true);
      setError("");

      const response = await createBookingReview(booking.id, {
        rating: Number(rating),
        comment: comment.trim(),
      });

      setComment("");
      setRating(5);

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Gagal mengirim review."
      );
    } finally {
      setLoading(false);
    }
  }

  if (booking?.review) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#AAB700]">
          Your Review
        </p>

        <div className="mt-4 text-2xl text-yellow-400">
          {"★".repeat(Number(booking.review.rating || 0))}
          <span className="text-gray-300">
            {"★".repeat(5 - Number(booking.review.rating || 0))}
          </span>
        </div>

        <p className="mt-4 text-gray-600">
          {booking.review.comment}
        </p>
      </div>
    );
  }

  if (!canReview) {
    return (
      <div className="rounded-3xl bg-[#f7f8ef] p-6 text-gray-600">
        <p className="font-bold text-[#181e4b]">
          Review belum tersedia
        </p>

        <p className="mt-2">
          Kamu bisa memberi review setelah booking dikonfirmasi oleh admin.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-6 shadow-sm"
    >
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#AAB700]">
        Give Review
      </p>

      <h3 className="mt-3 text-2xl font-bold text-[#181e4b]">
        Bagikan pengalaman kamu
      </h3>

      {error && (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      <div className="mt-6">
        <label className="mb-2 block font-semibold text-[#181e4b]">
          Rating
        </label>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className={`text-3xl ${
                value <= rating
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block font-semibold text-[#181e4b]">
          Comment
        </label>

        <textarea
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setError("");
          }}
          rows={5}
          className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none transition focus:border-[#AAB700]"
          placeholder="Tulis komentar kamu tentang perjalanan ini..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 rounded-full bg-[#AAB700] px-8 py-4 font-bold text-white transition hover:bg-[#98a500] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending..." : "Submit Review"}
      </button>
    </form>
  );
}