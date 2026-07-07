import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingCheckout from "../components/BookingCheckout";
import { getTourById } from "../data/tours";

export default function Booking() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTour() {
      try {
        setLoading(true);

        const data = await getTourById(id);

        setTour(data);
      } catch (err) {
        console.log(err);
        setTour(null);
      } finally {
        setLoading(false);
      }
    }

    loadTour();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading destination data...
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="p-10 text-center text-red-500">
        Tour tidak ditemukan
      </div>
    );
  }

  return (
    <BookingCheckout tour={tour} />
  );
}