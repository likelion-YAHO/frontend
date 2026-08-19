import { useEffect, useState } from "react";
import styled from "styled-components";

import TwoTab from "../../components/tab/TwoTab";
import ReservationListPage from "./ReservationListPage";
import OrderHistoryListPage from "./OrderHistoryListPage";

import Modal from "../../components/modal/Modal";
import IntentButton from "../../components/button/IntentButton";

import {
  getMyReservations,
  getReservationDetail,
  cancelReservation,
  restoreReservation,
} from "../../api/reservation";

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

  // 목록 + 상세정보까지 합쳐진 예약 데이터
  const [orders, setOrders] = useState([]);

  // 취소 확인 모달에서 사용할 예약 id
  const [cancelReservationId, setCancelReservationId] = useState(null);

  // =========================
  // 예약 목록 + 상세정보 조회
  // =========================
  const fetchReservations = async () => {
    try {
      // 1. 현재 로그인한 사용자의 예약 목록 조회
      const reservationList = await getMyReservations();

      // 예약이 하나도 없으면 바로 빈 배열 처리
      if (!reservationList || reservationList.length === 0) {
        setOrders([]);
        return;
      }

      // 2. 각 예약의 상세정보 조회
      const ordersWithDetail = await Promise.all(
        reservationList.map(async (reservation) => {
          try {
            const detail = await getReservationDetail(
              reservation.reservationId,
            );

            /*
             * 목록 데이터 + 상세 데이터 병합
             *
             * 목록:
             * reservationId
             * orderNumber
             * currentStatus
             * visitDate
             * barcode
             * productName
             * storeName
             * productImageUrl
             *
             * 상세:
             * reformId
             * storeId
             * receivedAt
             * hqArrivedAt
             * inspectingAt
             * inProgressAt
             * completedAt
             * shippingAt
             * storeArrivedAt
             * estimatedStoreArrivalDate
             * pickedUpAt
             * ...
             */
            return {
              ...reservation,
              ...detail,
            };
          } catch (error) {
            console.error(
              `예약 상세 조회 실패: ${reservation.reservationId}`,
              error,
            );

            // 상세 조회 하나가 실패해도 목록 전체가 깨지지 않도록
            // 목록 정보만 반환
            return reservation;
          }
        }),
      );

      console.log("예약 목록 + 상세:", ordersWithDetail);

      setOrders(ordersWithDetail);
    } catch (error) {
      console.error("내 예약 목록 조회 실패:", error);
    }
  };

  // =========================
  // 페이지 최초 진입 시 조회
  // =========================
  useEffect(() => {
    let ignore = false;

    const loadReservations = async () => {
      try {
        const reservationList = await getMyReservations();

        if (ignore) return;

        if (!reservationList || reservationList.length === 0) {
          setOrders([]);
          return;
        }

        const ordersWithDetail = await Promise.all(
          reservationList.map(async (reservation) => {
            try {
              const detail = await getReservationDetail(
                reservation.reservationId,
              );

              return {
                ...reservation,
                ...detail,
              };
            } catch (error) {
              console.error(
                `예약 상세 조회 실패: ${reservation.reservationId}`,
                error,
              );

              return reservation;
            }
          }),
        );

        if (ignore) return;

        console.log("예약 목록 + 상세:", ordersWithDetail);

        setOrders(ordersWithDetail);
      } catch (error) {
        console.error("내 예약 목록 조회 실패:", error);
      }
    };

    loadReservations();

    return () => {
      ignore = true;
    };
  }, []);

  // =========================
  // 예약 취소 버튼 클릭
  // =========================
  const handleCancelClick = (reservationId) => {
    setCancelReservationId(reservationId);
  };

  // =========================
  // 예약 취소 확정
  // =========================
  const handleCancelConfirm = async () => {
    if (cancelReservationId === null) return;

    try {
      await cancelReservation(cancelReservationId);

      // 서버에서 CANCELLED 상태로 바뀐 최신 데이터 재조회
      await fetchReservations();

      setCancelReservationId(null);

      // 취소된 예약 확인을 위해 주문 내역으로 이동
      setActiveTab("history");
    } catch (error) {
      console.error("예약 취소 실패:", error);
    }
  };

  // =========================
  // 취소 모달 닫기
  // =========================
  const handleCancelClose = () => {
    setCancelReservationId(null);
  };

  // =========================
  // 예약 복원
  // =========================
  const handleRestore = async (reservationId) => {
    try {
      await restoreReservation(reservationId);

      /*
       * 백엔드 기준:
       * CANCELLED
       *   ↓ restore
       * RECEIVED
       *
       * 즉 접수 완료 상태로 초기화
       */
      await fetchReservations();

      setActiveTab("reservation");
    } catch (error) {
      console.error("예약 복원 실패:", error);
    }
  };

  return (
    <Page>
      <TwoTab
        tabs={[
          {
            label: "예약 주문",
            value: "reservation",
          },
          {
            label: "주문 내역",
            value: "history",
          },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "reservation" && (
        <ReservationListPage
          orders={orders}
          onCancel={handleCancelClick}
          onRefresh={fetchReservations}
        />
      )}

      {activeTab === "history" && (
        <OrderHistoryListPage orders={orders} onRestore={handleRestore} />
      )}

      {/* 예약 취소 확인 모달 */}
      {cancelReservationId !== null && (
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
