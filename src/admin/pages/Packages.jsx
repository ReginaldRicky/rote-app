import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPackages } from "../../services/packageService";

import PackagesToolbar from "../components/PackagesToolbar";
import PackagesTable from "../components/PackagesTable";
import AdminPagination from "../components/AdminPagination";

function getPackageStatus(packageItem) {
  if (packageItem.participants >= 22) return "High Demand";
  if (packageItem.participants <= 16) return "Limited";
  return "Available";
}

function sortPackages(items, sortType) {
  const sortedItems = [...items];

  if (sortType === "price-low") {
    return sortedItems.sort((a, b) => a.priceValue - b.priceValue);
  }

  if (sortType === "price-high") {
    return sortedItems.sort((a, b) => b.priceValue - a.priceValue);
  }

  if (sortType === "rating-high") {
    return sortedItems.sort((a, b) => b.rating - a.rating);
  }

  if (sortType === "participants-high") {
    return sortedItems.sort((a, b) => b.participants - a.participants);
  }

  return sortedItems;
}

export default function Packages() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  let active = true;

  async function loadPackages() {
    try {
      setLoading(true);
      setError("");

      const data = await getPackages();

      if (active) {
        setPackages(data);
      }
    } catch (err) {
      console.error(err);

      if (active) {
        setError(
          err.response?.data?.message ||
          "Data package gagal dimuat."
        );
      }
    } finally {
      if (active) {
        setLoading(false);
      }
    }
  }

  loadPackages();

  return () => {
    active = false;
  };
}, []);

  const filteredPackages = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    const searchedPackages = packages.filter((packageItem) => {
      const searchableText = [
        packageItem.title,
        packageItem.location,
        packageItem.duration,
        packageItem.price,
        packageItem.rating,
        packageItem.participants,
        getPackageStatus(packageItem),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = keyword ? searchableText.includes(keyword) : true;

      const matchesStatus =
        status === "All" ? true : getPackageStatus(packageItem) === status;

      return matchesSearch && matchesStatus;
    });

    return sortPackages(searchedPackages, sort);
  }, [packages, query, status, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPackages.length / rowsPerPage)
  );

  const paginatedPackages = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return filteredPackages.slice(startIndex, endIndex);
  }, [filteredPackages, currentPage, rowsPerPage]);

  function resetToFirstPage(callback) {
    setCurrentPage(1);
    callback();
  }

  function handleSearch(value) {
    resetToFirstPage(() => setQuery(value));
  }

  function handleStatusChange(value) {
    resetToFirstPage(() => setStatus(value));
  }

  function handleSortChange(value) {
    resetToFirstPage(() => setSort(value));
  }

  function handleRowsPerPageChange(value) {
    setRowsPerPage(value);
    setCurrentPage(1);
  }

  function handleEdit(packageItem) {
    navigate(`/admin/packages/${packageItem.id}/edit`);
  }

  return (
    <div className="space-y-4">
      <PackagesToolbar
        query={query}
        status={status}
        sort={sort}
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
      />

      <PackagesTable
        packages={paginatedPackages}
        rowsPerPage={rowsPerPage}
        getPackageStatus={getPackageStatus}
        onEdit={handleEdit}
      />

      <AdminPagination
        totalItems={filteredPackages.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        rowsOptions={[5, 6, 8]}
        selectWeight="font-bold"
        buttonWeight="font-semibold"
        pageWeight="font-bold"
        onPageChange={setCurrentPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
}