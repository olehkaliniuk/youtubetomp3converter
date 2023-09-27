import { useRef, useState } from "react";
import "./index.css";
import axios from "axios";
import { youtube_parser } from "./utils";

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const youtubeID = youtube_parser(inputUrlRef.current.value);
    console.log(youtubeID);

    const options = {
      method: "get",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      headers: {
        "X-RapidAPI-Key": "fb4ce5dc6bmsh531cff703bc6276p15ded1jsnf64fb35ee5b0",
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
      params: {
        id: youtubeID,
      },
    };
    axios(options)
      .then((res) => setUrlResult(res.data.link))
      .catch((err) => console.log(err));

    inputUrlRef.current.value = "";
  };
  return (
    <div className="app">
      <div className="header">
        <span className="logo">YouTubeToMP3</span>
      </div>

      <section className="content">
        <h1 className="content-title">YouTube to MP3 Converter</h1>
        <p className="content-description">
          Transform YouTube videos into MP3s in just a few clicks!
        </p>
        <form onSubmit={handleSubmit} className="form">
          <input
            ref={inputUrlRef}
            className="form-input"
            placeholder="Paste a YouTube video URL link..."
            type="text"
          />
          <button className="form-button" type="submit">
            Search
          </button>
        </form>
        {urlResult ? (
          <a
            className="download-btn"
            target="_blankl"
            rel="noreferrer"
            href={urlResult}
          >
            Download MP3
          </a>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}

export default App;
