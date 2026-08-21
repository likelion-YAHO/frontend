import { useState } from "react";
import styled from "styled-components";

import CalendarModal from "../../components/calendarModal/CalendarModal";

import ActionButton from "../../components/button/ActionButton";
import OrderBarcode from "./OrderBarcode";

import { updateReservation } from "../../api/reservation";

import activeStepIcon from "../../assets/images/icons/activeStep_icon.svg";
import inactiveStepIcon from "../../assets/images/icons/inactiveStep_icon.svg";

const Card = styled.div`
  width: 350px;

  display: flex;
  flex-direction: column;

  gap: 4px;
`;

const TopBox = styled.div`
  width: 350px;
  height: 444px;

  padding: 10px;
  box-sizing: border-box;

  background: #434343;

  border: 1px solid #e3e3e3;
  border-radius: 6px 6px 0 0;
`;

const OrderNumberRow = styled.div`
  height: 24px;

  display: flex;
  align-items: center;

  color: #fafafa;
`;

const OrderNumberLabel = styled.span`
  margin-left: 4px;
  margin-right: 6px;

  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const OrderNumber = styled.span`
  height: 24px;

  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

/* =========================
   주문 제품 info 박스
========================= */

const ProductBox = styled.div`
  width: 330px;
  height: 142px;

  margin-top: 10px;

  padding: 16px;
  box-sizing: border-box;

  display: flex;

  background: #fbfbfb;

  border: 1px solid #d0d0d0;
  border-radius: 6px 6px 0 0;
`;

const ProductImage = styled.img`
  width: 86px;
  height: 110px;

  flex-shrink: 0;

  border: 1px solid #e3e3e3;
  box-sizing: border-box;

  object-fit: contain;
`;

const ProductInfo = styled.div`
  flex: 1;

  margin-top: 4px;
  margin-left: 16px;

  display: flex;
  flex-direction: column;

  min-width: 0;
`;

const InfoRow = styled.div`
  height: 20px;

  display: flex;
  align-items: center;

  font-size: 12px;

  & + & {
    margin-top: 6px;
  }
`;

const InfoLabel = styled.span`
  width: 45px;

  flex-shrink: 0;

  color: #141414;

  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
`;

const InfoValue = styled.span`
  flex: 1;

  color: #141414;

  font-size: 12px;
  font-weight: 400;
  line-height: 20px;

  margin-left: 12px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActionButtonArea = styled.div`
  margin-top: 23px;

  display: flex;
  gap: 6px;
`;

/* =========================
   물건 위치 박스
========================= */

const ProgressBox = styled.div`
  width: 330px;
  height: 244px;

  margin-top: 4px;

  padding: 20px 32px;
  box-sizing: border-box;

  display: flex;

  background: #fbfbfb;

  border: 1px solid #d0d0d0;
`;

const StateArea = styled.div`
  position: relative;

  width: 90px;
  height: 204px;

  flex-shrink: 0;
`;

const ProgressLine = styled.div`
  position: absolute;

  top: 13px;
  left: 6px;

  width: 1px;
  height: 181px;

  background: #e3e3e3;
`;

const StateItem = styled.div`
  position: relative;

  height: 20px;

  display: flex;
  align-items: center;

  & + & {
    margin-top: 6px;
  }
`;

const StepIcon = styled.img`
  position: relative;

  width: ${({ $active }) => ($active ? "13px" : "5px")};
  height: ${({ $active }) => ($active ? "13px" : "5px")};

  margin-left: ${({ $active }) => ($active ? "0" : "4px")};

  flex-shrink: 0;

  object-fit: contain;

  z-index: 1;
`;

const StateLabel = styled.span`
  margin-left: ${({ $active }) => ($active ? "21.5px" : "25.5px")};

  color: ${({ $active }) => ($active ? "#141414" : "#727272")};

  font-size: 12px;

  font-weight: ${({ $active }) => ($active ? "600" : "400")};

  line-height: 20px;

  white-space: nowrap;
`;

/* =========================
   날짜 영역
========================= */

const DateArea = styled.div`
  margin-left: 17px;

  display: flex;
  flex-direction: column;
`;

const DateItem = styled.div`
  height: 20px;

  display: flex;
  align-items: center;

  color: ${({ $active }) => ($active ? "#141414" : "#727272")};

  font-size: 12px;

  font-weight: ${({ $active }) => ($active ? "600" : "400")};

  line-height: 20px;

  white-space: nowrap;

  & + & {
    margin-top: 6px;
  }
`;

/* =========================
   아래쪽 검정 박스
========================= */

const BarcodeOuterBox = styled.div`
  width: 350px;
  height: 93px;

  padding: 10px;
  box-sizing: border-box;

  background: #434343;

  border: 1px solid #e3e3e3;
  border-radius: 0 0 6px 6px;
`;

/* 바코드 */
const BarcodeBox = styled.div`
  width: 330px;
  height: 73px;

  padding: 16px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #fbfbfb;

  border: 1px solid #d0d0d0;
  border-radius: 0 0 6px 6px;

  overflow: hidden;
