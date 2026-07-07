import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiRefreshCw } from "react-icons/fi";

import CalendarHeader from "../components/CalendarHeader";
import CalendarMonthGrid from "../components/CalendarMonthGrid";
import CalendarScheduleDetails from "../components/CalendarScheduleDetails";
import { getAdminBookings } from "../services/adminBookingService";
import { getPackages } from "../../services/packageService";

function getDateString(date) {
  const timezoneOffset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 10);
}

function getMonthDays(currentDate) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstCell = new Date(year, month, 1 - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(firstCell);
    date.setDate(firstCell.getDate() + index);
    const dateString = getDateString(date);

    return {
      id: dateString,
      day: date.getDate(),
      date: dateString,
      muted: date.getMonth() !== month,
    };
  });
}

function formatMonthLabel(currentDate) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(currentDate);
}

export default function Calendar() {
  const [view, setView] = useState("Month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCalendar() {
    try {
      setLoading(true);
      setError("");

      const [packages, bookings] = await Promise.all([
        getPackages(),
        getAdminBookings(),
      ]);

      const packageEvents = packages
        .filter((item) => item.startDate)
        .map((item) => ({
          id: `package-${item.id}`,
          kind: "Package",
          date: item.startDate,
          endDate: item.endDate,
          title: item.title,
          destination: item.location,
          duration: item.duration || `${item.startDate} - ${item.endDate}`,
          totalParticipant: item.participants || 0,
          link: `/admin/packages/${item.id}`,
          schedule: item.schedules || item.schedule || [],
          meetingPoints: [
            {
              type: "Package Date",
              startName: item.location || "Meeting point",
              startTime: item.startDate || "-",
              finishName: item.location || "Destination",
              finishTime: item.endDate || item.startDate || "-",
            },
          ],
        }));

      const bookingEvents = bookings
        .filter((item) => item.date)
        .map((item) => ({
          id: `booking-${item.id}`,
          kind: "Booking",
          date: item.date,
          title: `${item.packageName} - ${item.name}`,
          destination: item.location || item.packageName,
          duration: `${item.guests} ${item.guests === 1 ? "guest" : "guests"}`,
          totalParticipant: item.guests,
          status: item.status,
          link: `/admin/bookings/${item.id}/edit`,
          meetingPoints: [
            {
              type: "Customer Booking",
              startName: item.name,
              startTime: item.phone || item.email || "-",
              finishName: item.packageName,
              finishTime: item.status,
            },
          ],
        }));

      const mergedEvents = [...bookingEvents, ...packageEvents].sort((a, b) => {
        return new Date(a.date || 0) - new Date(b.date || 0);
      });

      setEvents(mergedEvents);
      setSelectedEvent(mergedEvents[0] || null);
    } catch (err) {
      console.error("CALENDAR ERROR:", err.response?.data || err);
      setError(err.response?.data?.message || "Schedule calendar gagal dimuat.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCalendar();
  }, []);

  const days = useMemo(() => getMonthDays(currentDate), [currentDate]);

  function moveMonth(direction) {
    setCurrentDate(
      (current) => new Date(current.getFullYear(), current.getMonth() + direction, 1)
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-[#111827]">Calendar</h1>
          <p className="mt-1 text-[13px] text-[#94a3b8]">
            Jadwal real dari package dan booking yang tersimpan di database.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {loading ? (
            <span className="inline-flex h-10 items-center text-sm text-[#64748b]">
              Loading schedule...
            </span>
          ) : null}

          <button
            type="button"
            onClick={loadCalendar}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#e7edf4] bg-white px-4 text-[13px] font-bold text-[#111827] hover:bg-[#f8fafc]"
          >
            <FiRefreshCw size={15} />
            Refresh
          </button>

          <Link
            to="/admin/bookings/add"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#AAB700] px-4 text-[13px] font-bold text-white hover:bg-[#98a500]"
          >
            <FiPlus size={15} />
            Add Booking
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      ) : null}

      <section className="h-[calc(100vh-165px)] min-h-[650px] overflow-hidden rounded-[16px] border border-[#dfe7ef] bg-white p-3 shadow-sm">
        <div className="grid h-full overflow-hidden rounded-[13px] border border-[#edf1f6] bg-white xl:grid-cols-[minmax(0,1fr)_305px]">
          <div className="flex min-w-0 flex-col bg-white">
            <CalendarHeader
              view={view}
              onViewChange={setView}
              monthLabel={formatMonthLabel(currentDate)}
              onPrev={() => moveMonth(-1)}
              onNext={() => moveMonth(1)}
            />

            <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden">
              <CalendarMonthGrid
                days={days}
                events={events}
                selectedEvent={selectedEvent}
                onSelectEvent={setSelectedEvent}
              />
            </div>
          </div>

          <CalendarScheduleDetails event={selectedEvent} />
        </div>
      </section>
    </div>
  );
}
