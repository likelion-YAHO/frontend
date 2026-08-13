import styled from "styled-components";

import Accordion from "../../components/accordion/Accordion";

const Page = styled.div`
  width: 100%;
  min-height: 100%;

  background: #fbfbfb;
`;

const AccordionList = styled.div`
  width: 100%;

  margin-top: 2px;

  display: flex;
  flex-direction: column;
`;

export default function InquiryPage() {
  return (
    <Page>
      <AccordionList>
        <Accordion title="상담원에게 문의하기" dark>
          내용
        </Accordion>

        <Accordion title="제품 상태에 대해 문의하고 싶어요.">내용</Accordion>

        <Accordion title="업사이클링 결과가 예상과 달라요.">내용</Accordion>

        <Accordion title="추가 비용이 발생한 이유가 궁금해요.">내용</Accordion>

        <Accordion title="제품을 교환하거나 재작업할 수 있나요?">
          내용
        </Accordion>

        <Accordion title="수령한 제품의 구성품이 누락됐어요.">내용</Accordion>
      </AccordionList>
    </Page>
  );
}
