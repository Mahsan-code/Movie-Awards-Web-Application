
import react, { useState } from "react";
import './App.css';
import Omdb from './component/omdb-serach'
function App() {
  const [inputText, setinputText] = useState("");
  const [movies, setMovies] = useState([]);
  return (
    <div className="App">
      <Omdb
        movies={movies}
        setMovies={setMovies}
        setinputText={setinputText}
        inputText={inputText}
      />
    </div>
  );
}

export default App;
