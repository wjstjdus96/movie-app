import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<Home />} />
        <Route path="movies/:listType/:id" element={<Home />} />
        <Route path="tvs/:id" element={<Tv />} />
        <Route path="/tvs" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:mediaType/:id" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
