import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaSquareUpwork } from "react-icons/fa6";
import { SiBento } from "react-icons/si";
import { Link } from "react-router-dom";

const ButtonsStyle = {
  glocyButtons: `px-5 py-2 rounded-3xl shadow-lg text-white font-semibold transition-all duration-300 backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20`,
};


const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-4">
      {/* Freelance Section with Background Image */}
      <div
        className="relative text-center p-6 md:p-10 mb-8 rounded-3xl"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dm2ek1ift/image/upload/v1739801151/bg_m7sod6.avif")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-opacity-50 p-6 rounded-3xl">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Health?
          </h1>
          <h3 className="text-gray-300 text-lg md:text-xl mb-6">
            I am available for freelance projects, remote work, or just
            discussing design. Feel free to ping me at
          </h3>
          <div className="flex justify-center">
            <Link to="/aipage">
          <button className="px-5 py-2 rounded-3xl shadow-lg text-white font-semibold transition-all duration-300 backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20">
      <span className="text-[#BFFF00]">Use AI</span>
    </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Left Side - Name */}
       <img className="h-[150px] w-[160px]" src="/src/assets/logo.png" alt="logo.png" />

        {/* Center - Social Links */}
        <div className="flex space-x-6">
          <a
            href="https://github.com/sachin0986"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/sachin0986"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://bento.me/sachin0986"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <SiBento size={24} />
          </a>
          <a
            href="mailto:sachin.arora@example.com"
            className="text-gray-400 hover:text-white transition"
          >
            <FaEnvelope size={24} />
          </a>
          <a
            href="https://bento.me/sachin0986"
            className="text-gray-400 hover:text-white transition"
          >
            <FaSquareUpwork size={24} />
          </a>
        </div>

        {/* Right Side - Buttons */}
        <div className="flex space-x-4">
        <div>
      <Link to="/contact">
        <button className={ButtonsStyle.glocyButtons}>
          <span className="text-[#BFFF00]">Contact me</span>
        </button>
      </Link>
    </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-400 mt-8 text-sm">
        © {new Date().getFullYear()} Sachin Arora. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
