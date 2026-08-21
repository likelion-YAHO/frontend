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
  // =========================
  // 주문 내역 필터링
  // =========================

  const historyOrders = orders
    .filter((order) => {
      const isCancelled =
        order.currentStatus === "CANCELLED" || order.currentStatus === "취소";

      const isPickedUp = Boolean(order.pickedUpAt);

      return isCancelled || isPickedUp;
    })
    .sort((a, b) => {
      if (a.pickedUpAt && b.pickedUpAt) {
        return new Date(b.pickedUpAt) - new Date(a.pickedUpAt);
      }

      if (a.pickedUpAt) return -1;
      if (b.pickedUpAt) return 1;

      return b.reservationId - a.reservationId;
    });

  // =========================
  // 주문 내역 없음
  // =======

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

  // =========================
  // 주문 내역 목록
  // =========================

  return (
    <Content>
      {historyOrders.map((order) => (
        <HistoryCard
          key={order.reservationId}
          order={order}
          onRestore={() => onRestore(order.reservationId)}
        />
      ))}
    </Content>
  );
}
