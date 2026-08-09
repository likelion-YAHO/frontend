// src/components/input/TextInput.jsx

import styled from "styled-components";

const StyledInput = styled.input`
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "48px"};

  padding: 6px 10px;
  box-sizing: border-box;

  background-color: #ffffff;

  border: 1px solid #d9d9d9;
  border-radius: 2px;

  color: #111111;

  font-size: ${({ $fontSize }) => $fontSize || "16px"};
  font-weight: 400;

  outline: none;

  &::placeholder {
    color: #888888;
  }

  &:focus {
    border-color: #111111;
  }

  &:disabled {
    background-color: #f3f3f3;
    color: #888888;

    cursor: default;
  }
`;

function TextInput({
  width,
  height,
  fontSize,
  type = "text",
  placeholder,
  disabled = false,
  ...props
}) {
  return (
    <StyledInput
      $width={width}
      $height={height}
      $fontSize={fontSize}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      {...props}
    />
  );
}

export default TextInput;
