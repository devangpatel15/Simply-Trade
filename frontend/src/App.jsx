import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signup";
import SignInPage from "./pages/Signin";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import DashboardPage from "./pages/DashboardPage";
import OrganizationPage from "./pages/OrganizationPage";
import OrganizationForm from "./components/OrganizationForm";
import OtpPage from "./pages/Otp";
import SignInByOtpPage from "./pages/SignInByOtpPage";
import NotFound404 from "./pages/NotFound404";

function App() {
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/signIn" />;
  };

  const PublicRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? <Navigate to="/dashboard" /> : children;
  };

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/signIn"
          element={
            <PublicRoute>
              <SignInPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signInByOtp"
          element={
            <PublicRoute>
              <SignInByOtpPage />
            </PublicRoute>
          }
        />
        <Route
          path="/otpPage"
          element={
            <PublicRoute>
              <OtpPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/organizationPage"
          element={
            <PrivateRoute>
              <OrganizationPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/organizationForm"
          element={
            <PrivateRoute>
              <OrganizationForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/organizationForm/:id"
          element={
            <PrivateRoute>
              <OrganizationForm />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
