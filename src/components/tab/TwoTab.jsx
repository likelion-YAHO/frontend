import styled from "styled-components";

const TabContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: stretch;
  background: #ffffff;
`;

const TabButton = styled.button`
  position: relative;
  flex: 1;
  border: none;
  background: #ffffff;
  padding: 12px 10px;
  box-sizing: border-box;
  cursor: pointer;
  text-align: center;
  color: ${({ $active }) =>
    $active ? "var(--gray-900, #141414)" : "var(--gray-500, #d0d0d0)"};
  font-size: 18px;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  line-height: 26px;

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

export default function TwoTab({ tabs, activeTab, onChange, className }) {
  return (
    <TabContainer className={className}>
      {tabs.map(({ label, value }) => (
        <TabButton
          key={value}
          type="button"
          $active={activeTab === value}
          onClick={() => onChange(value)}
        >
          {label}
        </TabButton>
      ))}
    </TabContainer>
  );
}
