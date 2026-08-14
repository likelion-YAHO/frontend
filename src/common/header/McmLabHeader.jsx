import styled from "styled-components";

const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  background: #ffffff;
  border-bottom: 1px solid #e6e6e6;

  z-index: 100;
`;

const TabButton = styled.button`
  position: relative;

  appearance: none;
  -webkit-appearance: none;
  border: none;
  background: none;

  width: 50%;

  padding: 12px 10px;
  box-sizing: border-box;

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 18px;
  line-height: 26px;
  text-align: center;

  color: ${({ $active }) =>
    $active ? "var(--gray-900, #141414)" : "var(--gray-500, #D0D0D0)"};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};

  cursor: pointer;

  &::after {
    content: "";

    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;

    height: 2px;

    background: ${({ $active }) =>
      $active ? "var(--gray-900, #141414)" : "transparent"};
  }
`;

export default function McmLabHeader({ activeTab, onTabChange }) {
  return (
    <HeaderContainer>
      <TabButton
        type="button"
        $active={activeTab === "lab"}
        onClick={() => onTabChange("lab")}
      >
        MCM Lab
      </TabButton>
      <TabButton
        type="button"
        $active={activeTab === "edition"}
        onClick={() => onTabChange("edition")}
      >
        Lab Edition
      </TabButton>
    </HeaderContainer>
  );
}