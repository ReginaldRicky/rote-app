import planeImage from "../assets/Pesawat.png";
import { FaPlay } from "react-icons/fa";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-white">

      <div className="hidden lg:block lg:w-[60%] relative overflow-hidden rounded-r-[40px]">

        <img
          src={planeImage}
          alt="Plane"
          className="w-full h-screen object-cover"
        />

        <div className="image-overlay">

        <div className="play-wrapper">
        <button className="play-button group">
            <div className="play-inner">
            <FaPlay className="play-icon" />
            </div>
        </button>
        </div>

        </div>
      </div>

      <div className="w-full lg:w-[40%] flex justify-center items-center px-8 py-12">
        {children}
      </div>

    </div>
  );
}