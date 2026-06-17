import g1 from "../assets/gallery1.jpg";
import g2 from "../assets/gallery2.jpg";
import g3 from "../assets/gallery3.jpg";
import g4 from "../assets/gallery4.jpg";
import g5 from "../assets/gallery5.jpg";
import g6 from "../assets/gallery6.jpg";
import g7 from "../assets/gallery7.jpg";
import g8 from "../assets/gallery8.jpg";

<<<<<<< HEAD
const gallery = [
  {
    image: g1,
    title: "Bali Beach",
    location: "Indonesia",
  },
  {
    image: g2,
    title: "Tokyo Night",
    location: "Japan",
  },
  {
    image: g3,
    title: "Swiss Mountain",
    location: "Switzerland",
  },
  {
    image: g4,
    title: "Paris City",
    location: "France",
  },
  {
    image: g5,
    title: "Santorini",
    location: "Greece",
  },
  {
    image: g6,
    title: "Dubai Desert",
    location: "UAE",
  },
  {
    image: g7,
    title: "New York",
    location: "USA",
  },
  {
    image: g8,
    title: "Seoul Street",
    location: "Korea",
  },
];
=======
const gallery = [g1, g2, g3, g4, g5, g6, g7, g8];
>>>>>>> 345cc81fa34e4a055abcb588121de3092da7f524

export default function GallerySection() {
  return (
    <section className="py-24 px-8 lg:px-20 bg-white">

<<<<<<< HEAD
      <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-14 gap-6">

        <div>
          <h2 className="text-5xl font-bold text-[#181e4b] mb-4">
            From The Gallery
          </h2>

          <p className="text-gray-500 text-lg">
            Explore beautiful travel moments around the world
          </p>
        </div>

        <button
          className="
            bg-[#181e4b]
            hover:bg-[#2d356f]
            text-white
            px-7 py-4
            rounded-xl
            transition duration-300
            shadow-lg
          "
        >
          View All Images
        </button>
=======
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

>>>>>>> 345cc81fa34e4a055abcb588121de3092da7f524
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

<<<<<<< HEAD
        {gallery.map((item, index) => (
          <div
            key={index}
            className="
              relative overflow-hidden rounded-3xl
              group cursor-pointer
              shadow-xl
            "
          >
            <img
              src={item.image}
              alt={item.title}
              className="
                w-full h-[320px]
                object-cover
                group-hover:scale-110
                transition duration-500
              "
            />

            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-black/70
                via-black/20
                to-transparent
              "
            />

            <div className="absolute bottom-5 left-5 text-white">
              <h3 className="text-xl font-semibold">
                {item.title}
              </h3>

              <p className="text-sm text-gray-200">
                {item.location}
              </p>
            </div>
          </div>
=======
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
>>>>>>> 345cc81fa34e4a055abcb588121de3092da7f524
        ))}

      </div>

    </section>
  );
}