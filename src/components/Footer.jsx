import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#181e4b] text-white pt-20">

      <div className="grid lg:grid-cols-4 gap-10 px-8 lg:px-20 pb-20">

        <div>

          <h2 className="text-3xl font-volkhov-bold mb-5">
            Tour Guide
          </h2>

          <p className="text-gray-300 leading-7">
            Become Tour guide for Us
          </p>

        </div>

        <div>

          <h3 className="font-poppins-semibold mb-5">
            Company
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li>About Us</li>
            <li>Blog</li>
            <li>Careers</li>
          </ul>

        </div>

        <div>

          <h3 className="font-poppins-semibold mb-5">
            Help
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
          </ul>

        </div>

        <div>

          <h3 className="font-poppins-semibold mb-5">
            Social Media
          </h3>

            <div className="flex items-center gap-4">

            <button className="footer-social-btn">
                <FaFacebookF />
            </button>

            <button className="footer-social-btn">
                <FaTwitter />
            </button>

            <button className="footer-social-btn">
                <FaInstagram />
            </button>

            <button className="footer-social-btn">
                <FaPinterestP />
            </button>

            </div>

        </div>

      </div>

      <div className="border-t border-white/10 py-6 text-center text-gray-400 text-sm">
        Copyright 2026 Tour Guide. All Rights Reserved
      </div>

    </footer>
  );
}