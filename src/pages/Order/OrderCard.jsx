import styled from "styled-components";

import ActionButton from "../../components/button/ActionButton";
import OrderBarcode from "./OrderBarcode";

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

const ExpectedDate = styled.div`
  height: 20px;

  margin-top: 6px;

  display: flex;
  align-items: center;

  color: #727272;

  font-size: 12px;
  font-weight: 400;
  line-height: 20px;

  white-space: nowrap;
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

export default function OrderCard({ order }) {
  const currentStepIndex = order.steps.reduce((lastIndex, step, index) => {
    return step.completed ? index : lastIndex;
  }, -1);

  return (
    <Card>
      <TopBox>
        <OrderNumberRow>
          <OrderNumberLabel>주문번호</OrderNumberLabel>
          <OrderNumber>{order.orderNumber}</OrderNumber>
        </OrderNumberRow>

        <ProductBox>
          <ProductImage src={order.productImage} alt={order.productName} />

          <ProductInfo>
            <InfoRow>
              <InfoLabel>예약 제품</InfoLabel>
              <InfoValue>{order.productName}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>매장</InfoLabel>
              <InfoValue>{order.store}</InfoValue>
            </InfoRow>

            <ActionButtonArea>
              <ActionButton width="99px" height="30px">
                예약 변동
              </ActionButton>

              <ActionButton width="99px" height="30px">
                예약 취소
              </ActionButton>
            </ActionButtonArea>
          </ProductInfo>
        </ProductBox>

        <ProgressBox>
          <StateArea>
            <ProgressLine />

            {order.steps.map((step, index) => {
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

          <DateArea>
            {order.steps.map((step, index) => {
              const isCurrent = index === currentStepIndex;

              return (
                <DateItem key={step.id} $active={isCurrent}>
                  {step.completed ? step.completedTime : ""}
                </DateItem>
              );
            })}

            <ExpectedDate>예상 도착일 {order.expectedArrivalDate}</ExpectedDate>
          </DateArea>
        </ProgressBox>
      </TopBox>

      <BarcodeOuterBox>
        <BarcodeBox>
          <OrderBarcode value={order.orderNumber} />
        </BarcodeBox>
      </BarcodeOuterBox>
    </Card>
  );
}
