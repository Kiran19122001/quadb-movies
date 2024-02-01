import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movies from "./components/Movies";
import MovieDetails from "./components/MovieDetails";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movieId/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
