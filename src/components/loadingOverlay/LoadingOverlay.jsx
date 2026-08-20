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

const Spinner = styled.div`
  width: 44px;
  height: 44px;

  border: 3.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;

  animation: ${spin} 1s linear infinite;
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
      <Spinner />
      <LoadingText>AI loading ···</LoadingText>
    </Overlay>
  );
}