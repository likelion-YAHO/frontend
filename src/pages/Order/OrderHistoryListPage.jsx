import styled from "styled-components";

import HistoryCard from "./HistoryCard";

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

export default function OrderHistoryListPage({ orders, onRestore }) {
  const historyOrders = orders
    .filter(
      (order) => order.status === "completed" || order.status === "cancelled",
    )
    .sort((a, b) => {
      /*
       * 취소 주문은 receivedDate가 없을 수 있으므로 일단 id 기준 최신순 fallback
       *
       * 완료 주문 날짜 정렬은 API 연동 시 다시 맞출 예정
       */
      if (!a.receivedDate || !b.receivedDate) {
        return b.id - a.id;
      }

      return (
        new Date(b.receivedDate.replaceAll(".", "-")) -
        new Date(a.receivedDate.replaceAll(".", "-"))
      );
    });

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
        <HistoryCard
          key={order.id}
          order={order}
          onRestore={() => onRestore(order.id)}
        />
      ))}
    </Content>
  );
}
