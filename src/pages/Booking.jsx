import { useParams } from "react-router-dom";

export default function Booking() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 px-20 py-10">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-lg">
        <h1 className="text-4xl font-bold text-[#10194e] mb-6">
          Booking Destination
        </h1>

        <p className="mb-6 text-gray-600">
          Destination ID: {id}
        </p>

        <form className="space-y-5">
          <div>
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-2 p-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 p-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="font-semibold">Guests</label>
            <input
              type="number"
              placeholder="Number of guests"
              className="w-full mt-2 p-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="font-semibold">Date</label>
            <input
              type="date"
              className="w-full mt-2 p-3 border rounded-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-500 text-white py-3 rounded-full font-bold"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
}