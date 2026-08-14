import styled from "styled-components";

const SectionWrapper = styled.section`
  padding: 42px 32px 0;

  display: flex;
  flex-direction: column;
`;

const TitleText = styled.p`
  margin: 0 0 20px;

  color: #141414;

  font-size: 14px;
  font-family: "Pretendard Variable";
  font-weight: 600;
  line-height: 22px;

  word-wrap: break-word;
`;

const BodyText = styled.p`
  margin: 0;

  color: #4c4c4c;

  font-size: 13px;
  font-family: "Pretendard Variable";
  font-weight: 400;
  line-height: 20px;

  word-wrap: break-word;
`;

function BrandStorySection() {
  return (
    <SectionWrapper>
      <TitleText>MCM: 대담한 럭셔리 여행을 향한 헌사</TitleText>

      <BodyText>
        1976년부터 MCM은 장인정신과 혁신을 바탕으로 전통적인 럭셔리의 개념을
        새롭게 정의해왔습니다. 젊음과 독립성, 그리고 쉽게 알아볼 수 있는 디자인
        감각을 지닌 MCM은 프리미엄 백과 백팩, 가죽 액세서리, 의류 컬렉션을 통해
        편안함과 품격을 동시에 추구하는 라이프스타일을 제안합니다.
      </BodyText>
    </SectionWrapper>
  );
}

export default BrandStorySection;
