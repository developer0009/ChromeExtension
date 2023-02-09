import React, { useState } from "react";
import "./App.css";
import { detectLang, getSummary } from "./utils/model";
import Spinner from "./utils/Spinner";
const VideoSummarizer = () => {
  const [summary, setSummary] = useState({ loading: false, text: "" });
  const [text, setText] = useState("");
  const [lang, setLang] = useState("");
  return (
    <div className="App">
      <h3>
        Get TimeComplexity Of Code : <i class="fa-solid fa-clock"></i>
      </h3>
      {text.length > 0 && <h5>language is : {lang}</h5>}
      <p>{summary.loading ? <Spinner /> : summary.text}</p>
      <textarea
        name="code"
        id=""
        cols="30"
        rows="20"
        spellCheck="false"
        placeholder="enter your code here...."
        typeof="code"
        value={text}
        onChange={(evt) => {
          setText(evt.target.value);
          detectLang(text, setLang);
        }}
      >
        <code></code>
      </textarea>
      <button
        onClick={() => {
          if (text.length === 0) alert("enter the code first!!");
          else getSummary(text, setSummary, setText, setLang);
        }}
      >
        Click To Get TC
      </button>
    </div>
  );
};

export default VideoSummarizer;
