import styled from "styled-components";

const ProductImageArea = styled.div`
  position: relative;

  width: 100%;
  height: 446px;

  overflow: hidden;

  background: #fbfbfb;
`;

const MainEditionLabel = styled.span`
  position: absolute;

  top: 24px;
  left: 20px;

  z-index: 1;

  color: #727272;

  font-size: 12px;
  font-weight: 400;
  line-height: 20px;

  pointer-events: none;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;
`;

export default function LabEditionProductHero({ product }) {
  return (
    <ProductImageArea>
      <MainEditionLabel>Lab Edition</MainEditionLabel>

      <ProductImage src={product.image} alt={product.name} />
    </ProductImageArea>
  );
}
