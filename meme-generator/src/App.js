import React from "react";
import Header from "./components/Header";
import Meme from "./components/Meme";
import "./style.css";

/**
 * Challenge: Build the Header component
 */
export default function App() {
  return (
    <div className="container">
      <Header />
      <Meme />
    </div>
  );
}
