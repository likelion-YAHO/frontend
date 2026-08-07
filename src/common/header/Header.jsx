import styled from "styled-components";

import CommonButton from "../../components/button/CommonButton";

import menuIcon from "../../assets/images/icons/Menu_icon.svg";
import logo from "../../assets/images/icons/Mcm_icon.svg";
import alarmIcon from "../../assets/images/icons/UnalertBell_icon.svg";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: 390px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px 20px;
  box-sizing: border-box;

  background: #ffffff;

  z-index: 100;
`;

const HeaderButton = styled(CommonButton)`
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;

  object-fit: contain;
`;

const Logo = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  width: auto;
  height: 26px;

  object-fit: contain;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderButton>
        <Icon src={menuIcon} alt="메뉴" />
      </HeaderButton>

      <Logo src={logo} alt="MCM" />

      <HeaderButton>
        <Icon src={alarmIcon} alt="알림" />
      </HeaderButton>
    </HeaderContainer>
  );
}
