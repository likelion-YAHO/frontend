import styled from "styled-components";
import locationPinGrayIcon from "../../assets/images/icons/location_pin_gray_icon.svg";
import phoneIcon from "../../assets/images/icons/phone_icon.svg";

const StoreListItem = ({ store, $selected, onClick, stock }) => {
  const soldOut = stock === 0;

  return (
    <Item
      $selected={$selected}
      onClick={soldOut ? undefined : onClick}
      $soldOut={soldOut}
    >
      <StoreName>{store.name}</StoreName>

      {stock !== undefined && (
        <StockText $soldOut={soldOut}>
          {soldOut ? "0개 남음" : `${stock}개 남음`}
        </StockText>
      )}

      <InfoRow>
        <Icon src={locationPinGrayIcon} alt="" />
        <InfoText>{store.address}</InfoText>
      </InfoRow>

      <InfoRow>
        <Icon src={phoneIcon} alt="" />
        <InfoText>{store.phone}</InfoText>
      </InfoRow>
    </Item>
  );
};

export default StoreListItem;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  padding: 10px 20px;

  background: ${({ $selected }) => ($selected ? "#D0D0D0" : "#F6F6F6")};

  opacity: ${({ $soldOut }) => ($soldOut ? 0.7 : 1)};

  cursor: ${({ $soldOut }) => ($soldOut ? "default" : "pointer")};
`;

const StoreName = styled.p`
  color: var(--gray-900, #141414);
  font-size: 16px;
  font-family: Pretendard Variable;
  font-weight: 600;
  line-height: 24px;

  margin: 0;
`;

const StockText = styled.p`
  margin: 0;

  color: ${({ $soldOut }) => ($soldOut ? "#ee443f" : "#141414")};

  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Icon = styled.img`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
`;

const InfoText = styled.span`
  color: var(--gray-700, #727272);
  font-size: 14px;
  font-family: Pretendard Variable;
  font-weight: 400;
  line-height: 22px;
`;
