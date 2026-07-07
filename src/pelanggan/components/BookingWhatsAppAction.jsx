import WhatsAppButton, { BUSINESS_WHATSAPP_NUMBER } from "./WhatsAppButton";

export default function BookingWhatsAppAction({ booking }) {
  const message = `
Halo Nick's Holiday,

Saya ingin bertanya terkait booking saya:

🧾 Booking ID: ${booking.bookingId || booking.id || "-"}
🏝️ Tour: ${booking.tourTitle || booking.package?.title || "-"}
📅 Date: ${booking.date || booking.trip_date || "-"}
👥 Guests: ${booking.guests || booking.guest_count || "-"}
💰 Total: ${booking.totalPrice || booking.total_price || "-"}

Mohon bantuannya ya.
  `.trim();

  return (
    <div className="flex flex-col gap-3 mt-4">
      <WhatsAppButton
        phone={BUSINESS_WHATSAPP_NUMBER}
        message={message}
        label="Chat Admin WhatsApp"
      />
    </div>
  );
}
