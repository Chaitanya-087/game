import './app.css'
import XoPage from "./pages/XoPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import XOGrid from "./components/XOGrid";
import { XoContextProvider } from "./helper/xoContext";

export default function App() {

  return (
    <XoContextProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/game/" element={<XoPage />} />
            <Route path="/game/xo" element={<XOGrid />} />
          </Routes>
        </Router>
      </div>
    </XoContextProvider>
  );
}