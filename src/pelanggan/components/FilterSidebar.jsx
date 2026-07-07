const PRICE_OPTIONS = [
  { value: "under-1m", label: "Under Rp1.000.000" },
  { value: "1m-3m", label: "Rp1.000.000 - Rp3.000.000" },
  { value: "3m-5m", label: "Rp3.000.000 - Rp5.000.000" },
  { value: "above-5m", label: "Above Rp5.000.000" },
];

const RATING_OPTIONS = [
  { value: "4.5", label: "4.5+ excellent" },
  { value: "4", label: "4.0+ recommended" },
  { value: "3", label: "3.0+ and above" },
];

const GROUP_OPTIONS = [
  { value: "1-2", label: "Solo / Couple, 1-2 pax" },
  { value: "3-5", label: "Family, 3-5 pax" },
  { value: "6-10", label: "Group, 6-10 pax" },
  { value: "10-plus", label: "Large group, 10+ pax" },
];

export default function FilterSidebar({
  filters,
  onFilterChange,
  onResetFilters,
}) {
  return (
    <aside className="destinations-sidebar">
      <div className="filter-group">
        <h3 className="filter-title">Find Package</h3>

        <label className="filter-label">Search</label>
        <input
          type="text"
          className="filter-date-input"
          placeholder="Search package, city, or keyword"
          value={filters.keyword}
          onChange={(event) => onFilterChange("keyword", event.target.value)}
        />

        <button
          type="button"
          className="filter-show-more"
          onClick={onResetFilters}
        >
          Reset Filters
        </button>
      </div>

      <div className="filter-group">
        <h3 className="filter-title">
          Budget Range <span className="filter-arrow">▾</span>
        </h3>

        {PRICE_OPTIONS.map((option) => (
          <label key={option.value} className="filter-checkbox-label">
            <input
              type="radio"
              name="price-filter"
              checked={filters.priceRange === option.value}
              onChange={() => onFilterChange("priceRange", option.value)}
            />{" "}
            {option.label}
          </label>
        ))}

        {filters.priceRange && (
          <button
            type="button"
            className="filter-show-more"
            onClick={() => onFilterChange("priceRange", "")}
          >
            Clear Budget
          </button>
        )}
      </div>

      <div className="filter-group">
        <h3 className="filter-title">
          Minimum Rating <span className="filter-arrow">▾</span>
        </h3>

        {RATING_OPTIONS.map((option) => (
          <label key={option.value} className="filter-checkbox-label">
            <input
              type="radio"
              name="rating-filter"
              checked={filters.minRating === option.value}
              onChange={() => onFilterChange("minRating", option.value)}
            />{" "}
            {option.label}
          </label>
        ))}

        {filters.minRating && (
          <button
            type="button"
            className="filter-show-more"
            onClick={() => onFilterChange("minRating", "")}
          >
            Clear Rating
          </button>
        )}
      </div>

      <div className="filter-group">
        <h3 className="filter-title">
          Group Size <span className="filter-arrow">▾</span>
        </h3>

        {GROUP_OPTIONS.map((option) => (
          <label key={option.value} className="filter-checkbox-label">
            <input
              type="radio"
              name="group-filter"
              checked={filters.groupSize === option.value}
              onChange={() => onFilterChange("groupSize", option.value)}
            />{" "}
            {option.label}
          </label>
        ))}

        {filters.groupSize && (
          <button
            type="button"
            className="filter-show-more"
            onClick={() => onFilterChange("groupSize", "")}
          >
            Clear Group Size
          </button>
        )}
      </div>
    </aside>
  );
}
