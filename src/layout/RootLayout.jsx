import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";

const Layout = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

const Main = styled.main`
  padding-top: 52px;
  padding-bottom: 86px;
`;
export default function RootLayout() {
  return (
    <Layout>
      <Header />

      <Main>
        <Outlet />
      </Main>

      <Footer />
    </Layout>
  );
}
