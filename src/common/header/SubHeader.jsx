import styled from "styled-components";

import IconButton from "../../components/button/IconButton";

import backIcon from "../../assets/images/icons/backArrow_icon.svg";

const HeaderContainer = styled.header`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 48px;

  padding: 10px 20px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #ffffff;

  z-index: 100;
`;

const BackButton = styled(IconButton)`
  position: absolute;
  left: 14px;

  width: 24px;
  height: 24px;

  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackIcon = styled.img`
  width: 24px;
  height: 24px;

  object-fit: contain;
`;

const Title = styled.h1`
  margin: 0;

  color: #141414;

  font-size: 20px;
  font-weight: 600;
`;

export default function SubHeader({ title, onBack }) {
  return (
    <HeaderContainer>
      <BackButton type="button" onClick={onBack}>
        <BackIcon src={backIcon} alt="뒤로가기" />
      </BackButton>

      <Title>{title}</Title>
    </HeaderContainer>
  );
}
