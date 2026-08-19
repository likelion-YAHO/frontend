import styled from "styled-components";

import IntentButton from "../../components/button/IntentButton";

const InfoArea = styled.div`
  padding: 0 20px 20px;
  box-sizing: border-box;
`;

const Divider = styled.div`
  width: 100px;
  height: 2px;

  margin-bottom: 9px;

  background: #141414;
`;

const ProductName = styled.h1`
  margin: 0;

  color: #141414;

  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const EditionText = styled.p`
  margin: 0;

  color: #727272;

  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

const Price = styled.p`
  margin: 9px 0 0;

  color: #141414;

  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

const StockValue = styled.span`
  color: ${({ $soldOut }) => ($soldOut ? "#ee443f" : "#727272")};

  font-size: 10px;
  font-weight: 300;
  line-height: 18px;
`;

const MetaArea = styled.div`
  margin-top: 16px;

  display: flex;
  flex-direction: column;

  gap: 8px;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;

  color: #141414;

  line-height: 22px;
`;

const MetaLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
`;

const MetaValue = styled.span`
  margin-left: 4px;

  font-size: 14px;
  font-weight: 400;
`;

const ButtonArea = styled.div`
  width: 100%;

  padding: 0 20px 10px;
  box-sizing: border-box;
`;

export default function LabEditionProductInfo({ product, onOpenStockModal }) {
  const soldOut = product.stock === 0;

  return (
    <>
      <Divider />

      <InfoArea>
        <ProductName>{product.name}</ProductName>

        <EditionText>{product.edition}</EditionText>

        <Price>₩{product.price?.toLocaleString()}</Price>

        <StockValue $soldOut={soldOut}>
          {soldOut ? "품절" : `${product.stock}개 남음`}
        </StockValue>

        <MetaArea>
          <MetaRow>
            <MetaLabel>컬러 :</MetaLabel>
            <MetaValue>{product.colorName}</MetaValue>
          </MetaRow>

          <MetaRow>
            <MetaLabel>사이즈 :</MetaLabel>
            <MetaValue>{product.size}</MetaValue>
          </MetaRow>
        </MetaArea>
      </InfoArea>

      <ButtonArea>
        <IntentButton
          variant="black"
          width="100%"
          height="44px"
          disabled={soldOut}
          onClick={onOpenStockModal}
        >
          {soldOut ? "품절" : "매장 재고 확인"}
        </IntentButton>
      </ButtonArea>
    </>
  );
}
