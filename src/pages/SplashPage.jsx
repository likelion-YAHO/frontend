import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import splashBg from "../assets/images/splash-bg_image.jpg";
import logo from "../assets/images/icons/Mcm-w_icon.svg";

const SplashContainer = styled.div`
  position: relative;

  width: 100%;
  height: 100vh;

  overflow: hidden;
`;

const Background = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
`;

const Logo = styled.img`
  position: absolute;

  top: 50%;
  left: 50%;

  width: 140px;
  height: auto;

  opacity: ${({ $show }) => ($show ? 1 : 0.3)};

  transform: translate(-50%, -50%);

  transition: opacity 3.5s ease;
`;

function SplashPage() {
  const navigate = useNavigate();
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setShowLogo(true);
    }, 100);

    const navigateTimer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 3600);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <SplashContainer>
      <Background src={splashBg} alt="" />

      <Logo src={logo} alt="MCM" $show={showLogo} />
    </SplashContainer>
  );
}

export default SplashPage;
