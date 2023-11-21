import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMeme, setAllMeme] = useState([]);

  useEffect(() => {
    console.log("Effect ran");
    const apiUrl = `https://api.imgflip.com/get_memes`;

    fetch(apiUrl)
      .then((rs) => rs.json())
      .then((data) => setAllMeme(data.data.memes));
  }, []);

  function getMemeImage(data) {
    const randomNumber = Math.floor(Math.random() * allMeme.length);
    const url = allMeme[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));

    // getMemeImage(data)
  }

  function handleChanges(e) {
    let { name, value } = e.target;

    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
  }

  return (
    <main>
      <Header />
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          onChange={handleChanges}
          name="topText"
          value={meme.topText}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          onChange={handleChanges}
          name="bottomText"
          value={meme.bottomText}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
