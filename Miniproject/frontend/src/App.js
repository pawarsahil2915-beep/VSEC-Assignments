import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ReportItem from "./pages/ReportItem";
import ViewItems from "./pages/ViewItems";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header>
        <h2>Campus Lost & Found</h2>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/report">Report Item</Link>
          <Link to="/items">View Items</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ReportItem />} />
        <Route path="/items" element={<ViewItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;