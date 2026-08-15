import styled from "styled-components";

const Card = styled.div`
  width: 100%;
  min-width: 0;
`;

const ImageArea = styled.div`
  position: relative;

  width: 100%;
  height: 200px;

  overflow: hidden;
`;

const EditionLabel = styled.span`
  position: absolute;

  top: 8px;
  left: 8px;

  z-index: 1;

  color: #8c8c8c;

  font-size: 10px;
  font-weight: 400;
  line-height: 18px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;
`;

const Divider = styled.div`
  width: 36px;
  height: 2px;

  background: #141414;
`;

const ProductName = styled.p`
  margin: 6px 8px 0;

  color: #141414;

  font-size: 10px;
  font-weight: 500;
  line-height: 18px;

  word-break: keep-all;
`;

const EditionText = styled.p`
  color: #727272;
  margin: 0 8px 6px;

  font-size: 9px;
  font-weight: 500;
  line-height: 18px;

  text-indent: 2px;
`;

const PriceArea = styled.div`
  margin: 10px 8px;

  display: flex;
  flex-direction: column;
`;

const PriceText = styled.p`
  margin: 0;

  color: #727272;

  font-size: 10px;
  font-weight: 300;
  line-height: 18px;
`;

const BottomArea = styled.div`
  margin: 0 10px 9px 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ColorChipInner = styled.div`
  width: 6px;
  height: 6px;

  left: 8px;
  top: 2px;

  position: absolute;

  transform: rotate(90deg);
  transform-origin: top left;

  background: ${({ $color }) => $color};

  border: 0.5px solid #141414;
`;

const ColorChip = styled.div`
  width: 10px;
  height: 10px;

  position: relative;

  transform: rotate(45deg);
  transform-origin: top left;

  background: #ffffff;

  overflow: hidden;

  outline: 1px solid #141414;
  outline-offset: -1px;
`;

export default function LabEditionCard({ product }) {
  return (
    <Card>
      <ImageArea>
        <EditionLabel>Lab Edition</EditionLabel>

        <ProductImage src={product.image} alt={product.name} />
      </ImageArea>

      <Divider />

      <ProductName>{product.name}</ProductName>

      <EditionText>{product.edition}</EditionText>

      <PriceArea>
        <PriceText>₩{product.price}</PriceText>
      </PriceArea>

      <BottomArea>
        <ColorChip>
          <ColorChipInner $color={product.colorHex} />
        </ColorChip>
      </BottomArea>
    </Card>
  );
}
