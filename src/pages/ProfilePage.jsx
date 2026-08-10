import { useState } from "react";
import styled from "styled-components";

import ActionButton from "../components/button/ActionButton";
import Accordion from "../components/accordion/Accordion";
import TextInput from "../components/input/TextInput";

import profileIcon from "../assets/images/icons/profile_icon.svg";
import toggleOn from "../assets/images/icons/toggleOn_icon.svg";
import toggleOff from "../assets/images/icons/toggleOff_icon.svg";

const Page = styled.div`
  width: 100%;
  min-height: 100%;

  padding: 32px 20px;
  box-sizing: border-box;

  background: #fbfbfb;
`;

const ProfileArea = styled.div`
  width: 100%;

  margin-bottom: 32px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  padding: 0 8px;
`;

const ProfileIcon = styled.img`
  width: 45px;
  height: 45px;

  margin-right: 20px;

  object-fit: contain;
`;

const UserText = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.p`
  margin: 0 0 2px;
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

const ProfileButtonArea = styled.div`
  width: 100%;

  margin-top: 20px;

  display: flex;
  gap: 4px;
`;

const AccordionArea = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const InputArea = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AlarmRow = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AlarmText = styled.span`
  color: #141414;

  font-size: 14px;
  font-weight: 400;
`;

const ToggleButton = styled.button`
  padding: 0;

  border: none;
  background: none;

  cursor: pointer;
`;

const ToggleIcon = styled.img`
  width: 44px;
  height: auto;

  display: block;
`;

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [isAlarmOn, setIsAlarmOn] = useState(true);

  return (
    <Page>
      <ProfileArea>
        <UserInfo>
          <ProfileIcon src={profileIcon} alt="프로필" />

          <UserText>
            <UserName>{user?.name} 님</UserName>

            <UserId>{user?.loginId}</UserId>
          </UserText>
        </UserInfo>

        <ProfileButtonArea>
          <ActionButton width="100%" height="30px">
            프로필 이미지 변경
          </ActionButton>

          <ActionButton width="100%" height="30px">
            이름 변경
          </ActionButton>
        </ProfileButtonArea>
      </ProfileArea>

      <AccordionArea>
        <Accordion title="계정 정보 변경">
          <InputArea>
            <TextInput placeholder="이름" width="100%" height="44px" />

            <TextInput placeholder="아이디" width="100%" height="44px" />

            <TextInput placeholder="비밀번호" width="100%" height="44px" />
          </InputArea>
        </Accordion>

        <Accordion title="알림 설정">
          <AlarmRow>
            <AlarmText>{isAlarmOn ? "알림 끄기" : "알림 켜기"}</AlarmText>

            <ToggleButton
              type="button"
              onClick={() => setIsAlarmOn((prev) => !prev)}
            >
              <ToggleIcon
                src={isAlarmOn ? toggleOn : toggleOff}
                alt={isAlarmOn ? "알림 켜짐" : "알림 꺼짐"}
              />
            </ToggleButton>
          </AlarmRow>
        </Accordion>

        <Accordion title="MCM 계정 관리"></Accordion>
      </AccordionArea>
    </Page>
  );
}
