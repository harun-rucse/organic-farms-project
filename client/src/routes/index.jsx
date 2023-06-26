import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Branch from "@/pages/Branch";
import Shop from "@/pages/Shop";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/branches" element={<Branch />} />
      <Route path="/shop" element={<Shop />} />
    </Routes>
  );
}
