import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Home, AddPost, Post, EditPost, Login, Signup } from "./pages/index.js";
import AuthLayout from "./components/AuthLayout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        }
      />
      <Route
        path="/add-post"
        element={
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        }
      />
      <Route
        path="/edit-post/:slug"
        element={
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        }
      />
      <Route path="/post/:slug" element={<Post />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
