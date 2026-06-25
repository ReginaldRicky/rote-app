import { FaFacebookF, FaApple, FaGoogle } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <div className="mt-10 text-center">
      <p className="text-gray-400 mb-6 font-poppins-medium">or continue with</p>

      <div className="flex justify-center gap-5">
        <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:scale-105 transition">
          <FaFacebookF className="text-blue-600" />
        </button>

        <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:scale-105 transition">
          <FaApple className="text-black" />
        </button>

        <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:scale-105 transition">
          <FaGoogle className="text-red-500" />
        </button>
      </div>
    </div>
  );
}