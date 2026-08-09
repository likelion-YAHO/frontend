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

  font-size: inherit;

  cursor: pointer;
`;

const ArrowIcon = styled.img`
  width: 8px;
  height: 8px;

  object-fit: contain;
`;

const OptionList = styled.div`
  position: absolute;

  top: calc(100% + 2px);
  left: 0;

  width: 100%;

  box-sizing: border-box;

  background: #ffffff;

  border: 1px solid #e3e3e3;

  z-index: 100;
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
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange?.(option);
    setIsOpen(false);
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
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{value || placeholder}</span>

        <ArrowIcon src={downArrow} alt="" />
      </DropdownButton>

      {isOpen && (
        <OptionList>
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
      )}
    </DropdownContainer>
  );
}

export default Dropdown;
