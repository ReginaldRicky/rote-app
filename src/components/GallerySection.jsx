import g1 from "../assets/gallery1.jpg";
import g2 from "../assets/gallery2.jpg";
import g3 from "../assets/gallery3.jpg";
import g4 from "../assets/gallery4.jpg";
import g5 from "../assets/gallery5.jpg";
import g6 from "../assets/gallery6.jpg";
import g7 from "../assets/gallery7.jpg";
import g8 from "../assets/gallery8.jpg";

const gallery = [g1, g2, g3, g4, g5, g6, g7, g8];

export default function GallerySection() {
  return (
    <section className="py-24 px-8 lg:px-20 bg-white">

      <div className="flex justify-between items-center mb-14">

        <div>

          <h2 className="text-5xl font-volkhov-bold text-[#181e4b] mb-4">
            From The Gallery
          </h2>

          <p className="text-gray-500">
            Explore beautiful travel moments
          </p>

        </div>

        <button className="bg-gray-700 text-white px-6 py-4 rounded-lg">
          View All Images
        </button>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        {gallery.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            className="
              w-full h-[280px]
              object-cover rounded-2xl
              hover:scale-105 transition duration-300
            "
          />
        ))}

      </div>

    </section>
  );
}