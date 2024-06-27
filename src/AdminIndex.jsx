import React from "react";
import ReactDOM from "react-dom/client";
import "./AdminIndex.css";
import App from "./AdminApp";
import { SearchProvider } from "./components/admin/SearchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

function AdminIndex() {
  return root.render(
    <React.StrictMode>
      <SearchProvider>
        <App />
      </SearchProvider>
    </React.StrictMode>
  );
}

export default AdminIndex;

