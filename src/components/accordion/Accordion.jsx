import { useState } from "react";
import styled from "styled-components";

import rightArrow from "../../assets/images/icons/rightArrow.svg";
import downArrow from "../../assets/images/icons/downArrow.svg";

const AccordionContainer = styled.div`
  width: 100%;
  background: #ffffff;
`;

const AccordionHeader = styled.button`
  width: 100%;
  height: 48px;

  padding: 12px 20px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: none;

  background: ${({ $dark }) => ($dark ? "#141414" : "#fafafa")};

  font-size: 16px;
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

  padding: 20px;
  box-sizing: border-box;

  background: #f6f6f6;
`;

function Accordion({ title, children, dark = false }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionContainer>
      <AccordionHeader
        type="button"
        $dark={dark}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{title}</span>

        <ArrowIcon src={isOpen ? downArrow : rightArrow} alt="" $dark={dark} />
      </AccordionHeader>

      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </AccordionContainer>
  );
}

export default Accordion;
