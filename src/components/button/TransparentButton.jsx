import styled from "styled-components";
import rightArrowWhite from "../../assets/images/icons/rightArrowWhite.svg";

const Button = styled.button`
  position: relative;
  appearance: none;
  -webkit-appearance: none;
  padding: 2px 12px;
  border: none;
  border-radius: 35px;
  background: rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(14px) saturate(2.2) brightness(0.85);
  -webkit-backdrop-filter: blur(14px) saturate(2.2) brightness(0.85);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex-shrink: 0;
  outline: none;
  isolation: isolate;
  box-shadow:
    inset 0 0.5px 0 rgba(255, 255, 255, 0.2),
    inset 0 -0.5px 0 rgba(0, 0, 0, 0.15);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 35px;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.7) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.7) 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const TransparentButtonText = styled.span`
  position: relative;
  color: var(--gray-50, #fafafa);
  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: ${({ $fontSize }) => $fontSize || "12px"};
  font-weight: 600;
  line-height: 20px;
`;

const TransparentButtonIcon = styled.img`
  position: relative;
  width: 4px;
  height: 9px;
`;

export default function TransparentButton({
  label,
  iconSrc = rightArrowWhite,
  iconAlt = "next",
  children,
  textProps = {},
  type = "button",
  ...props
}) {
  return (
    <Button type={type} {...props}>
      {children ?? (
        <>
          {label !== undefined && label !== null && (
            <TransparentButtonText {...textProps}>
              {label}
            </TransparentButtonText>
          )}
          {iconSrc && <TransparentButtonIcon src={iconSrc} alt={iconAlt} />}
        </>
      )}
    </Button>
  );
}
