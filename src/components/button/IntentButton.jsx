// 의사 버튼

import styled from "styled-components";

const StyledButton = styled.button`
  width: ${({ $width }) => $width || "318px"};
  height: ${({ $height }) => $height || "54px"};

  padding: 6px 10px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid
  border-color: #e3e3e3;
  border-radius: 2px;

  background-color: ${({ $variant }) =>
    $variant === "black" ? "#141414" : "#fafafa"};

  color: ${({ $variant }) => ($variant === "black" ? "#fafafa" : "#141414")};

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${({ $variant }) =>
      $variant === "black" ? "#141414" : "#d0d0d0"};

    color: ${({ $variant }) => ($variant === "black" ? "#727272" : "#141414")};
  }

  &:disabled {
    background-color: ${({ $variant }) =>
      $variant === "black" ? "#111111" : "#d3d3d3"};

    color: ${({ $variant }) => ($variant === "black" ? "#777777" : "#111111")};

    cursor: default;
  }
`;

function IntentButton({
  children,
  variant = "white",
  width,
  height,
  disabled = false,
  ...props
}) {
  return (
    <StyledButton
      $variant={variant}
      $width={width}
      $height={height}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

export default IntentButton;
