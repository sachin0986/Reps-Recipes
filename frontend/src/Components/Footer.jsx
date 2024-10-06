import React from "react";
import { RiGithubLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { GITHUB_URL, LINKEDIN_URL } from "../Utils/Constants";


const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_Left">
        <a href={GITHUB_URL} className="Logo" target="_blank" rel="noopener noreferrer">
          <RiGithubLine size={40} />
        </a>
        <a href={LINKEDIN_URL} className="Logo" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={40} />
        </a>
      </div>
      <div className="textContainer">
        <p className="text">made with love @sachinarora</p>
      </div>
    </div>
  );
};

export default Footer;