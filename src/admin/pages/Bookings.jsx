import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAdminBookings, normalizeBookingStatus } from "../services/adminBookingService";
import BookingsToolbar from "../components/BookingsToolbar";
import BookingsTable from "../components/BookingsTable";
import AdminPagination from "../components/AdminPagination";

function getMonthNameFromDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) {
    return new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
  }
  return "";
}

export default function Bookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [month, setMonth] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadBookings() {
    try {
      setLoading(true);
      setError("");
      const data = await getAdminBookings();
      setBookings(data);
    } catch (err) {
      console.error("ADMIN BOOKINGS ERROR:", err.response?.data || err);
      setError(err.response?.data?.message || "Data booking gagal dimuat.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return bookings.filter((booking) => {
      const searchableText = [
        booking.name,
        booking.packageName,
        booking.duration,
        booking.date,
        booking.price,
        booking.status,
        booking.email,
        booking.phone,
        booking.location,
      ].join(" ").toLowerCase();

      const matchesSearch = keyword ? searchableText.includes(keyword) : true;
      const bookingStatus = normalizeBookingStatus(booking.status);
      const matchesStatus = status === "All" ? true : bookingStatus === status;
      const bookingMonth = getMonthNameFromDate(booking.date);
      const matchesMonth = month === "All" ? true : bookingMonth === month;

      return matchesSearch && matchesStatus && matchesMonth;
    });
  }, [bookings, query, status, month]);

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / rowsPerPage));
  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredBookings.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredBookings, currentPage, rowsPerPage]);

  function resetToFirstPage(callback) {
    setCurrentPage(1);
    callback();
  }

  return (
    <div className="space-y-4">
      <BookingsToolbar
        query={query}
        status={status}
        month={month}
        onSearch={(value) => resetToFirstPage(() => setQuery(value))}
        onStatusChange={(value) => resetToFirstPage(() => setStatus(value))}
        onMonthChange={(value) => resetToFirstPage(() => setMonth(value))}
      />

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">{error}</div>}
      {loading && <div className="rounded-xl bg-white p-5 text-sm text-[#64748b] shadow-sm">Memuat data booking...</div>}

      {!loading && (
        <BookingsTable bookings={paginatedBookings} rowsPerPage={rowsPerPage} onEdit={(booking) => navigate(`/admin/bookings/${booking.id}/edit`)} />
      )}

      <AdminPagination
        totalItems={filteredBookings.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        rowsOptions={[5, 8, 10]}
        selectWeight="font-semibold"
        buttonWeight="font-medium"
        pageWeight="font-semibold"
        onPageChange={setCurrentPage}
        onRowsPerPageChange={(value) => { setRowsPerPage(value); setCurrentPage(1); }}
      />
    </div>
  );
}
