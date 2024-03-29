import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./pages/SignIn";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import DetailCourse from "./pages/DetailCourse";
import Profile from "./pages/user/Profile";
import Checkout from "./pages/Checkout";
import CreateCourse from "./pages/user/CreateCourse";
import Certificate from "./pages/user/Certificate";
import Review from "./pages/Review";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Dashboard from "./pages/instructor/Dashboard";
import Reviews from "./pages/instructor/Reviews";
import Settings from "./pages/instructor/Settings";
import AdminCertificate from "./pages/admin/Certificate";
import Courses from "./pages/admin/Courses";
import CreateCourseInstructor from "./pages/instructor/CreateCourseInstructor";
import CertificateInstructor from "./pages/instructor/CertificateInstructor";
import InstructorRoute from "./components/InstructorRoute";

function App() {
  const initialOptions = {
    clientId:
      "AR1UGb6qHlyFIl7cVxHU2lQ-JacoTFFyHy7pFDQrMuaWhoIzsiJ-zdImCz6IvxvakP_sNJWqZF0ynfBu",
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <BrowserRouter>
        <div className="app">
          <Toaster />
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/course/:id" element={<DetailCourse />} />
              <Route path="/review/:id" element={<Review />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-course"
                element={
                  <ProtectedRoute>
                    <CreateCourse />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/certificate"
                element={
                  <ProtectedRoute>
                    <Certificate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/instructor"
                element={
                  <InstructorRoute>
                    <Dashboard />
                  </InstructorRoute>
                }
              />
              <Route
                path="/instructor/reviews"
                element={
                  <InstructorRoute>
                    <Reviews />
                  </InstructorRoute>
                }
              />
              <Route
                path="/instructor/settings"
                element={
                  <InstructorRoute>
                    <Settings />
                  </InstructorRoute>
                }
              />
              <Route
                path="/instructor/create-course"
                element={
                  <InstructorRoute>
                    <CreateCourseInstructor />
                  </InstructorRoute>
                }
              />
              <Route
                path="/instructor/certificate"
                element={
                  <InstructorRoute>
                    <CertificateInstructor />
                  </InstructorRoute>
                }
              />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/certificate" element={<AdminCertificate />} />
              <Route path="/admin/course" element={<Courses />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
