import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  backdrop-filter: blur(6px);
  background: rgba(0, 0, 0, 0.25);

  z-index: 10;
`;

const LoopWrapper = styled.div`
  width: 70px;
  height: 70px;
  position: relative;

  animation: ${spin} 1s linear infinite;
`;

// Figma "Loop" 컴포넌트 - 얇은 원형 + 진한 부분 호(arc)가 겹쳐 도는 스피너
// (Figma dev mode 코드에 border-radius가 누락되어 있어 50%로 보정함)
const StyledVector = styled.div`
  width: 30px;
  height: 30px;
  left: 40px;
  top: 10px;
  position: absolute;

  border-radius: 50%;
  outline: 3.5px var(--white, white) solid;
  outline-offset: -1.75px;
`;

const StyledVector01 = styled.div`
  width: 60px;
  height: 60px;
  left: 10px;
  top: 10px;
  position: absolute;

  opacity: 0.3;

  border-radius: 50%;
  outline: 3.5px var(--white, white) solid;
  outline-offset: -1.75px;
`;

const LoadingText = styled.p`
  margin: 0;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
`;

export default function LoadingOverlay({ visible }) {
  if (!visible) return null;

  return (
    <Overlay>
      <LoopWrapper>
        <StyledVector />
        <StyledVector01 />
      </LoopWrapper>
      <LoadingText>AI loading ···</LoadingText>
    </Overlay>
  );
}
