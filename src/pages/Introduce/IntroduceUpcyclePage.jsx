import styled from "styled-components";

import BrandIntro from "../MainPage/BrandIntro";

import threeBags from "../../assets/images/introduce/three_bags.png";
import mcmHaus from "../../assets/images/introduce/mcm_haus.jpg";
import mcmInterior from "../../assets/images/introduce/mcm_interior.png";
import mcmShop from "../../assets/images/introduce/mcm_shop.jpg";

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
  object-position: ${({ $position }) => $position};

  display: block;
`;

/* 하나의 본문 섹션 */
const TextSection = styled.div`
  display: flex;
  flex-direction: column;
`;

/* 01. MCM의 헤리티지를 이어가는 새로운 방식 */
const SectionTitle = styled.h2`
  margin: 0 0 28px;

  color: #141414;

  font-size: 18px;
  font-weight: 600;
  line-height: 26px;

  word-break: keep-all;
`;

/* MCM ATELIER */
const SubTitle = styled.h3`
  margin: 0 0 8px;
  color: #141414;

  font-size: 14px;
  font-weight: 600;
  line-height: 22px;

  word-break: keep-all;
`;

/* 일반 본문 */
const BodyText = styled.p`
  margin: 0;

  color: #141414;

  font-size: 10px;
  font-weight: 500;
  line-height: 18px;

  word-break: keep-all;

  text-indent: 5px;
