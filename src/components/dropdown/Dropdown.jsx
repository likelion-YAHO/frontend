import { useState } from "react";
import styled from "styled-components";

import downArrow from "../../assets/images/icons/downArrow.svg";

const DropdownContainer = styled.div`
  position: relative;
  width: ${({ $width }) => $width || "100%"};
  font-size: ${({ $fontSize }) => $fontSize || "14px"};
  font-weight: 600;
`;

const DropdownButton = styled.button`
  width: 100%;
  height: 38px;
  padding: 6px 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  color: ${({ $hasValue }) => ($hasValue ? "#141414" : "#727272")};
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  cursor: pointer;
`;

const ArrowIcon = styled.img`
  width: 8px;
  height: 8px;
  object-fit: contain;
`;

const OptionListWrapper = styled.div`
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? "1fr" : "0fr")};
  transition: grid-template-rows 0.35s ease;
`;

const OptionList = styled.div`
  min-height: 0;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  border: ${({ $isOpen }) => ($isOpen ? "1px solid #e3e3e3" : "none")};
  border-top: none;
`;

const Option = styled.button`
  width: 100%;
  padding: 6px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border: none;
  background: ${({ $selected }) => ($selected ? "#d0d0d0" : "#ffffff")};
  color: #141414;
  font-size: inherit;
  font-weight: 600;
  line-height: 22px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #e3e3e3;
  }
`;

function Dropdown({
  options = [],
  value,
  onChange,
  placeholder,
  width,
  height,
  fontSize,
  arrowIcon = downArrow,
  onOpenChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    const next = !isOpen;
    setIsOpen(next);
    onOpenChange?.(next);
  };

  const handleSelect = (option) => {
    onChange?.(option);
    setIsOpen(false);
    onOpenChange?.(false);
  };

  return (
    <DropdownContainer
      $placeholder={placeholder}
      $width={width}
      $fontSize={fontSize}
    >
      <DropdownButton
        type="button"
        $height={height}
        $hasValue={!!value}
        onClick={toggleOpen}
      >
        <span>{value || placeholder}</span>
        <ArrowIcon src={arrowIcon} alt="" />
      </DropdownButton>

      <OptionListWrapper $isOpen={isOpen}>
        <OptionList $isOpen={isOpen}>
          {options.map((option) => (
            <Option
              key={option}
              type="button"
              $selected={value === option}
              onClick={() => handleSelect(option)}
            >
              {option}
            </Option>
          ))}
        </OptionList>
      </OptionListWrapper>
    </DropdownContainer>
  );
}

export default Dropdown;