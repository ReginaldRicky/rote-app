import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiMapPin,
} from "react-icons/fi";
import { formatIDR } from "../../utils/formatter";
import DetailItem from "./DetailItem";

export default function PackageDetailInfoGrid({ packageItem }) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <DetailItem
        icon={FiMapPin}
        label="Location"
        value={packageItem.location}
      />

      <DetailItem
        icon={FiClock}
        label="Duration"
        value={packageItem.duration}
      />

      <DetailItem
        icon={FiDollarSign}
        label="Price"
        value={`${formatIDR(packageItem.price)} / person`}
      />

      <DetailItem
        icon={FiCalendar}
        label="Schedule"
        value={`${packageItem.schedule?.length || 0} days`}
      />
    </section>
  );
}