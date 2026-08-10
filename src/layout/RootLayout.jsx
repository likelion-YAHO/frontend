import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import Header from "../common/header/Header";
import SubHeader from "../common/header/SubHeader";
import Footer from "../common/footer/Footer";
import SideMenu from "../common/header/SideMenu";

import Modal from "../components/modal/Modal";
import IntentButton from "../components/button/IntentButton";

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

  padding-bottom: ${({ $hideFooter }) => ($hideFooter ? "0" : "86px")};

  box-sizing: border-box;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ModalButtonArea = styled.div`
  width: 100%;

  margin-top: 20px;

  display: flex;
  gap: 4px;
`;

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const mainRef = useRef(null);
  const prevScrollTop = useRef(0);

  const [navHidden, setNavHidden] = useState(false);

  // 사이드 메뉴
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 로그아웃 확인 모달
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // 로그인한 사용자
  const user = JSON.parse(localStorage.getItem("user"));

  // 현재 프로필 관리 페이지인지 확인
  const isProfilePage = location.pathname === "/profile";

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

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");

    setIsLogoutModalOpen(false);
    setIsMenuOpen(false);

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <Screen>
      <Frame>
        {/* 페이지에 따라 Header 변경 */}
        {isProfilePage ? (
          <SubHeader title="프로필 관리" onBack={() => navigate("/main")} />
        ) : (
          <Header $hidden={navHidden} onMenuClick={() => setIsMenuOpen(true)} />
        )}

        <Main ref={mainRef} $hideFooter={isProfilePage}>
          <Outlet />
        </Main>

        {/* 프로필 페이지에서는 Footer 숨김 */}
        {!isProfilePage && <Footer $hidden={navHidden} />}

        {/* 사이드 메뉴 */}
        {isMenuOpen && !isProfilePage && (
          <SideMenu
            user={user}
            onClose={() => setIsMenuOpen(false)}
            onLogoutClick={handleLogoutClick}
          />
        )}

        {/* 로그아웃 확인 모달 */}
        {isLogoutModalOpen && (
          <Modal title="로그아웃" description="로그아웃 하시겠습니까?">
            <ModalButtonArea>
              <IntentButton
                variant="white"
                width="152px"
                height="34px"
                onClick={handleLogout}
              >
                네
              </IntentButton>

              <IntentButton
                variant="black"
                width="152px"
                height="34px"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                아니요
              </IntentButton>
            </ModalButtonArea>
          </Modal>
        )}
      </Frame>
    </Screen>
  );
}
