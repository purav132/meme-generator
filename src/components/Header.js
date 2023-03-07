import React from "react";
import logo from "../images/troll-face.png";

export default function Header() {
  return (
    <header>
      <div className="header-left">
        <img className="header-logo" src={logo} alt="fdfdf" />
        <span className="header-title">Meme Generator</span>
      </div>
      <h4 className="header-text">React - Project</h4>
    </header>
  );
}
