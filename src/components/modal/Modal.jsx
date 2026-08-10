import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.45);

  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 350px;
  height: 140px;

  padding: 20px;
  box-sizing: border-box;

  background: #ffffff;
  border-radius: 4px;
`;

const ModalTitle = styled.h2`
  margin: 0 4px;

  font-size: 18px;
  font-weight: 600;
  line-height: 26px;s

  color: #141414;
`;

const ModalDescription = styled.p`
  margin: 0 4px;

  font-size: 12px;
  font-weight: 400;
  line-height: 20px;

  color: #727272;
`;

function Modal({ title, description, children }) {
  return (
    <Overlay>
      <ModalContainer>
        {title && <ModalTitle>{title}</ModalTitle>}

        {description && <ModalDescription>{description}</ModalDescription>}

        {children}
      </ModalContainer>
    </Overlay>
  );
}

export default Modal;
