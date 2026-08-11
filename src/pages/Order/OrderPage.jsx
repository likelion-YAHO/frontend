import { useState } from "react";
import styled from "styled-components";

import OrderTab from "./OrderTab";
// import OrderCard from "./OrderCard";

// import dummyOrders from "../../data/dummyOrders";

const Page = styled.div`
  width: 100%;
  min-height: 100%;

  background: #fbfbfb;
`;

const Content = styled.div`
  width: 100%;

  padding: 20px 12px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EmptyText = styled.p`
  margin: 80px 0 0;

  color: #727272;
  font-size: 14px;
  text-align: center;
`;

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState("reservation");

  return (
    <Page>
      <OrderTab activeTab={activeTab} onChange={setActiveTab} />

      <Content>
        {activeTab === "reservation" && (
          <EmptyText>주문 내역이 없습니다.</EmptyText>
        )}

        {activeTab === "history" && (
          <EmptyText>주문 내역이 없습니다.</EmptyText>
        )}
      </Content>
    </Page>
  );
}
