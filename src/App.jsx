import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import RootLayout from "./layout/RootLayout";
import MainPage from "./pages/MainPage/MainPage";
import SplashPage from "./pages/SplashPage";
import LoginPage from "./pages/LoginPage";
import RegisterProductPage from "./pages/Upcycle/RegisterProductPage";
import CustomProductPage from "./pages/Upcycle/CustomProductPage";
import ReservationPage from "./pages/Upcycle/ReservationPage";
import ProfilePage from "./pages/ProfilePage";
import OrderPage from "./pages/Order/OrderPage";
import PageTransition from "./components/pageTransition/PageTransition";
import InquiryPage from "./pages/Inquiry/InquiryPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <SplashPage />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <LoginPage />
            </PageTransition>
          }
        />
        <Route
          path="/upcycle"
          element={
            <PageTransition>
              <RegisterProductPage />
            </PageTransition>
          }
        />
        <Route
          path="/upcycle/custom"
          element={
            <PageTransition>
              <CustomProductPage />
            </PageTransition>
          }
        />
        <Route
          path="/upcycle/reservation"
          element={
            <PageTransition>
              <ReservationPage />
            </PageTransition>
          }
        />
        <Route element={<RootLayout />}>
          <Route
            path="/main"
            element={
              <PageTransition>
                <MainPage />
              </PageTransition>
            }
          />
          <Route
            path="/profile"
            element={
              <PageTransition>
                <ProfilePage />
              </PageTransition>
            }
          />
          <Route
            path="/orders"
            element={
              <PageTransition>
                <OrderPage />
              </PageTransition>
            }
          />
          <Route
            path="/inquiry"
            element={
              <PageTransition>
                <InquiryPage />
              </PageTransition>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
