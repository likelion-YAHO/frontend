import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import Accordion from "../../components/accordion/Accordion";
import IntentButton from "../../components/button/IntentButton";

import { createInquiry } from "../../api/inquiry";

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

const InquiryForm = styled.div`
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;

  padding: 10px;
  box-sizing: border-box;

  border: 1px solid #e3e3e3;

  background: #ffffff;

  color: #141414;

  font-size: 12px;
  font-family: inherit;

  resize: none;

  outline: none;

  &::placeholder {
    color: #a7a7a7;
  }
`;

const SubmitButtonArea = styled.div`
  width: 100%;

  margin-top: 16px;
`;

const AnswerText = styled.p`
  margin: 0;

  color: #141414;

  font-size: 12px;
  font-weight: 400;
  line-height: 20px;

  text-indent: 3px;
`;

export default function InquiryPage() {
  const location = useLocation();

  const [inquiryText, setInquiryText] = useState("");

  const orderNumber = location.state?.orderNumber;

  const handleSubmitInquiry = async (closeAccordion) => {
    const content = inquiryText.trim();

    if (!content) return;

    if (!orderNumber) {
      console.error("주문번호가 없습니다.");
      return;
    }

    try {
      await createInquiry(orderNumber, {
        content,
      });

      console.log("문의 등록 성공");

      setInquiryText("");

      closeAccordion();
    } catch (error) {
      console.error("문의 등록 실패:", error);
      console.error("서버 응답:", error.response?.data);
    }
  };

  return (
    <Page>
      <AccordionList>
        <Accordion title="상담원에게 문의하기" dark>
          {(closeAccordion) => (
            <InquiryForm>
              <TextArea
                placeholder="문의하실 내용을 자세히 남겨주세요."
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
              />

              <SubmitButtonArea>
                <IntentButton
                  variant="black"
                  width="100%"
                  height="44px"
                  disabled={!inquiryText.trim()}
                  onClick={() => handleSubmitInquiry(closeAccordion)}
                >
                  작성 완료
                </IntentButton>
              </SubmitButtonArea>
            </InquiryForm>
          )}
        </Accordion>

        <Accordion title="제품 상태에 대해 문의하고 싶어요.">
          <AnswerText>
            업사이클링 과정에서 발생할 수 있는 자연스러운 사용감이나 소재의
            특성이 아닌, 제품의 오염·파손·마감 불량 등이 확인되는 경우 문의를
            접수해 주세요. 제품 상태를 확인한 후 교환 또는 재작업 가능 여부를
            안내해 드립니다.
          </AnswerText>
        </Accordion>

        <Accordion title="업사이클링 결과가 예상과 달라요.">
          <AnswerText>
            업사이클링 제품은 소재의 상태와 특성에 따라 이미지와 실제 결과물에
            차이가 있을 수 있습니다. 다만 신청한 디자인이나 옵션과 현저한 차이가
            있는 경우 제품을 확인한 후 재작업 가능 여부를 안내해 드립니다.
          </AnswerText>
        </Accordion>

        <Accordion title="추가 비용이 발생한 이유가 궁금해요.">
          <AnswerText>
            제품 입고 후 실제 상태를 확인하는 과정에서 사전 확인된 내용보다
            손상이 심하거나 추가 작업이 필요한 경우 추가 비용이 발생할 수
            있습니다. 추가 비용이 발생하는 경우 작업 전에 안내해 드립니다.
          </AnswerText>
        </Accordion>

        <Accordion title="제품을 교환하거나 재작업할 수 있나요?">
          <AnswerText>
            수령한 제품에 제작상의 문제가 있거나 신청 내용과 다른 결과물이
            제작된 경우 교환 또는 재작업을 요청할 수 있습니다. 제품 상태와 작업
            내용을 확인한 후 가능한 방법을 안내해 드립니다.
          </AnswerText>
        </Accordion>

        <Accordion title="수령한 제품의 구성품이 누락됐어요.">
          <AnswerText>
            신청한 옵션이나 구성품이 제품과 함께 배송되지 않은 경우 문의를
            접수해 주세요. 주문 내역을 확인한 후 누락된 구성품의 배송 여부를
            안내해 드립니다.
          </AnswerText>
        </Accordion>
      </AccordionList>
    </Page>
  );
}
