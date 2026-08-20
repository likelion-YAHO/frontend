import styled from "styled-components";
import TwoTab from "../../components/tab/TwoTab";

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

export default function McmLabHeader({ activeTab, onTabChange }) {
  return (
    <HeaderContainer>
      <TwoTab
        tabs={[
          { label: "MCM Lab", value: "lab" },
          { label: "Lab Edition", value: "edition" },
        ]}
        activeTab={activeTab}
        onChange={onTabChange}
      />
    </HeaderContainer>
  );
}
