import styled from "styled-components";

const Table = styled.div`
  margin-top: 16px;
  border-top: 1px solid #e3e3e3;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;

  padding: 4px 0;
  border-bottom: 1px solid #e3e3e3;
`;

const Row = styled.div`
  display: flex;
  align-items: center;

  padding: 4px 0;
`;

const ColName = styled.span`
  flex: 1;
  color: #727272;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
`;

const ColQuantity = styled.span`
  width: 60px;
  text-align: center;
  color: #727272;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
`;

const ColPrice = styled.span`
  width: 100px;
  text-align: right;
  color: #727272;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
`;

const TotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 6px;
  padding: 6px 0;
  border-top: 1px solid #141414;
  border-bottom: 1px solid #141414;
`;

const TotalLabel = styled.span`
  color: #727272;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
`;

const TotalAmount = styled.span`
  color: #141414;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
`;

const formatPrice = (value) => `${value.toLocaleString()} ₩`;

export default function PriceSummaryTable({ items, total }) {
  return (
    <>
      <Table>
        <HeaderRow>
          <ColName>상품명</ColName>
          <ColQuantity>수량</ColQuantity>
          <ColPrice>금액</ColPrice>
        </HeaderRow>

        {items.map((item) => (
          <Row key={item.id}>
            <ColName>{item.name}</ColName>
            <ColQuantity>{item.quantity}</ColQuantity>
            <ColPrice>{formatPrice(item.price)}</ColPrice>
          </Row>
        ))}
      </Table>

      <TotalRow>
        <TotalLabel>합계</TotalLabel>
        <TotalAmount>{formatPrice(total)}</TotalAmount>
      </TotalRow>
    </>
  );
}