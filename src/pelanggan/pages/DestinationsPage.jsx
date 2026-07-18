import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

import FilterSidebar from "../components/FilterSidebar";
import ActivityCard from "../components/ActivityCard";
import GallerySection from "../components/GallerySection";

import { getTours } from "../data/tours";
import { parseNumericValue } from "../../utils/formatter";

const emptyFilters = {
  keyword: "",
  priceRange: "",
  minRating: "",
  groupSize: "",
};

function getPriceValue(item) {
  return parseNumericValue(item?.rawPrice ?? item?.priceValue, 0);
}

function getCapacityValue(item) {
  return Number(item?.participant_limit ?? item?.participants ?? 0);
}

function matchesPrice(item, priceRange) {
  if (!priceRange) return true;

  const price = getPriceValue(item);

  if (priceRange === "under-1m") return price < 1_000_000;
  if (priceRange === "1m-3m") return price >= 1_000_000 && price <= 3_000_000;
  if (priceRange === "3m-5m") return price > 3_000_000 && price <= 5_000_000;
  if (priceRange === "above-5m") return price > 5_000_000;

  return true;
}

function matchesRating(item, minRating) {
  if (!minRating) return true;
  return Number(item.rating || 0) >= Number(minRating);
}

function matchesGroupSize(item, groupSize) {
  if (!groupSize) return true;

  const capacity = getCapacityValue(item);

  if (capacity <= 0) return true;
  if (groupSize === "1-2") return capacity >= 2;
  if (groupSize === "3-5") return capacity >= 5;
  if (groupSize === "6-10") return capacity >= 10;
  if (groupSize === "10-plus") return capacity >= 11;

  return true;
}

function matchesKeyword(item, keyword) {
  const normalizedKeyword = keyword.trim().toLowerCase();

  if (!normalizedKeyword) return true;

  const searchableText = [
    item.title,
    item.location,
    item.description,
    item.duration,
    item.category,
    ...(item.includes || []),
    ...(item.schedule || []).map((schedule) => `${schedule.title} ${schedule.activity}`),
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedKeyword);
}

function sortTours(items, sortType) {
  const sorted = [...items];

  switch (sortType) {
    case "rating-high":
      return sorted.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));

    case "price-low":
      return sorted.sort((a, b) => getPriceValue(a) - getPriceValue(b));

    case "price-high":
      return sorted.sort((a, b) => getPriceValue(b) - getPriceValue(a));

    case "popular":
    default:
      return sorted.sort((a, b) => {
        const reviewDiff = Number(b.reviews || 0) - Number(a.reviews || 0);
        if (reviewDiff !== 0) return reviewDiff;
        return Number(b.rating || 0) - Number(a.rating || 0);
      });
  }
}

export default function DestinationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tourItems, setTourItems] = useState([]);
  const [sortType, setSortType] = useState("popular");
  const [filters, setFilters] = useState(() => ({
    ...emptyFilters,
    keyword: searchParams.get("location") || searchParams.get("q") || "",
    groupSize: searchParams.get("guests") ? "" : "",
  }));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTours() {
      try {
        setLoading(true);
        setError("");

        const data = await getTours();

        if (active) {
          setTourItems(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error(err);

        if (active) {
          setError(
            err.response?.data?.message ||
              "Data paket gagal dimuat."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadTours();

    return () => {
      active = false;
    };
  }, []);

  const filteredTours = useMemo(() => {
    return tourItems.filter((item) => {
      return (
        matchesKeyword(item, filters.keyword) &&
        matchesPrice(item, filters.priceRange) &&
        matchesRating(item, filters.minRating) &&
        matchesGroupSize(item, filters.groupSize)
      );
    });
  }, [tourItems, filters]);

  const sortedTours = useMemo(() => {
    return sortTours(filteredTours, sortType);
  }, [filteredTours, sortType]);

  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter(Boolean).length;
  }, [filters]);

  function updateFilter(key, value) {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function resetFilters() {
    setFilters(emptyFilters);
    setSortType("popular");
    setSearchParams({});
  }

  return (
    <div className="min-h-screen bg-white destinations-page">
      <Navbar />

      <PageHeader
        title="Explore Destinations"
        subtitle={`${sortedTours.length} of ${tourItems.length} Activities Found`}
        breadcrumbs={[
          { label: "Home", to: "/dashboard" },
          { label: "Destinations" },
        ]}
      >
        <div className="destinations-sort">
          {activeFilterCount > 0 && (
            <button
              type="button"
              className="filter-show-more"
              onClick={resetFilters}
            >
              Clear {activeFilterCount} Filter{activeFilterCount > 1 ? "s" : ""}
            </button>
          )}

          <span>Sort by:</span>

          <select
            className="destinations-sort-select"
            value={sortType}
            onChange={(event) => setSortType(event.target.value)}
          >
            <option value="popular">Popularity</option>
            <option value="rating-high">Highest Rating</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </PageHeader>

      <section className="destinations-listing">
        <FilterSidebar
          filters={filters}
          onFilterChange={updateFilter}
          onResetFilters={resetFilters}
        />

        <div className="destinations-results">
          {loading && (
            <p className="py-8 text-center">
              Memuat paket wisata...
            </p>
          )}

          {error && (
            <p className="py-8 text-center text-red-500">
              {error}
            </p>
          )}

          {!loading && !error && sortedTours.map((item) => (
            <ActivityCard
              key={item.id}
              item={item}
            />
          ))}

          {!loading && !error && sortedTours.length === 0 && (
            <div className="rounded-3xl border border-dashed border-[#dfe7ef] bg-white p-8 text-center text-gray-500">
              <h3 className="mb-2 text-xl font-bold text-[#181e4b]">
                Package tidak ditemukan
              </h3>

              <p>
                Coba ubah keyword, budget, rating, atau group size filter.
              </p>

              <button
                type="button"
                className="mt-5 rounded-full bg-[#AAB700] px-6 py-3 font-bold text-white"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <GallerySection />
      <Footer />
    </div>
  );
}
