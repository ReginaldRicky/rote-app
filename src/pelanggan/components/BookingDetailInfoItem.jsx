export default function BookingDetailInfoItem({
  icon,
  label,
  value,
  breakText = false,
}) {
  return (
    <div className="booking-detail-premium-info-item">
      <div className="booking-detail-premium-info-icon">
        {icon}
      </div>

      <div className="booking-detail-premium-info-text">
        <span>{label}</span>

        <strong className={breakText ? "break-all" : ""}>
          {value || "-"}
        </strong>
      </div>
    </div>
  );
}