import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import SignInPage from "./pages/Signin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signIn" element={<SignInPage />} />
    </Routes>
  );
}

export default App;
