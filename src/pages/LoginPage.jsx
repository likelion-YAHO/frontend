import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import TextInput from "../components/input/TextInput";
import IntentButton from "../components/button/IntentButton";

import Modal from "../components/modal/Modal";

import mockUsers from "../data/dummyUsers";

import logo from "../assets/images/icons/Mcm_icon.svg";
import googleIcon from "../assets/images/icons/Google_icon.svg";
import errorIcon from "../assets/images/icons/loginError_icon.svg";

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

const LoginFormWrapper = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
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

const ModalButtonArea = styled.div`
  margin-top: 16px;
`;

const ErrorDescription = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;

  color: #888888;
  font-size: 12px;
`;

const ErrorIcon = styled.img`
  width: 12px;
  height: 12px;
  margin-left: 4px;

  flex-shrink: 0;
  object-fit: contain;
`;

export default function LoginPage() {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const [isLoginError, setIsLoginError] = useState(false);

  const handleLogin = () => {
    const matchedUser = mockUsers.find(
      (user) => user.loginId === loginId && user.password === password,
    );

    if (matchedUser) {
      localStorage.setItem("user", JSON.stringify(matchedUser));

      navigate("/main");
      return;
    }

    setIsLoginError(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  // 로그인 실패 모달이 열려 있을 때 Enter 키로 "다시 시도하기" 버튼과 동일하게 동작
  useEffect(() => {
    if (!isLoginError) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setIsLoginError(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoginError]);

  return (
    <Page>
      <Logo src={logo} alt="MCM" />

      <LoginFormWrapper onSubmit={handleSubmit}>
        <LoginForm>
          <TextInput
            width="318px"
            height="44px"
            fontSize="14px"
            placeholder="아이디"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />

          <TextInput
            width="318px"
            height="44px"
            fontSize="14px"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LoginForm>

        <ButtonGroup>
          <IntentButton variant="black" height="44px" type="submit">
            로그인
          </IntentButton>

          <IntentButton variant="white" height="44px" type="button">
            회원 가입
          </IntentButton>
        </ButtonGroup>
      </LoginFormWrapper>

      <PasswordFind type="button">비밀번호를 잊으셨나요?</PasswordFind>

      <Divider>
        <DividerLine />
        <DividerText>또는</DividerText>
        <DividerLine />
      </Divider>

      <GoogleButton type="button">
        <GoogleIcon src={googleIcon} alt="" />
        Google 로그인
      </GoogleButton>

      <FooterText>서비스 이용약관 / skuteam5@MCM.kr</FooterText>

      {/* 로그인 실패 모달 */}
      {isLoginError && (
        <Modal title="아이디/비밀번호 오류">
          <ErrorDescription>
            <ErrorIcon src={errorIcon} alt="오류" />

            <span>아이디 또는 비밀번호에 오류가 있습니다.</span>
          </ErrorDescription>

          <ModalButtonArea>
            <IntentButton
              variant="black"
              width="308px"
              height="36px"
              onClick={() => setIsLoginError(false)}
            >
              다시 시도하기
            </IntentButton>
          </ModalButtonArea>
        </Modal>
      )}
    </Page>
  );
}
