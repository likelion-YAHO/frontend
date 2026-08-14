import styled from "styled-components";

import BrandIntro from "../MainPage/BrandIntro";

import threeBags from "../../assets/images/introduce/three_bags.png";
import mcmHaus from "../../assets/images/introduce/mcm_haus.jpg";
import mcmInterior from "../../assets/images/introduce/mcm_interior.png";

const Page = styled.div`
  width: 100%;
  min-height: 100%;

  background: #fbfbfb;
`;

const Content = styled.div`
  width: 100%;
`;

/* 위쪽 */
const IntroSection = styled.section`
  padding: 24px;
  box-sizing: border-box;
`;

const MainTitle = styled.h1`
  margin: 0 9px 12px 9px;

  color: #141414;

  font-size: 32px;
  font-weight: 600;
  line-height: 40px;

  word-break: keep-all;
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;

  display: block;

  object-fit: cover;
`;

/* 중간 */
const CenterSection = styled.section`
  padding: 36px 20px 0;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const SubImage = styled.img`
  width: 100%;
  height: 120px;

  object-fit: cover;
  object-position: center 14%;

  display: block;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h2`
  color: #141414;

  font-size: 16px;
  font-weight: 600;
  line-height: 24px;

  word-break: keep-all;
`;

const BodyText = styled.p`
  margin: 0;

  color: #4c4c4c;

  font-size: 13px;
  font-weight: 500;
  line-height: 18px;

  word-break: keep-all;
`;

export default function IntroduceUpcyclePage() {
  return (
    <Page>
      <Content>
        <IntroSection>
          <MainTitle>
            MCM의 가치를 이어가는
            <br />
            새로운 방법
          </MainTitle>
        </IntroSection>

        <MainImage src={threeBags} alt="MCM 업사이클링 소개" />

        <CenterSection>
          <TextGroup>
            <SectionTitle>
              MCM에게 지속가능성은 단순히 새로운 소재를 사용하는 것에 그치지
              않습니다.
            </SectionTitle>

            <BodyText>
              오랜 시간 이어온 MCM의 헤리티지를 보존하면서, 이미 존재하는 제품의
              가치를 새로운 방식으로 이어가는 것을 중요하게 생각합니다.
            </BodyText>
          </TextGroup>

          <TextGroup>
            <SectionTitle>
              MCM은 BURN Project, 업사이클링 프로젝트를 통해 새로운 가치를
              만들어갑니다.
            </SectionTitle>

            <BodyText>
              사용된 제품과 소재를 새로운 디자인과 방식으로 재해석하여 기존의
              흔적을 지우는 대신, 그 흔적을 새로운 이야기의 일부로 남깁니다.
            </BodyText>
          </TextGroup>

          <SubImage src={mcmHaus} alt="MCM 업사이클링 프로젝트" />

          <TextGroup>
            <SectionTitle>
              하나의 제품이 새로운 형태로 다시 태어나는 과정
            </SectionTitle>

            <BodyText>
              제품의 상태와 소재를 분석하고, 각각의 특성에 맞는 방식으로
              리디자인합니다. 이를 통해 세상에 하나뿐인 새로운 제품으로
              재탄생합니다.
            </BodyText>
          </TextGroup>

          <SubImage src={mcmInterior} alt="MCM 업사이클링 공간" />

          <BodyText>
            MCM은 업사이클링을 통해 제품의 수명을 연장하고, 기존 제품이 가진
            기억과 의미를 새로운 방식으로 이어가고자 합니다.
          </BodyText>
        </CenterSection>
      </Content>

      <BrandIntro />
    </Page>
  );
}
