import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiDollarSign, FiPlus, FiUsers } from "react-icons/fi";

import StatsGrid from "../components/StatsGrid";
import RevenueOverview from "../components/RevenueOverview";
import TopDestinations from "../components/TopDestinations";
import TripSummary from "../components/TripSummary";
import TravelPackagesSection from "../components/TravelPackagesSection";
import RecentBookingsTable from "../components/RecentBookingsTable";
import MiniCalendar from "../components/MiniCalendar";
import UpcomingTrips from "../components/UpcomingTrips";
import { getAdminBookings } from "../services/adminBookingService";
import { getPackages } from "../../services/packageService";
import { formatIDR } from "../../utils/formatter";

const statIcons = {
  calendar: <FiCalendar />,
  users: <FiUsers />,
  dollar: <FiDollarSign />,
};

function getStatusCount(bookings, status) {
  return bookings.filter((item) => item.status === status).length;
}

function buildTopDestinations(bookings, packages) {
  const packageMap = new Map(packages.map((item) => [String(item.id), item]));
  const grouped = new Map();

  bookings.forEach((booking) => {
    const key = String(booking.packageId || booking.packageName || booking.id);
    const existing = grouped.get(key) || {
      id: booking.packageId,
      name: booking.packageName,
      value: 0,
      rating: packageMap.get(String(booking.packageId))?.rating || 0,
    };

    existing.value += Number(booking.guests || 0);
    grouped.set(key, existing);
  });

  const groupedItems = Array.from(grouped.values()).filter((item) => item.name);

  if (groupedItems.length) {
    return groupedItems;
  }

  return packages.map((item) => ({
    id: item.id,
    name: item.title,
    value: Number(item.participant_limit || item.participants || 0),
    rating: item.rating,
  }));
}

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const [bookingData, packageData] = await Promise.all([
        getAdminBookings(),
        getPackages(),
      ]);

      setBookings(bookingData);
      setPackages(packageData);
    } catch (err) {
      console.error("DASHBOARD ERROR:", err.response?.data || err);
      setError(err.response?.data?.message || "Dashboard gagal dimuat.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const dashboard = useMemo(() => {
    const confirmed = getStatusCount(bookings, "Confirmed");
    const cancelled = getStatusCount(bookings, "Cancelled");
    const waiting = getStatusCount(bookings, "Waiting Confirmation");
    const completed = getStatusCount(bookings, "Completed");

    const revenue = bookings
      .filter((item) => ["Confirmed", "Completed"].includes(item.status))
      .reduce((sum, item) => sum + Number(item.totalPrice || 0), 0);

    const stats = [
      {
        label: "Total Bookings",
        value: bookings.length,
        change: `${waiting} waiting`,
        icon: statIcons.calendar,
      },
      {
        label: "Confirmed Trips",
        value: confirmed + completed,
        change: `${cancelled} cancelled`,
        icon: statIcons.users,
        danger: cancelled > 0,
      },
      {
        label: "Revenue",
        value: formatIDR(revenue),
        icon: statIcons.dollar,
      },
    ];

    const sortedBookings = [...bookings].sort((a, b) => {
      return new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0);
    });

    const recent = sortedBookings.slice(0, 8).map((item) => ({
      id: item.id,
      name: item.name,
      package: item.packageName,
      duration: item.duration,
      date: item.dateLabel || item.date,
      price: item.price,
      status: item.status === "Waiting Confirmation" ? "Pending" : item.status,
    }));

    const tripSummary = {
      total: bookings.length,
      done: completed,
      booked: confirmed + waiting,
      cancelled,
    };

    const topDestinations = buildTopDestinations(bookings, packages);

<<<<<<< HEAD
  const upcomingTrips = [...bookings]
    .filter((item) => ["Waiting Confirmation", "Confirmed"].includes(item.status))
    .sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0))
    .slice(0, 2)
    .map((item) => ({
      id: item.id,
      title: item.packageName,
      customerName: item.name,
      guests: item.guests,
      price: item.price,
      date: item.dateLabel || item.date,
      location: item.location || item.name,
      image: item.packageImage || "",
      tag: item.status === "Confirmed" ? "CONFIRMED" : "WAITING",
=======
    const upcomingTrips = [...bookings]
      .filter((item) => ["Waiting Confirmation", "Confirmed"].includes(item.status))
      .sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0))
      .slice(0, 5)
      .map((item) => ({
        id: item.id,
        title: item.packageName,
        customerName: item.name,
        guests: item.guests,
        price: item.price,
        date: item.dateLabel || item.date,
        location: item.location || item.name,
        image: item.packageImage || "",
        tag: item.status === "Confirmed" ? "CONFIRMED" : "WAITING",
      }));

    const activities = sortedBookings.slice(0, 5).map((item) => ({
      title: `${item.name} membuat booking`,
      description: `${item.packageName} • ${item.guests} guest • ${item.price} • ${item.status}`,
      time: item.createdAt ? formatDateID(item.createdAt) : item.dateLabel || item.date,
      to: item.id ? `/admin/bookings/${item.id}/edit` : "/admin/bookings",
>>>>>>> 132b6f5e9be708d10b0a00edffb88ced9d0bd69f
    }));

    const eventDates = [
      ...bookings.map((item) => item.date),
      ...packages.map((item) => item.startDate),
    ].filter(Boolean);

    return {
      stats,
      recent,
      tripSummary,
      topDestinations,
      upcomingTrips,
      revenue,
      eventDates,
    };
  }, [bookings, packages]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[26px] font-bold text-[#1f2c3a]">Dashboard</h1>
          <p className="mt-1 text-sm text-[#64748b]">
            Live summary dari booking dan package database.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {loading ? (
            <span className="text-sm text-[#64748b]">
              Loading live data...
            </span>
          ) : null}

        <button
          type="button"
          onClick={loadDashboard}
          className="btn border-[#e5edf5] bg-white text-[#111827] hover:bg-[#f8fafc]"
        >
          Refresh
        </button>

        <Link
          to="/admin/bookings/add"
          className="btn border-none bg-[#AAB700] text-white hover:bg-[#98a500]"
        >
          <FiPlus /> Add Booking
        </Link>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-5 items-start">
      <div className="space-y-5 min-w-0 self-start">
        <StatsGrid stats={dashboard.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-5 items-stretch">
        <div className="h-full">
          <RevenueOverview totalRevenue={dashboard.revenue} />
        </div>

        <div className="h-full">
          <TopDestinations items={dashboard.topDestinations} />
        </div>
      </div>

        <TripSummary {...dashboard.tripSummary} />
      </div>

      <aside className="space-y-5 self-start h-fit">
        <MiniCalendar eventDates={dashboard.eventDates} />
        <UpcomingTrips trips={dashboard.upcomingTrips.slice(0, 2)} />
      </aside>
    </div>

    <TravelPackagesSection items={packages} />

    <RecentBookingsTable bookings={dashboard.recent} />
    </div>
  );
}