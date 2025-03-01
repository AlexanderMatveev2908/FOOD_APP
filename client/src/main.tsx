// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import GlobalProvider from "./context/global/GlobalProvider.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    {/* <Auth0ProviderComponent> */}
    <GlobalProvider>
      <App />
    </GlobalProvider>
    {/* </Auth0ProviderComponent> */}
  </BrowserRouter>
  // </StrictMode>
);
