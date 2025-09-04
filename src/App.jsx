import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery.jsx";
import Viewer from "./pages/Viewer.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/product/:id" element={<Viewer />} />
      </Routes>
    </Router>
  );
}

export default App;
