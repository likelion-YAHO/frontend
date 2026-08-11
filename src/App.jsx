import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import MainPage from "./pages/MainPage/MainPage";
import SplashPage from "./pages/SplashPage";
import LoginPage from "./pages/LoginPage";
import RegisterProductPage from "./pages/Upcycle/RegisterProductPage";
import CustomProductPage from "./pages/Upcycle/CustomProductPage";
import ProfilePage from "./pages/ProfilePage";
import OrderPage from "./pages/Order/OrderPage";
import PageTransition from "./components/pageTransition/PageTransition";

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
