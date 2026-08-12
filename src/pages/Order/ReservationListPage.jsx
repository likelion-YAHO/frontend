import styled from "styled-components";

import OrderCard from "./OrderCard";
import dummyOrders from "../../data/dummyOrders";

const Content = styled.div`
  width: 100%;

  padding: 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 16px;
`;

const EmptyArea = styled.div`
  width: 100%;
  height: calc(100vh - 44px - 48px);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyText = styled.p`
  margin: 0;

  color: #727272;

  font-size: 14px;
  font-weight: 400;
  line-height: 22px;

  text-align: center;
`;

export default function ReservationListPage() {
  const reservationOrders = dummyOrders.filter(
    (order) => order.status === "inProgress",
  );

  if (reservationOrders.length === 0) {
    return (
      <EmptyArea>
        <EmptyText>
          아직 주문한 제품이 없습니다.
          <br />
          업사이클링으로 새로운 이야기를 시작해보세요.
        </EmptyText>
      </EmptyArea>
    );
  }

  return (
    <Content>
      {reservationOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </Content>
  );
}
