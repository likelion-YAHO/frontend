import styled from "styled-components";
import locationPinGrayIcon from "../../assets/images/icons/location_pin_gray_icon.svg";
import phoneIcon from "../../assets/images/icons/phone_icon.svg";

const StoreListItem = ({ store, $selected, onClick }) => {
  return (
    <Item $selected={$selected} onClick={onClick}>
      <StoreName>{store.name}</StoreName>

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

  cursor: pointer;
`;

const StoreName = styled.p`
  color: var(--gray-900, #141414);
  font-size: 16px;
  font-family: Pretendard Variable;
  font-weight: 600;
  line-height: 24px;

  margin: 0;
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
