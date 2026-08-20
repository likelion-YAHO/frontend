import { useEffect } from "react";
import styled from "styled-components";

const ToastWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 12px 20px;
  border-radius: 8px;

  background: rgba(20, 20, 20, 0.85);
  color: #ffffff;

  font-size: 14px;
  font-weight: 600;

  white-space: nowrap;
  z-index: 200;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.25s ease;
  pointer-events: none;
`;

export default function LimitToast({ visible, message, duration = 2000, onHide }) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      onHide?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onHide]);

  return <ToastWrapper $visible={visible}>{message}</ToastWrapper>;
}