`;

/* 두 번째 문단부터 문단 간격 */
const Paragraph = styled.p`
  margin: 20px 0 0;

  color: #141414;

  font-size: 10px;
  font-weight: 500;
  line-height: 18px;

  word-break: keep-all;

  text-indent: 5px;
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
          <TextSection>
            <SectionTitle>
              01. MCM의 헤리티지를 이어가는 새로운 방식
            </SectionTitle>

            <SubTitle>MCM ATELIER</SubTitle>

            <BodyText>
              MCM에게 지속가능성은 단순히 새로운 소재를 사용하는 것에 그치지
              않습니다. <br />
              오랜 시간 이어온 MCM의 헤리티지를 보존하면서, 이미 존재하는 제품의
              소재와 가치를 새로운 방식으로 이어가는 것. 업사이클링은 그 가치를
              지속시키는 중요한 방법입니다.
            </BodyText>

            <Paragraph>
              MCM은 RUN Project, 업사이클링 프로젝트 라인, UPCYCLING & CULTURE
              등 다양한 프로젝트를 통해 잊혀 소비의 기존 MCM 제품을 새로운
              디자인으로 재탄생시켜왔습니다. 아티스트와 디자이너와의 협업을 통해
              기존 제품을 새로운 시선으로 재해석하며, MCM의 헤리티지를 과거에
              머무르지 않고 계속 확장해왔습니다.
            </Paragraph>

            <Paragraph>
              MCM ATELIER는 이러한 MCM의 철학을 소비자의 경험으로 확장하는
              공간입니다. 기존 제품을 새로운 모습으로 되살리는 경험부터, MCM의
              다음 디자인을 직접 제안하는 경험까지, 소비자가 MCM의 가치를 단순히
              소비하는 것을 넘어, 직접 재해석하고 새로운 이야기를 만들어갈 수
              있도록 합니다.
            </Paragraph>
          </TextSection>

          <SubImage
            src={mcmHaus}
            alt="MCM 업사이클링 프로젝트"
            $position="center 14%"
          />

          <TextSection>
            <SectionTitle>
              02. 내가 가진 MCM의 새로운 가능성을 발견하다
            </SectionTitle>

            <SubTitle>UPCYCLING</SubTitle>

            <BodyText>
              첫 번째 경험은 UPCYCLING입니다. <br /> 시간이 지나 사용감이 생긴
              가방, 한때 좋아했지만 지금의 취향과는 조금 달라진 가방. 그렇다고
              그 제품이 가진 가치까지 사라지는 것은 아닙니다.
            </BodyText>

            <Paragraph>
              사용자는 자신이 가지고 있는 MCM 제품을 업사이클링 서비스에
              등록하고, 원하는 스타일과 방향을 제안합니다. AI는 제품의 형태와
              소재, 컬러 등을 분석해 기존 제품의 특성을 살리면서 새로운 모습으로
              변화시킬 수 있는 디자인을 제안합니다. 사용자는 여러 시안 중 원하는
              디자인을 선택하고, 필요한 커스텀 요소를 더해 자신의 제품을 새롭게
              디자인합니다.
            </Paragraph>

            <Paragraph>
              이 과정에서 업사이클링은 단순히 오래된 제품을 다시 사용하는 것을
              넘어, 이미 가진 제품의 가치를 발견하고 사용자의 현재 취향에 맞게
              생명을 연장하는 경험이 됩니다. 새로운 제품을 구매하는 대신, 내가
              가진 MCM을 다시 바라보는 것. UPCYCLING은 지속가능성을 개인의
              선택과 경험으로 연결합니다.
            </Paragraph>
          </TextSection>

          <SubImage src={mcmInterior} alt="MCM 업사이클링 공간" />

          <TextSection>
            <SectionTitle>03. MCM의 다음 디자인을 함께 만들다</SectionTitle>

            <SubTitle>MCM LAB</SubTitle>

            <BodyText>
              UPCYCLING이 내가 가진 MCM을 다시 디자인하는 경험이라면, MCM LAB은
              MCM의 새로운 디자인을 직접 제안하는 경험입니다.
            </BodyText>

            <Paragraph>
              MCM LAB에서는 매월 새로운 패션 테마와 업사이클링 소재를 미션으로
              제시합니다. 사용자는 그달의 주제를 확인하고 디자인할 MCM 모델을
              선택한 뒤, 원하는 스타일과 방향을 프롬프트로 입력합니다. AI는
              사용자의 아이디어와 선택한 MCM 모델을 바탕으로 새로운 디자인을
              생성하고, 사용자는 참, 스카프, 키링 등 추가 상품을 더해 자신의
              아이디어를 발전시킬 수 있습니다. 완성된 디자인은 다른 소비자들과
              공유되며, 인기 랭킹과 MCM 본사의 심사를 거쳐 최종 6개의 디자인이
              선정됩니다. 선정된 디자인은 실제 업사이클링 제품으로 제작되어
              소비자에게 공개됩니다.
            </Paragraph>

            <Paragraph>
              즉, MCM LAB은 소비자가 완성된 MCM을 선택하는 공간이 아니라, 직접
              MCM의 새로운 디자인을 제안하고 실제 제품의 탄생 과정에 참여하는
              공간입니다.
            </Paragraph>
          </TextSection>

          <SubImage
            src={mcmShop}
            alt="MCM 업사이클링 프로젝트"
            $position="center 58%"
          />

          <TextSection>
            <SectionTitle>
              04. 디지털에서 매장, 그리고 문화 공간으로
            </SectionTitle>

            <SubTitle>MCM CULTURE</SubTitle>

            <BodyText>
              MCM ATELIER의 경험은 앱 안에서 끝나지 않습니다. <br />
              UPCYCLING을 통해 나의 MCM을 새로운 모습으로 되살리고, MCM LAB을
              통해 새로운 MCM의 가능성을 직접 제안합니다, MCM LAB에서 선정된
              6개의 디자인은 실제 제품으로 제작되어 매장에서 만나볼 수 있습니다.
            </BodyText>

            <Paragraph>
              디지털에서 발견하고 → 직접 디자인하고 → 실제 제품으로 경험하고 →
              다시 MCM의 문화로 이어지는 것. 완성된 제품과 소비자의 창작 과정은
              MCM ATELIER 안에 기록되고, 다른 소비자에게 새로운 영감을
              전달합니다.
            </Paragraph>

            <Paragraph>
              나아가 MCM LAB의 선정작과 다양한 업사이클링 결과물은 MCM House와
              Kunsthalle와 같은 문화 공간에서 전시와 콘텐츠로 확장될 수
              있습니다. 소비자가 브랜드가 만든 문화를 감상하는 데서 그치지 않고,
              자신의 아이디어가 다시 MCM의 문화와 헤리티지를 구성하는 것입니다.
              이렇게 MCM ATELIER는 UPCYCLING으로 기존의 가치를 이어가고, MCM
              LAB으로 새로운 가치를 함께 만들며, 그 결과를 매장과 문화 공간으로
              확장합니다.
            </Paragraph>

            <Paragraph>
              MCM의 헤리티지는 과거에 머무르지 않습니다. <br />
              KEEP THE HERITAGE. EXTEND THE STORY. 이미 가진 것의 가치를 다시
              발견하고, 새로운 디자인을 함께 만들며, MCM의 다음 이야기를
              이어갑니다.
            </Paragraph>
          </TextSection>
        </CenterSection>
      </Content>

      <BrandIntro />
    </Page>
  );
}
