export default function FilterSidebar() {
  return (
    <aside className="destinations-sidebar">
      {/* Availability */}
      <div className="filter-group">
        <h3 className="filter-title">Availability</h3>
        <label className="filter-label">From</label>
        <input type="date" className="filter-date-input" defaultValue="2021-10-12" />
        <label className="filter-label">To</label>
        <input type="date" className="filter-date-input" defaultValue="2021-10-12" />
        <button className="filter-check-btn">Check Availability</button>
      </div>
      {/* Theme */}
      <div className="filter-group">
        <h3 className="filter-title">Theme <span className="filter-arrow">▾</span></h3>
        {["Water activities", "Good for social distancing", "Adrenaline", "Nature", "Hidden gems", "Street art & graffiti", "Food"].map((t) => (
          <label key={t} className="filter-checkbox-label">
            <input type="checkbox" /> {t}
          </label>
        ))}
        <button className="filter-show-more">Show More Destinations</button>
      </div>
      {/* Duration */}
      <div className="filter-group">
        <h3 className="filter-title">Duration <span className="filter-arrow">▾</span></h3>
        {["0-3 hours", "3-5 hours", "5-7 hours", "Full day (7+ hours)", "Multi-day"].map((d) => (
          <label key={d} className="filter-checkbox-label">
            <input type="checkbox" /> {d}
          </label>
        ))}
      </div>
      {/* Destination */}
      <div className="filter-group">
        <h3 className="filter-title">Destination <span className="filter-arrow">▾</span></h3>
        {["Biscayne Bay", "Downtown Miami", "Wynwood Arts District", "Port of Miami", "Everglades National Park", "Fisher Island", "Coconut Grove"].map((d) => (
          <label key={d} className="filter-checkbox-label">
            <input type="checkbox" /> {d}
          </label>
        ))}
        <button className="filter-show-more">Show More Destinations</button>
      </div>
    </aside>
  );
}