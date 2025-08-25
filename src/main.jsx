import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./Components/Context/AuthContext.jsx";
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <AuthContextProvider >
    <StrictMode>
      <QueryClientProvider client={queryClient}>
       <ToastContainer position="bottom-right"/>
        <App />
      </QueryClientProvider>
    </StrictMode>
   </AuthContextProvider>
);
