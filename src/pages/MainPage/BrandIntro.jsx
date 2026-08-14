import styled from "styled-components";

import butterflyMarkBadge from "../../assets/images/icons/butterflyMarkBadge.svg";

const SectionWrapper = styled.section`
  padding: 42px 32px 32px;

  display: flex;
  flex-direction: column;
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
  margin: 0;

  color: #8c8c8c;

  font-size: 11px;
  font-family: "Pretendard Variable";
  font-weight: 400;
  line-height: 18px;

  word-wrap: break-word;
  white-space: pre-line;
`;

function BrandIntro() {
  return (
    <SectionWrapper>
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
