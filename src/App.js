import "./App.css";
// import TextFile from Material UI
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { BiLocationPlus } from 'react-icons/bi';


function App() {
  const [text, setText] = useState("");
  const [gifs, setGifs] = useState([]);

  // "async" means that you can now use the word
  // "await" within this function!
  async function search() {
    const key = "LOXyL74y5GuIdwV0o8p6j4sILlXJ40iG";
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${text}&limit=25&offset=0&lang=en`;
    const r = await fetch(url);
    const j = await r.json();
    setGifs(j.data);
  }

  console.log(gifs);
  return (
    <div className="App">
      <div className="searchbar">
        {/*  "outlined" variant prop gives the nice animation */}
        <BiLocationPlus size="24" />
        <TextField
          id="search"
          label="Enter you zip code"
          variant="outlined"
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyPress={(e) => {
            if (e.key === "Enter") search();
            <BiLocationPlus size="24" />
          }}
        />
        <Button variant="outlined" onClick={search} size="large">
          Search
        </Button>
      </div>
      <div className="gifs">
        {gifs.map((gif, i) => {
          return <img key={i} src={gif.images.fixed_height.url} />;
        })}
      </div>
    </div>
  );
}

export default App;