`;

export default function OrderCard({ order, onCancel, onRefresh }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // =========================
  // 서버 진행 단계
  // =========================
  const steps = [
    {
      id: 1,
      status: "접수 완료",
      label: "접수 완료",
      completedTime: order.receivedAt,
    },
    {
      id: 2,
      status: "상담 진행",
      label: "상담 진행",
      completedTime: order.consultingAt,
    },
    {
      id: 3,
      status: "본사 도착",
      label: "본사 도착",
      completedTime: order.hqArrivedAt,
    },
    {
      id: 4,
      status: "제품 검수",
      label: "제품 검수",
      completedTime: order.inspectingAt,
    },
    {
      id: 5,
      status: "제작 진행",
      label: "제작 진행",
      completedTime: order.inProgressAt,
    },
    {
      id: 6,
      status: "제작 완료",
      label: "제작 완료",
      completedTime: order.completedAt,
    },
    {
      id: 7,
      status: "배송 중",
      label: "배송 중",
      completedTime: order.shippingAt,
    },
    {
      id: 8,
      status: "매장 도착",
      label: "매장 도착",
      completedTime: order.storeArrivedAt,
    },
  ];

  // =========================
  // 날짜 표시 함수
  // =========================
  const formatDateTime = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =========================
  // 현재 진행 단계
  // =========================
  const currentStepIndex = steps.findIndex(
    (step) => step.status === order.currentStatus,
  );

  // =========================
  // 현재 예약 날짜 / 시간
  // CalendarModal 형식으로 변환
  // =========================
  const visitDateObject = order.visitDate ? new Date(order.visitDate) : null;

  const initialDate = visitDateObject
    ? `${visitDateObject.getFullYear()}.${
        visitDateObject.getMonth() + 1
      }.${visitDateObject.getDate()}`
    : "";

  const initialTime = visitDateObject
    ? `${String(visitDateObject.getHours()).padStart(2, "0")}:${String(
        visitDateObject.getMinutes(),
      ).padStart(2, "0")}`
    : "";

  // =========================
  // 예약 변경
  // =========================
  const handleReservationChange = async ({ date, time }) => {
    console.log("handleReservationChange 진입:", {
      date,
      time,
      order,
    });

    try {
      const [year, month, day] = date.split(".");

      const formattedDate = [
        year,
        month.padStart(2, "0"),
        day.padStart(2, "0"),
      ].join("-");

      const formattedTime = time.replace(/^(오전|오후)\s*/, "");

      const visitDate = `${formattedDate}T${formattedTime}:00`;

      const payload = {
        reformId: order.reformId,
        storeId: order.storeId,
        visitDate,
      };

      console.log("예약 변경 payload:", payload);

      await updateReservation(order.reservationId, payload);

      console.log("예약 변경 성공");

      await onRefresh();

      setIsCalendarOpen(false);
    } catch (error) {
      console.error("예약 변경 실패:", error);
      console.error("예약 변경 실패 응답:", error.response?.data);
    }
  };

  return (
    <>
      <Card>
        <TopBox>
          {/* 주문번호 */}
          <OrderNumberRow>
            <OrderNumberLabel>주문번호</OrderNumberLabel>

            <OrderNumber>{order.orderNumber}</OrderNumber>
          </OrderNumberRow>

          {/* 상품 정보 */}
          <ProductBox>
            <ProductImage src={order.productImageUrl} alt={order.productName} />

            <ProductInfo>
              <InfoRow>
                <InfoLabel>예약 제품</InfoLabel>

                <InfoValue>{order.productName}</InfoValue>
              </InfoRow>

              <InfoRow>
                <InfoLabel>매장</InfoLabel>

                <InfoValue>{order.storeName}</InfoValue>
              </InfoRow>

              <ActionButtonArea>
                <ActionButton
                  width="99px"
                  height="30px"
                  onClick={() => setIsCalendarOpen(true)}
                >
                  예약 변동
                </ActionButton>

                <ActionButton width="99px" height="30px" onClick={onCancel}>
                  예약 취소
                </ActionButton>
              </ActionButtonArea>
            </ProductInfo>
          </ProductBox>

          {/* 진행 상황 */}
          <ProgressBox>
            <StateArea>
              <ProgressLine />

              {steps.map((step, index) => {
                const isCurrent = index === currentStepIndex;

                return (
                  <StateItem key={step.id}>
                    <StepIcon
                      src={isCurrent ? activeStepIcon : inactiveStepIcon}
                      $active={isCurrent}
                      alt=""
                    />

                    <StateLabel $active={isCurrent}>{step.label}</StateLabel>
                  </StateItem>
                );
              })}
            </StateArea>

            {/* 단계별 도달 시간 */}
            <DateArea>
              {steps.map((step, index) => {
                const isCurrent = index === currentStepIndex;

                return (
                  <DateItem key={step.id} $active={isCurrent}>
                    {formatDateTime(step.completedTime)}
                  </DateItem>
                );
              })}
            </DateArea>
          </ProgressBox>
        </TopBox>

        {/* 바코드 */}
        <BarcodeOuterBox>
          <BarcodeBox>
            <OrderBarcode value={order.barcode} />
          </BarcodeBox>
        </BarcodeOuterBox>
      </Card>

      {/* 예약 변경 캘린더 */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onSelectComplete={handleReservationChange}
        mode="edit"
        initialDate={initialDate}
        initialTime={initialTime}
      />
    </>
  );
}
