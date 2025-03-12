import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import SignInPage from "./pages/Signin";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import DashboardPage from "./pages/DashboardPage";
import OrganizationPage from "./pages/OrganizationPage";
import OrganizationForm from "./components/OrganizationForm";
import OtpPage from "./pages/Otp";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/organizationPage" element={<OrganizationPage />} />
        <Route path="/organizationForm" element={<OrganizationForm />} />
        <Route path="/otpPage" element={<OtpPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
