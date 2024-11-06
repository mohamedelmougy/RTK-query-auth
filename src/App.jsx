import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/Auth/SignupPage";
import LoginPage from "./pages/Auth/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RequireAuth from "./components/RequireAuth";

function App() {
  const accessToken = Cookies.get("accessToken");
  console.log("🚀 ~ App ~ accessToken:", accessToken);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="auth">
          <Route
            path="login"
            element={
              accessToken ? <Navigate to="/dashboard" replace /> : <LoginPage />
            }
          />

          <Route
            path="signup"
            element={
              accessToken ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <SignupPage />
              )
            }
          />
        </Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
