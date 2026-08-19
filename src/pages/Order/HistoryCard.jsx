import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ActionButton from "../../components/button/ActionButton";

import cancelIcon from "../../assets/images/icons/loginError_icon.svg";

const Card = styled.div`
  width: 350px;

  padding: 6px 10px 10px;
  box-sizing: border-box;

  background: #f6f6f6;

  border: 1px solid #e3e3e3;
  border-radius: 6px;
`;

/* =========================
   주문 번호
========================= */
const OrderHeaderRow = styled.div`
  height: 22px;

  margin-bottom: 4px;

  display: flex;
  align-items: center;
`;

const CancelStatus = styled.div`
  margin-right: 6px;

  display: flex;
  align-items: center;
  gap: 4px;

  color: #e84c4c;

  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

const CancelIcon = styled.img`
  width: 16px;
  height: 16px;

  margin-left: 4px;

  object-fit: contain;
`;

const OrderNumberLabel = styled.span`
  margin-left: 4px;
  margin-right: 6px;

  color: #727272;

  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

const OrderNumber = styled.span`
  color: #727272;

  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

/* =========================
   상품 정보 박스
========================= */

const ProductBox = styled.div`
  width: 330px;
  height: 158px;

  padding: 16px;
  box-sizing: border-box;

  display: flex;
  gap: 16px;

  background: #fbfbfb;

  border: 1px solid #e3e3e3;
  border-radius: 6px;
`;

/* 이미지 영역 */
const ProductImage = styled.img`
  width: 86px;
  height: 110px;

  flex-shrink: 0;

  /* ProductBox 내부에서 세로 중앙 */
  align-self: center;

  background: #fbfbfb;

  border: 1px solid #e3e3e3;
  box-sizing: border-box;
`;

/* 상품 정보 영역 */
const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;

  margin-top: 4px;

  display: flex;
  flex-direction: column;
`;

const InfoRow = styled.div`
  width: 100%;
  height: 20px;

  display: flex;
  align-items: center;

  visibility: ${({ $hidden }) => ($hidden ? "hidden" : "visible")};

  & + & {
    margin-top: 6px;
  }
`;

const InfoLabel = styled.span`
  width: 45px;

  flex-shrink: 0;

  color: #727272;

  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
`;

const InfoValue = styled.span`
  flex: 1;
  min-width: 0;

  color: #727272;

  font-size: 12px;
  font-weight: 400;
  line-height: 20px;

  margin-left: 12px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonArea = styled.div`
  width: 100%;

  margin-top: 16px;
`;

export default function HistoryCard({ order, onRestore }) {
  const navigate = useNavigate();

  const isCancelled = order.currentStatus === "CANCELLED";

  // 실제 수령 날짜 표시
  const formattedPickedUpAt = order.pickedUpAt
    ? new Date(order.pickedUpAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

  return (
    <Card>
      <OrderHeaderRow>
        {isCancelled && (
          <CancelStatus>
            <CancelIcon src={cancelIcon} alt="" />
            취소된 주문
          </CancelStatus>
        )}

        <OrderNumberLabel>주문번호</OrderNumberLabel>

        <OrderNumber>{order.orderNumber}</OrderNumber>
      </OrderHeaderRow>

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

          {!isCancelled && (
            <InfoRow>
              <InfoLabel>수령 날짜</InfoLabel>

              <InfoValue>{formattedPickedUpAt}</InfoValue>
            </InfoRow>
          )}

          <ButtonArea>
            {isCancelled ? (
              <ActionButton width="100%" height="26px" onClick={onRestore}>
                예약 복원
              </ActionButton>
            ) : (
              <ActionButton
                width="100%"
                height="30px"
                onClick={() =>
                  navigate("/inquiry", {
                    state: {
                      orderNumber: order.orderNumber,
                    },
                  })
                }
              >
                문의하기
              </ActionButton>
            )}
          </ButtonArea>
        </ProductInfo>
      </ProductBox>
    </Card>
  );
}
