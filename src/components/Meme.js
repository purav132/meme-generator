import React from "react";
// import html2canvas from "html2canvas";
import { toJpeg } from "html-to-image";
import format from "date-fns/format";
// import memesData from "../memesData";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImg: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMeme, setAllMeme] = React.useState([]);
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMeme(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMeme.length);
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImg: allMeme[randomNumber].url,
      topText: "",
      bottomText: "",
    }));
  }

  function handleChange(event) {
    setMeme((prevMeme) => ({
      ...prevMeme,
      [event.target.name]: event.target.value,
    }));
  }

  const ref = React.useRef(null);

  const handleDownloadImage = React.useCallback(() => {
    if (ref.current === null) {
      return;
    }
    toJpeg(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${format(new Date(), "'meme-'HH-mm-ss")}.jpg`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <main>
      <div className="meme-form">
        <div className="meme-form-input">
          <input
            className="meme-form-input1"
            type="text"
            placeholder="Top Text"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
          <input
            className="meme-form-input2"
            type="text"
            placeholder="Bottom Text"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>
        <button className="meme-form-submit" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div ref={ref} className="meme">
        <img src={meme.randomImg} className="meme-photo" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
      <button
        className="meme-download-button"
        type="button"
        onClick={handleDownloadImage}
      >
        Download Meme 👇🏻
      </button>
    </main>
  );
}
