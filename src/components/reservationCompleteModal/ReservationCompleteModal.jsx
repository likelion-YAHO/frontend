import { useEffect, useState } from "react";
import styled from "styled-components";

const ReservationCompleteModal = ({ isOpen, onConfirm, onAutoRedirect }) => {
  if (!isOpen) return null;

  return (
    <ReservationCompleteContent
      onConfirm={onConfirm}
      onAutoRedirect={onAutoRedirect}
    />
  );
};

const ReservationCompleteContent = ({ onConfirm, onAutoRedirect }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    const redirectTimer = setTimeout(() => {
      onAutoRedirect();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
    };
  }, [onAutoRedirect]);

  return (
    <Overlay>
      <ModalCard>
        <TextGroup>
          <Title>예약이 완료되었습니다.</Title>

          <Description>
            {remainingSeconds}초 후 메인 화면으로 이동합니다.
          </Description>
        </TextGroup>

        <ConfirmButton onClick={onConfirm}>예약 주문 확인하기</ConfirmButton>
      </ModalCard>
    </Overlay>
  );
};

export default ReservationCompleteModal;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const ModalCard = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
  background: var(--gray-50, #fafafa);
  border-radius: 4px;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  margin: 0;
  color: var(--gray-900, #141414);
  font-size: 18px;
  font-family: Pretendard Variable;
  font-weight: 600;
  line-height: 26px;
`;

const Description = styled.p`
  margin: 0;
  color: var(--gray-700, #727272);
  font-size: 12px;
  font-family: Pretendard Variable;
  font-weight: 400;
  line-height: 20px;
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 6px 10px;
  box-sizing: border-box;
  background: var(--gray-900, #141414);
  border: none;
  border-radius: 8px;
  color: var(--gray-50, #fafafa);
  font-size: 14px;
  font-family: Pretendard Variable;
  font-weight: 600;
  line-height: 22px;
  cursor: pointer;
`;
