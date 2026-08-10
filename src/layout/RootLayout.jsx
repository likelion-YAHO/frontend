import { Outlet } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import SideMenu from "../common/header/SideMenu";

const Screen = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;

  background: #f2f2f2;
`;

const Frame = styled.div`
  position: relative;

  width: 100%;
  max-width: 390px;
  height: 100vh;

  background: #ffffff;

  overflow: hidden;
`;

const Main = styled.main`
  position: absolute;

  top: 0;
  bottom: 0;
  left: 0;

  width: 100%;

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  padding-top: 44px;
  padding-bottom: 86px;

  box-sizing: border-box;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function RootLayout() {
  const mainRef = useRef(null);

  const [navHidden, setNavHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const prevScrollTop = useRef(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const el = mainRef.current;

    if (!el) return;

    const handleScroll = () => {
      const currentScrollTop = el.scrollTop;
      const diff = currentScrollTop - prevScrollTop.current;

      if (currentScrollTop <= 0) {
        setNavHidden(false);
      } else if (diff > 5) {
        setNavHidden(true);
      } else if (diff < -5) {
        setNavHidden(false);
      }

      prevScrollTop.current = currentScrollTop;
    };

    el.addEventListener("scroll", handleScroll, { passive: true });

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Screen>
      <Frame>
        <Header $hidden={navHidden} onMenuClick={() => setIsMenuOpen(true)} />

        <Main ref={mainRef}>
          <Outlet />
        </Main>

        <Footer $hidden={navHidden} />

        {isMenuOpen && (
          <SideMenu user={user} onClose={() => setIsMenuOpen(false)} />
        )}
      </Frame>
    </Screen>
  );
}
