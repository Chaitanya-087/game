import './app.css'
import XoPage from "./pages/XoPage";
import { Routes, Route } from "react-router-dom";
import XOGrid from "./components/XOGrid";
import { XoContextProvider } from "./helper/xoContext";

export default function App() {

  return (
    <XoContextProvider>
      <div className="App">
          <Routes>
            <Route exact path="/" element={<XoPage />} />
            <Route exact path="/xo" element={<XOGrid />} />
          </Routes>
      </div>
    </XoContextProvider>
  );
}