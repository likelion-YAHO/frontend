import styled from "styled-components";

const Box = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap || "4px"};

  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "auto"};
  padding: ${({ $padding }) => $padding || "6px 12px"};
  box-sizing: border-box;

  border: none;
  border-radius: 2px;
  outline: 1px solid #e3e3e3;
  outline-offset: -1px;

  background: #ffffff;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
  flex-shrink: 0;
`;

const Text = styled.span`
  color: ${({ $filled }) => ($filled ? "#141414" : "#727272")};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
`;

export default function IconInputBox({
  icon,
  placeholder,
  value,
  onClick,
  width,
  height,
  gap,
  padding,
}) {
  return (
    <Box
      type="button"
      onClick={onClick}
      $width={width}
      $height={height}
      $gap={gap}
      $padding={padding}
    >
      <Icon src={icon} alt="" />
      <Text $filled={!!value}>{value || placeholder}</Text>
    </Box>
  );
}
