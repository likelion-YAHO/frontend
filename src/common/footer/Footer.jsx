import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import CommonButton from "../../components/button/IconButton";

import snapSel from "../../assets/images/icons/SelectedSnap_icon.svg";
import snapUnsel from "../../assets/images/icons/UnselectedSnap_icon.svg";

import homeSel from "../../assets/images/icons/SelectedHome_icon.svg";
import homeUnsel from "../../assets/images/icons/UnselectedHome_icon.svg";

import ucycleSel from "../../assets/images/icons/SelectedUcycle_icon.svg";
import ucycleUnsel from "../../assets/images/icons/UnselectedUcycle_icon.svg";

const FooterContainer = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 86px;

  z-index: 100;

  transform: translateY(${({ $hidden }) => ($hidden ? "100%" : "0")});
  transition: transform 0.3s ease;
`;

const Nav = styled.nav`
  width: 100%;
  height: 86px;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  gap: 42px;

  padding: 14px 16px 0;
  box-sizing: border-box;

  background: #ffffff;

  border-top: 1px solid #e6e6e6;
  box-shadow: 0 -6px 18px rgba(0, 0, 0, 0.18);
`;

const NavButton = styled(CommonButton)`
  width: 60px;

  padding: 6px 0px 30px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  gap: 2px;
  padding: 0;
`;

const NavIcon = styled.img`
  width: 24px;
  height: 24px;

  object-fit: contain;
`;

const NavLabel = styled.span`
  width: 100%;

  text-align: center;

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 500;

  color: ${({ $active }) => ($active ? "#141414" : "#727272")};
`;

export default function Footer({ $hidden }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("home");
  const [hovered, setHovered] = useState(null);

  const handleUpcycleClick = () => {
    setSelected("ucycle");
    navigate("/upcycle");
  };

  const isSnapActive = selected === "snap" || hovered === "snap";
  const isHomeActive = selected === "home" || hovered === "home";
  const isUcycleActive = selected === "ucycle" || hovered === "ucycle";

  return (
    <FooterContainer $hidden={$hidden}>
      <Nav>
        {/* 스냅 */}
        <NavButton
          onClick={() => setSelected("snap")}
          onMouseEnter={() => setHovered("snap")}
          onMouseLeave={() => setHovered(null)}
        >
          <NavIcon src={isSnapActive ? snapSel : snapUnsel} alt="스냅" />
          <NavLabel $active={isSnapActive}>스냅</NavLabel>
        </NavButton>

        {/* 홈 */}
        <NavButton
          onClick={() => setSelected("home")}
          onMouseEnter={() => setHovered("home")}
          onMouseLeave={() => setHovered(null)}
        >
          <NavIcon src={isHomeActive ? homeSel : homeUnsel} alt="홈" />
          <NavLabel $active={isHomeActive}>홈</NavLabel>
        </NavButton>

        {/* 업사이클 */}
        <NavButton
          onClick={handleUpcycleClick}
          onMouseEnter={() => setHovered("ucycle")}
          onMouseLeave={() => setHovered(null)}
        >
          <NavIcon
            src={isUcycleActive ? ucycleSel : ucycleUnsel}
            alt="업사이클"
          />
          <NavLabel $active={isUcycleActive}>업사이클</NavLabel>
        </NavButton>
      </Nav>
    </FooterContainer>
  );
}