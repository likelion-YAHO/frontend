import styled from "styled-components";
import butterflyMarkBadge from "../../assets/images/icons/butterflyMarkBadge.svg";

const SectionWrapper = styled.section`
  padding: 42px 32px 32px 32px;
  display: flex;
  flex-direction: column;
`;

const TitleText = styled.p`
  color: var(--gray-900, #141414);
  font-size: 14px;
  font-family: "Pretendard Variable";
  font-weight: 600;
  line-height: 22px;
  word-wrap: break-word;
  margin: 0 0 20px 0;
`;

const BodyText = styled.p`
  color: var(--gray-700, #4c4c4c);
  font-size: 13px;
  font-family: "Pretendard Variable";
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  margin: 0 0 42px 0;
`;

const BadgeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 12px;
  margin-bottom: 42px;
`;

const BadgeImage = styled.img`
  width: 120px;
  height: 124px;
`;

const FooterText = styled.p`
  color: var(--gray-500, #8c8c8c);
  font-size: 11px;
  font-family: "Pretendard Variable";
  font-weight: 400;
  line-height: 18px;
  word-wrap: break-word;
  white-space: pre-line;
  margin: 0;
`;

function BrandIntro({ showIntro = true }) {
  return (
    <SectionWrapper>
      {showIntro && (
        <>
          <TitleText>MCM: 대담한 럭셔리 여행을 향한 헌사</TitleText>

          <BodyText>
            1976년부터 MCM은 장인정신과 혁신을 바탕으로 전통적인 럭셔리의 개념을
            새롭게 정의해왔습니다. 젊음과 독립성, 그리고 쉽게 알아볼 수 있는
            디자인 감각을 지닌 MCM은 프리미엄 백과 백팩, 가죽 액세서리, 의류
            컬렉션을 통해 편안함과 품격을 동시에 추구하는 라이프스타일을
            제안합니다.
          </BodyText>
        </>
      )}
      <BadgeWrapper>
        <BadgeImage src={butterflyMarkBadge} alt="Butterfly Mark Certified" />
      </BadgeWrapper>
      <FooterText>
        {`MCM | 서울 강남구 언주로 734 (논현동)
엠씨엠코리아 공동대표 김무현, 황현성
개인정보관리책임자 : 황현성
엠씨엠코리아 통신판매업신고번호: 강남 제 6947호
사업자등록번호: 638-88-02193
Tel: 1600-1976 FAX: 070-7016-1956
E-mail: contact.kr@mcmworldwide.com
소비자피해 보상보험 (USAFE) | 고객님은 안전거래를 위해 현금 등으로
결제시 저희 쇼핑몰에서 가입한 구매안전서비스 소비자피해보상보험
서비스를 이용하실 수 있습니다.
보상대상: 미배송, 반품/환불거부, 쇼핑몰 부도 서비스 가입사실 확인하기
© 2026 MCM Worldwide. All rights reserved.`}
      </FooterText>
    </SectionWrapper>
  );
}

export default BrandIntro;
