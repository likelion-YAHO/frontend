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

  // /main, /profile, /orders, /inquiry는 RootLayout을 공유하는 페이지들이므로
  // 이 페이지들끼리 전환될 때는 Routes의 key를 동일하게 유지해서
  // RootLayout이 언마운트/리마운트되지 않도록 한다.
  // (RootLayout 내부의 PageSlide 슬라이드 애니메이션이 정상 작동하려면 필수)
  const layoutSharedPaths = ["/main", "/profile", "/orders", "/inquiry"];
  const routeKey = layoutSharedPaths.includes(location.pathname)
    ? "layout"
    : location.pathname;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={routeKey}>
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
