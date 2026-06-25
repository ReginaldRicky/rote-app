import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingCheckout from "../components/BookingCheckout";
import BookingNotFound from "../components/BookingNotFound";

import { getTourById } from "../data/tours";

export default function Booking() {
  const { id } = useParams();
  const tour = getTourById(id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {tour ? (
        <BookingCheckout tour={tour} />
      ) : (
        <BookingNotFound />
      )}

      <Footer />
    </div>
  );
}