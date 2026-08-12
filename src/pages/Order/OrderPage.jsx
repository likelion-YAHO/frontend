import { useState } from "react";
import styled from "styled-components";

import OrderTab from "./OrderTab";
import OrderCard from "./OrderCard";
import dummyOrders from "../../data/dummyOrders";

const Page = styled.div`
  width: 100%;
  min-height: 100%;

  background: #fbfbfb;
`;

const Content = styled.div`
  width: 100%;

  padding: 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 16px;
`;

/* 주문이 없을 때 표시되는 영역 */
const EmptyArea = styled.div`
  width: 100%;
  height: calc(100vh - 44px - 48px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
`;

const EmptyTitle = styled.p`
  margin: 0;

  color: #727272;

  font-size: 14px;
  font-weight: 400;
  line-height: 22px;

  text-align: center;
`;

const EmptyDescription = styled.p`
  margin: 0;

  color: #727272;

  font-size: 14px;
  font-weight: 400;
  line-height: 22px;

  text-align: center;
`;

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState("reservation");

  // 테스트용
  // 예약 주문 데이터
  const reservationOrders = dummyOrders;

  // 현재는 주문 내역 데이터 없음
  const historyOrders = [];

  return (
    <Page>
      <OrderTab activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "reservation" && (
        <>
          {reservationOrders.length > 0 ? (
            <Content>
              {reservationOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </Content>
          ) : (
            <EmptyArea>
              <EmptyTitle>아직 주문한 제품이 없습니다.</EmptyTitle>

              <EmptyDescription>
                업사이클링으로 새로운 이야기를 시작해보세요.
              </EmptyDescription>
            </EmptyArea>
          )}
        </>
      )}

      {activeTab === "history" && (
        <>
          {historyOrders.length > 0 ? (
            <Content>
              {historyOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </Content>
          ) : (
            <EmptyArea>
              <EmptyTitle>아직 주문 내역이 없습니다.</EmptyTitle>

              <EmptyDescription>
                업사이클링으로 새로운 이야기를 시작해보세요.
              </EmptyDescription>
            </EmptyArea>
          )}
        </>
      )}
    </Page>
  );
}
