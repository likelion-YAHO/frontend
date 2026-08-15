import styled from "styled-components";

import Accordion from "../../components/accordion/Accordion";

const AccordionArea = styled.div`
  padding: 0 20px;
  box-sizing: border-box;
`;

const DetailContent = styled.div`
  color: #141414;

  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

const DetailDescription = styled.p`
  margin: 0 0 32px;

  word-break: keep-all;
`;

const DetailSubDescription = styled.p`
  margin: 0 0 32px;

  color: #141414;

  font-size: 12px;
  line-height: 20px;

  word-break: keep-all;
`;

const DetailList = styled.ul`
  margin: 0;
  padding-left: 16px;

  display: flex;
  flex-direction: column;
`;

const DetailListItem = styled.li`
  padding-left: 2px;

  color: #141414;

  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`;

const StyleNumber = styled.p`
  margin: 32px 0 0;

  color: #727272;

  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`;

const PolicySection = styled.div`
  & + & {
    margin-top: 32px;
  }
`;

const PolicyTitle = styled.h3`
  margin: 0 0 6px;

  color: #141414;

  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const PolicyText = styled.p`
  margin: 0;

  color: #141414;

  font-size: 14px;
  font-weight: 400;
  line-height: 22px;

  word-break: keep-all;

  & + & {
    margin-top: 3px;
  }
`;

const PolicyLink = styled.span`
  text-decoration: underline;
  text-underline-offset: 2px;

  cursor: pointer;
`;

export default function LabEditionProductDetails() {
  return (
    <AccordionArea>
      <Accordion title="제품 상세정보" fontSize="12px" border>
        <DetailContent>
          <DetailDescription>
            피라미드 모양 스터드 장식과 천연 나파 가죽 트림이 특징인 비세토스
            모노그램 캔버스 백팩
          </DetailDescription>

          <DetailSubDescription>
            글로벌 노마드의 자유로운 정신을 담은 휴대용 아이콘, 비세토스
            캔버스와 천연 나파 가죽으로 제작된 스터드 백팩은 기기, 서류,
            액세서리를 품격 있게 정리할 수 있습니다. 피라미드 모양 스터드가
            반짝이는 피니시로 실루엣을 장식합니다.
          </DetailSubDescription>

          <DetailList>
            <DetailListItem>조절 가능한 어깨 스트랩</DetailListItem>
            <DetailListItem>조절 가능한 허리 스트랩</DetailListItem>
            <DetailListItem>가죽 손잡이 부분</DetailListItem>
            <DetailListItem>MCM 로고 플레이트</DetailListItem>
            <DetailListItem>천연 지퍼 손잡이</DetailListItem>
            <DetailListItem>외부 사이드 포켓과 스터드 장식</DetailListItem>
            <DetailListItem>양방향 지퍼 클로저</DetailListItem>
            <DetailListItem>내부 포켓 및 13인치 노트북 슬리브</DetailListItem>
            <DetailListItem>24K 도금 금속 장식</DetailListItem>
            <DetailListItem>바디: 비세토스 모노그램 캔버스</DetailListItem>
            <DetailListItem>트림: 천연 나파 가죽</DetailListItem>
            <DetailListItem>24K 도금 금속 장식</DetailListItem>
            <DetailListItem>안감: 코튼 캔버스</DetailListItem>
            <DetailListItem>약 16 × 33 × 41 센티미터</DetailListItem>
            <DetailListItem>스트랩 길이: 76cm–90cm</DetailListItem>
            <DetailListItem>제조국: 대한민국</DetailListItem>
            <DetailListItem>MCM 로고 플레이트</DetailListItem>
          </DetailList>

          <StyleNumber>스타일 # MMKEAVE12C0001</StyleNumber>
        </DetailContent>
      </Accordion>

      <Accordion title="무료 배송" fontSize="12px" border>
        <DetailContent>
          <PolicySection>
            <PolicyTitle>배송</PolicyTitle>

            <PolicyText>
              결제 완료 후, CJ 대한통운을 통해 영업일 기준 1~2일 이내에 배송이
              시작됩니다.
            </PolicyText>

            <PolicyText>
              지속 가능한 가치를 위해 별도의 선물 포장 대신 시그니처 쇼핑백을
              제공합니다.
            </PolicyText>

            <PolicyText>
              MCM Atelier의 모든 주문에는 무료 배송 서비스가 기본 제공됩니다.
            </PolicyText>
          </PolicySection>

          <PolicySection>
            <PolicyTitle>반품</PolicyTitle>

            <PolicyText>
              상품 수령 후 사용하지 않은 제품에 한해 15일 이내 반품이
              가능합니다.
            </PolicyText>

            <PolicyText>
              반품 접수는 주문내역의 문의하기에서 상담원에게 문의하기를 통해
              문의해 주시기 바랍니다.
            </PolicyText>

            <PolicyText>
              배송 및 반품에 대한 자세한 내용은{" "}
              <PolicyLink>고객서비스 &gt; 자주 묻는 질문(FAQ)</PolicyLink>을
              참고해 주세요.
            </PolicyText>
          </PolicySection>
        </DetailContent>
      </Accordion>
    </AccordionArea>
  );
}
