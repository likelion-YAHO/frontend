import { useEffect, useState } from "react";
import styled from "styled-components";

import locationPinBlackIcon from "../../assets/images/icons/location_pin_black_icon.svg";

import StoreListItem from "../storeListItem/StoreListItem";

import { getEditionStocks } from "../../api/lab";

const StoreSearchModal = ({ isOpen, onClose, onSelectComplete, editionId }) => {
  const [selectedStoreName, setSelectedStoreName] = useState(null);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    if (!isOpen || !editionId) return;

    let ignore = false;

    getEditionStocks(editionId)
      .then((data) => {
        if (ignore) return;

        console.log("Lab Edition 매장 재고:", data);

        setStores(data ?? []);
      })
      .catch((error) => {
        console.error("Lab Edition 매장 재고 조회 실패:", error);

        if (!ignore) {
          setStores([]);
        }
      });

    return () => {
      ignore = true;
    };
  }, [isOpen, editionId]);

  if (!isOpen) return null;

  const handleComplete = () => {
    const selectedStore = stores.find(
      (store) => store.storeName === selectedStoreName,
    );

    if (!selectedStore) return;

    onSelectComplete(selectedStore);

    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <Title>매장 재고 확인</Title>

        <LocationBar>
          <LocationIcon src={locationPinBlackIcon} alt="" />

          <LocationText>서울특별시 성북구 서경로 124</LocationText>
        </LocationBar>

        <StoreListBox>
          <StoreList>
            {stores.map((store) => {
              const soldOut = store.isSoldOut || store.stockCount === 0;

              return (
                <StoreListItem
                  key={store.storeName}
                  store={{
                    name: store.storeName,
                    address: store.address,
                    phone: store.phoneNumber,
                  }}
                  stock={store.stockCount}
                  $selected={store.storeName === selectedStoreName}
                  onClick={() => {
                    if (!soldOut) {
                      setSelectedStoreName(store.storeName);
                    }
                  }}
                />
              );
            })}
          </StoreList>
        </StoreListBox>

        <CompleteButton
          disabled={selectedStoreName === null}
          onClick={handleComplete}
        >
          선택 완료
        </CompleteButton>
      </ModalCard>
    </Overlay>
  );
};

export default StoreSearchModal;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  padding-top: 63px;
  box-sizing: border-box;

  background: rgba(0, 0, 0, 0.4);

  z-index: 1000;
`;

const ModalCard = styled.div`
  width: 350px;
  max-height: 80vh;

  display: flex;
  flex-direction: column;

  padding: 24px 20px;
  box-sizing: border-box;

  background: var(--gray-50, #fafafa);
  border-radius: 6px;

  overflow-y: auto;
`;

const Title = styled.h2`
  margin: 0 0 16px;

  color: var(--gray-900, #141414);

  font-size: 18px;
  font-family: Pretendard Variable;
  font-weight: 700;
  line-height: 26px;
`;

const LocationBar = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  padding: 6px 12px;

  background: var(--white, #ffffff);

  outline: 1px solid var(--gray-300, #e3e3e3);
  outline-offset: -1px;

  margin-bottom: 10px;
`;

const LocationIcon = styled.img`
  width: 15px;
  height: 17px;

  flex-shrink: 0;
`;

const LocationText = styled.span`
  color: var(--gray-900, #141414);

  font-size: 16px;
  font-family: Pretendard Variable;
  font-weight: 400;
  line-height: 24px;
`;

const StoreListBox = styled.div`
  height: 400px;

  margin-bottom: 36px;

  background: var(--BG1, #fbfbfb);

  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25) inset;

  border-radius: 6px;

  overflow-y: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StoreList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompleteButton = styled.button`
  width: 100%;

  padding: 14px 0;

  background: ${({ disabled }) =>
    disabled ? "#d0d0d0" : "var(--gray-900, #141414)"};

  border: none;
  border-radius: 8px;

  color: var(--gray-50, #fafafa);

  font-size: 14px;
  font-family: Pretendard Variable;
  font-weight: 600;
  line-height: 22px;

  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;
