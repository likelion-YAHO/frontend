import styled from "styled-components";

import TextInput from "../components/input/TextInput";
import IntentButton from "../components/button/IntentButton";

import logo from "../assets/images/icons/Mcm_icon.svg";
import googleIcon from "../assets/images/icons/Google_icon.svg";

const Page = styled.div`
  width: 100%;
  min-height: 100vh;

  padding: 72px 24px 36px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;

  margin: 0 auto 24px;
`;

const LoginForm = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ButtonGroup = styled.div`
  width: 100%;

  margin-top: 60px;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const PasswordFind = styled.button`
  margin: 12px auto 0;

  padding: 0;

  border: none;
  background: none;

  color: #727272;
  font-size: 14px;

  cursor: pointer;
`;

const Divider = styled.div`
  width: 318px;

  margin-top: 34px;
  margin-bottom: 83px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  align-items: center;
  gap: 14px;
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;

  background: #e3e3e3;
`;

const DividerText = styled.span`
  color: #727272;
  font-size: 14px;
`;

const GoogleButton = styled.button`
  width: 318px;
  height: 44px;

  margin-left: auto;
  margin-right: auto;

  padding: 10px 20px;
  box-sizing: border-box;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #e3e3e3;
  border-radius: 2px;

  background: #ffffff;

  color: #141414;
  font-size: 16px;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    background: #e3e3e3;
  }
`;

const GoogleIcon = styled.img`
  position: absolute;
  left: 20px;
`;

const FooterText = styled.p`
  margin: auto auto 0;

  color: #727272;
  font-size: 14px;
`;

export default function LoginPage() {
  return (
    <Page>
      <Logo src={logo} alt="MCM" />

      <LoginForm>
        <TextInput
          width="318px"
          height="44px"
          fontSize="16px"
          placeholder="아이디"
        />

        <TextInput
          width="318px"
          height="44px"
          fontSize="16px"
          type="password"
          placeholder="비밀번호"
        />
      </LoginForm>

      <ButtonGroup>
        <IntentButton variant="black" height="44px" fontSize="14px">
          로그인
        </IntentButton>

        <IntentButton variant="white" height="44px" fontSize="14px">
          회원 가입
        </IntentButton>

        <PasswordFind type="button">비밀번호를 잊으셨나요?</PasswordFind>
      </ButtonGroup>

      <Divider>
        <DividerLine />
        <DividerText>또는</DividerText>
        <DividerLine />
      </Divider>

      <GoogleButton type="button">
        <GoogleIcon src={googleIcon} alt="Google" />
        Google 로그인
      </GoogleButton>

      <FooterText>서비스 이용약관 / skuteam5@MCM.kr</FooterText>
    </Page>
  );
}
