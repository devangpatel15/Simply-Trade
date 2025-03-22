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
import OrganizationBranchPage from "./pages/OrganizationBranchPage";
import Category from "./pages/Category";
import CategoryForm from "./components/CategoryForm";
import ModelPage from "./pages/ModelPage";
import ModelForm from "./components/ModelForm";
import DevicePage from "./pages/DevicePage";
import DeviceForm from "./components/DeviceForm";
import ColorForm from "./components/ColorForm";
import ColorPage from "./pages/ColorPage";
import UserPage from "./pages/UserPage";
import UserForm from "./components/UserForm";
import OrganizationBranchForm from "./components/OrganizationBranchForm";
import CapacityPage from "./pages/CapacityPage";
import CapacityForm from "./components/CapacityForm";
<<<<<<< HEAD
import StockPage from "./pages/StockPage";
import StockForm from "./components/StockForm";
import CustomerPage from "./pages/CustomerPage";
import CustomerForm from "./components/CustomerForm";
=======
import CustomerPage from "./pages/CustomerPage";
import CustomerForm from "./components/CustomerForm";
>>>>>>> 98823aeb05638f39bc16d5c9f13ffde65062cf35

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

        <Route
          path="/organizationBranchPage"
          element={
            <PrivateRoute>
              <OrganizationBranchPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/category"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        />
        <Route
          path="/organizationBranchForm"
          element={
            <PrivateRoute>
              <OrganizationBranchForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/organizationBranchForm/:id"
          element={
            <PrivateRoute>
              <OrganizationBranchForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/userPage"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/userForm"
          element={
            <PrivateRoute>
              <UserForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/userForm/:id"
          element={
            <PrivateRoute>
              <UserForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/categoryForm"
          element={
            <PrivateRoute>
              <CategoryForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/categoryForm/:id"
          element={
            <PrivateRoute>
              <CategoryForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/modelPage"
          element={
            <PrivateRoute>
              <ModelPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/modelForm"
          element={
            <PrivateRoute>
              <ModelForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/modelForm/:id"
          element={
            <PrivateRoute>
              <ModelForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/devicePage"
          element={
            <PrivateRoute>
              <DevicePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/deviceForm"
          element={
            <PrivateRoute>
              <DeviceForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/deviceForm/:id"
          element={
            <PrivateRoute>
              <DeviceForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/colorPage"
          element={
            <PrivateRoute>
              <ColorPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/colorForm"
          element={
            <PrivateRoute>
              <ColorForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/colorForm/:id"
          element={
            <PrivateRoute>
              <ColorForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/capacityPage"
          element={
            <PrivateRoute>
              <CapacityPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/capacityForm"
          element={
            <PrivateRoute>
              <CapacityForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/capacityForm/:id"
          element={
            <PrivateRoute>
              <CapacityForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/stockPage"
          element={
            <PrivateRoute>
              <StockPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/stockForm"
          element={
            <PrivateRoute>
              <StockForm />
              </PrivateRoute>}/>
        <Route
          path="/customerPage"
          element={
            <PrivateRoute>
              <CustomerPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/customerForm"
          element={
            <PrivateRoute>
              <CustomerForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/customerForm/:id"
          element={
            <PrivateRoute>
              <CustomerForm />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
