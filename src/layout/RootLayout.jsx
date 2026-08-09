import { Outlet } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";

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
  const prevScrollTop = useRef(0);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const handleScroll = () => {
      const currentScrollTop = el.scrollTop;
      const diff = currentScrollTop - prevScrollTop.current;

      if (currentScrollTop <= 0) {
        setNavHidden(false);
      } else if (diff > 5) {
        setNavHidden(true); // 아래로 스크롤 → 헤더/푸터 둘 다 숨김
      } else if (diff < -5) {
        setNavHidden(false); // 위로 스크롤 → 둘 다 다시 보임
      }

      prevScrollTop.current = currentScrollTop;
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Screen>
      <Frame>
        <Header $hidden={navHidden} />
        <Main ref={mainRef}>
          <Outlet />
        </Main>
        <Footer $hidden={navHidden} />
      </Frame>
    </Screen>
  );
}