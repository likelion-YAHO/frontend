import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import IconButton from "../../components/button/IconButton";
import ProfileButton from "../../components/button/ActionButton";

import profileIcon from "../../assets/images/icons/profile_icon.svg";
import logoutIcon from "../../assets/images/icons/logout_icon.svg";
import rightArrow from "../../assets/images/icons/rightArrow.svg";

const Overlay = styled.div`
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgba(0, 0, 0, 0.45);

  z-index: 200;
`;

const MenuContainer = styled.aside`
  position: absolute;
  top: 44px;
  left: 0;

  width: 82%;
  height: calc(100% - 44px);

  background: #fbfbfb;

  overflow-y: auto;

  z-index: 201;
`;
const ProfileArea = styled.div`
  padding: 32px 20px;
  box-sizing: border-box;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  width: 100%;
`;

const ProfileIcon = styled.img`
  width: 45px;
  height: 45px;

  object-fit: contain;

  margin-right: 20px;
`;

const UserText = styled.div`
  flex: 1;
`;

const UserName = styled.p`
  margin: 0px;

  color: #141414;

  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
`;

const UserId = styled.p`
  margin: 0;

  color: #727272;

  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

const LogoutButton = styled(IconButton)`
  width: 32px;
  height: 32px;

  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoutIcon = styled.img`
  width: 18px;
  height: 18px;

  object-fit: contain;
`;

const ProfileButtonArea = styled.div`
  width: 100%;

  margin-top: 12px;

  display: flex;
  gap: 4px;
`;

const MenuList = styled.div`
  width: 100%;

  border-top: 1px solid #e3e3e3;
`;

const MenuItem = styled.button`
  width: 100%;
  height: 48px;

  padding: 12px 20px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: none;

  background: #fbfbfb;

  color: #141414;

  font-size: 16px;
  font-weight: 500;
  text-align: left;

  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const ArrowIcon = styled.img`
  width: 4px;
  height: 9px;

  object-fit: contain;
`;

export default function SideMenu({ user, onClose, onLogoutClick }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  const handleExternalLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Overlay onClick={onClose} />

      <MenuContainer>
        <ProfileArea>
          <UserInfo>
            <ProfileIcon src={profileIcon} alt="프로필" />

            <UserText>
              <UserName>{user?.name} 님</UserName>

              <UserId>{user?.loginId}</UserId>
            </UserText>

            <LogoutButton type="button" onClick={onLogoutClick}>
              <LogoutIcon src={logoutIcon} alt="로그아웃" />
            </LogoutButton>
          </UserInfo>

          <ProfileButtonArea>
            <ProfileButton
              width="138px"
              height="30px"
              onClick={() => handleNavigate("/profile")}
            >
              프로필 관리
            </ProfileButton>

            <ProfileButton width="138px" height="30px">
              주문 내역
            </ProfileButton>
          </ProfileButtonArea>
        </ProfileArea>

        <MenuList>
          <MenuItem type="button">
            MCM Lab
            <ArrowIcon src={rightArrow} alt="" />
          </MenuItem>

          <MenuItem
            type="button"
            onClick={() =>
              handleExternalLink(
                "https://kr.mcmworldwide.com/ko_KR/heritage-edit",
              )
            }
          >
            MCM 소개
            <ArrowIcon src={rightArrow} alt="" />
          </MenuItem>

          <MenuItem type="button">
            커스텀 매뉴얼
            <ArrowIcon src={rightArrow} alt="" />
          </MenuItem>

          <MenuItem
            type="button"
            onClick={() =>
              handleExternalLink(
                "https://kr.mcmworldwide.com/ko_KR/%EC%8B%A0%EC%83%81%ED%92%88/autumn-winter",
              )
            }
          >
            2026 F/W 컬렉션 둘러보기
            <ArrowIcon src={rightArrow} alt="" />
          </MenuItem>

          <MenuItem
            type="button"
            onClick={() =>
              handleExternalLink(
                "https://kr.mcmworldwide.com/ko_KR/%EC%8B%A0%EC%83%81%ED%92%88/mcm-x-dj-khaled-x-we-the-best",
              )
            }
          >
            MCM x DJ Khaled x We the Best
            <ArrowIcon src={rightArrow} alt="" />
          </MenuItem>
        </MenuList>
      </MenuContainer>
    </>
  );
}
