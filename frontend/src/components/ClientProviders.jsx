"use client";

import ShopContextProvider from "@/context/ShopContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientProviders = ({ children }) => {
  return (
    <ShopContextProvider>
      <ToastContainer />
      {children}
    </ShopContextProvider>
  );
};

export default ClientProviders;
