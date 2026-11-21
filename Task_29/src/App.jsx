import { Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Shop from "./pages/Shop";
import Payment from "./pages/Payment";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
}
