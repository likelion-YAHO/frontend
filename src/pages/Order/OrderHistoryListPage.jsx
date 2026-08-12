import styled from "styled-components";

import HistoryCard from "./HistoryCard";
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

export default function OrderHistoryListPage() {
  const historyOrders = dummyOrders
    .filter((order) => order.status === "completed")
    .sort(
      (a, b) =>
        new Date(b.receivedDate.replaceAll(".", "-")) -
        new Date(a.receivedDate.replaceAll(".", "-")),
    );

  if (historyOrders.length === 0) {
    return (
      <EmptyArea>
        <EmptyText>
          아직 주문 내역이 없습니다.
          <br />
          업사이클링으로 새로운 이야기를 시작해보세요.
        </EmptyText>
      </EmptyArea>
    );
  }

  return (
    <Content>
      {historyOrders.map((order) => (
        <HistoryCard key={order.id} order={order} />
      ))}
    </Content>
  );
}
