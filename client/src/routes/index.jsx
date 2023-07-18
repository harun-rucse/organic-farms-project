import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Branch from "@/pages/Branch";
import Shop from "@/pages/Shop";
import ProductDetails from "@/pages/ProductDetails";
import Profile from "@/pages/Profile";
import ProfileEdit from "@/pages/ProfileEdit";
import Order from "@/pages/Order";
import OrderDetails from "@/pages/OrderDetails";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import PrivateOutlet from "./PrivateOutlet";
import PublicOutlet from "./PublicOutlet";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentFail from "@/pages/PaymentFail";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/branches" element={<Branch />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route element={<PrivateOutlet />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/profile/orders" element={<Order />} />
        <Route path="/profile/orders/:id" element={<OrderDetails />} />
        <Route path="/profile/settings" element={<Settings />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-failed" element={<PaymentFail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
