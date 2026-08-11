import styled from "styled-components";

const TabContainer = styled.div`
  width: 100%;
  height: 50px;

  display: flex;

  background: #ffffff;
`;

const TabButton = styled.button`
  position: relative;

  flex: 1;

  border: none;

  background: #ffffff;

  color: ${({ $active }) => ($active ? "#141414" : "#d0d0d0")};

  font-size: 18px;
  font-weight: ${({ $active }) => ($active ? "600" : "500")};

  cursor: pointer;

  &::after {
    content: "";

    position: absolute;

    left: 0;
    bottom: 0;

    width: 100%;
    height: 1px;

    background: ${({ $active }) => ($active ? "#141414" : "#e3e3e3")};
  }
`;

export default function OrderTab({ activeTab, onChange }) {
  return (
    <TabContainer>
      <TabButton
        type="button"
        $active={activeTab === "reservation"}
        onClick={() => onChange("reservation")}
      >
        예약 주문
      </TabButton>

      <TabButton
        type="button"
        $active={activeTab === "history"}
        onClick={() => onChange("history")}
      >
        주문 내역
      </TabButton>
    </TabContainer>
  );
}
