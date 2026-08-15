import { useState } from "react";
import styled from "styled-components";

import rightArrow from "../../assets/images/icons/rightArrow.svg";
import downArrow from "../../assets/images/icons/downArrow.svg";

const AccordionContainer = styled.div`
  width: 100%;
  background: #ffffff;

  border-top: ${({ $border }) => ($border ? "1px solid #141414" : "none")};

  &:last-child {
    border-bottom: ${({ $border }) => ($border ? "1px solid #141414" : "none")};
  }
`;

const AccordionHeader = styled.button`
  width: 100%;
  height: ${({ $height }) => $height};

  padding: 12px 20px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: none;

  background: ${({ $dark }) => ($dark ? "#141414" : "#fafafa")};

  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: 600;
  line-height: 24px;

  color: ${({ $dark }) => ($dark ? "#fafafa" : "#141414")};

  cursor: pointer;
`;

const ArrowIcon = styled.img`
  width: 24px;
  height: 24px;

  padding: 10px;
  box-sizing: border-box;

  object-fit: contain;

  filter: ${({ $dark }) => ($dark ? "invert(1)" : "none")};
`;

const AccordionContent = styled.div`
  width: 100%;

  padding: 12px 32px 42px 32px;
  box-sizing: border-box;

  background: #f6f6f6;
`;

function Accordion({
  title,
  children,
  dark = false,
  border = false,
  fontSize = "16px",
  height = "48px",
  onClose,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);

    if (onClose) {
      onClose();
    }
  };

  return (
    <AccordionContainer $border={border}>
      <AccordionHeader
        type="button"
        onClick={handleToggle}
        $dark={dark}
        $fontSize={fontSize}
        $height={height}
      >
        <span>{title}</span>

        <ArrowIcon src={isOpen ? downArrow : rightArrow} alt="" />
      </AccordionHeader>

      {isOpen && (
        <AccordionContent>
          {typeof children === "function"
            ? children({ close: handleClose })
            : children}
        </AccordionContent>
      )}
    </AccordionContainer>
  );
}

export default Accordion;
