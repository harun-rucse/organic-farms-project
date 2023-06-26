import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import HeaderLink from "@/components/layout/HeaderLink";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <HeaderLink />
      <div className="flex-1 container mx-auto p-4 lg:p-6">{children}</div>
      <Footer />

      <Navigation />
    </div>
  );
}

export default Layout;
