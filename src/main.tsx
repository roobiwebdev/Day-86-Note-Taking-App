import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage.js";
import { Provider } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute.js";
import store from "./store/store.js";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/Dashboard",
    element: (
      <ProtectedRoute>
        <App />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "14px",
            color: "#2B303B",
            borderRadius: "8px",
            boxShadow: "none",
            border: "1px solid #E0E4EA",
          },
        }}
      />
    </Provider>
  </StrictMode>
);
