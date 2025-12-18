import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { HelmetProvider } from "react-helmet-async";

import "./index.css";
import "./assets/style.css";

import App from "./App.jsx";
import ScrollToTop from "./components/ScrollToTop";

createRoot(document.getElementById("root")).render(
  // <HelmetProvider>
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
  // </HelmetProvider>
);
