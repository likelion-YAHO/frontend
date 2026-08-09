import styled from "styled-components";

const StyledButton = styled.button`
  width: ${({ $width }) => $width || "87px"};
  height: ${({ $height }) => $height || "26px"};

  padding: 6px 10px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #f6f6f6;
  border: 1px solid #d0d0d0;
  border-radius: 2px;

  color: #141414;

  font-size: 12px;
  font-weight: 600;

  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #e3e3e3;
  }

  &:disabled {
    background-color: #d0d0d0;

    cursor: default;
  }
`;

function ActionButton({ children, width, height, disabled = false, ...props }) {
  return (
    <StyledButton
      $width={width}
      $height={height}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

export default ActionButton;
