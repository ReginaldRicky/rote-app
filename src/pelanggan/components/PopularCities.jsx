import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import DestinationCard from "./DestinationCard";
import { getTours } from "../data/tours";

export default function PopularCities() {
  const [tourItems, setTourItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadTours() {
      try {
        setError("");

        const data = await getTours();

        if (isMounted) {
          setTourItems(
            Array.isArray(data) ? data : []
          );
        }
      } catch (err) {
        console.error("Gagal mengambil paket:", err);

        if (isMounted) {
          setTourItems([]);
          setError("Paket wisata gagal dimuat.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadTours();

    return () => {
      isMounted = false;
    };
  }, []);

  const destinationCards = [...tourItems]
    .sort((a, b) => {
      const reviewDiff = Number(b.reviews || 0) - Number(a.reviews || 0);
      if (reviewDiff !== 0) return reviewDiff;
      return Number(b.rating || 0) - Number(a.rating || 0);
    })
    .slice(0, 4);

  if (loading) {
    return <p>Memuat destinasi...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="popular-cities-section">
      <div className="popular-destination-grid">
        {destinationCards.map((item) => (
          <DestinationCard
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
}