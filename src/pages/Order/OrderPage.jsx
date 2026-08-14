import { useState } from "react";
import styled from "styled-components";

import TwoTab from "../../components/tab/TwoTab";
import ReservationListPage from "./ReservationListPage";
import OrderHistoryListPage from "./OrderHistoryListPage";

import Modal from "../../components/modal/Modal";
import IntentButton from "../../components/button/IntentButton";

import dummyOrders from "../../data/dummyOrders";

const Page = styled.div`
  width: 100%;
  min-height: 100%;

  background: #fbfbfb;
`;

const ModalButtonArea = styled.div`
  width: 100%;

  margin-top: 20px;

  display: flex;
  gap: 4px;
`;

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState("reservation");

  // 더미 데이터를 실제 상태로 관리
  const [orders, setOrders] = useState(dummyOrders);

  // 현재 취소하려는 주문 id
  const [cancelOrderId, setCancelOrderId] = useState(null);

  // 예약 취소 버튼 클릭
  const handleCancelClick = (orderId) => {
    setCancelOrderId(orderId);
  };

  // 모달에서 "예" 클릭
  const handleCancelConfirm = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === cancelOrderId
          ? {
              ...order,
              status: "cancelled",
            }
          : order,
      ),
    );

    setCancelOrderId(null);

    // 취소 후 주문 내역 탭으로 바로 이동하고 싶으면 유지
    setActiveTab("history");
  };

  // 모달 닫기
  const handleCancelClose = () => {
    setCancelOrderId(null);
  };

  // 예약 복원
  const handleRestore = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "inProgress",
            }
          : order,
      ),
    );

    // 복원 후 예약 주문 탭으로 이동
    setActiveTab("reservation");
  };

  return (
    <Page>
      <TwoTab
        tabs={[
          { label: "예약 주문", value: "reservation" },
          { label: "주문 내역", value: "history" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "reservation" && (
        <ReservationListPage orders={orders} onCancel={handleCancelClick} />
      )}

      {activeTab === "history" && (
        <OrderHistoryListPage orders={orders} onRestore={handleRestore} />
      )}

      {/* 예약 취소 확인 모달 */}
      {cancelOrderId !== null && (
        <Modal
          title="예약을 취소하시겠습니까?"
          description="예약을 취소하면 업사이클링 커스텀과 일정이 함께 취소됩니다."
        >
          <ModalButtonArea>
            <IntentButton
              variant="white"
              width="152px"
              height="34px"
              onClick={handleCancelConfirm}
            >
              네
            </IntentButton>

            <IntentButton
              variant="black"
              width="152px"
              height="34px"
              onClick={handleCancelClose}
            >
              아니요
            </IntentButton>
          </ModalButtonArea>
        </Modal>
      )}
    </Page>
  );
}
