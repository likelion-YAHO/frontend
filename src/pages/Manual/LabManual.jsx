import styled from "styled-components";
import manualImage from "../../assets/images/manual/mission_image.png";

const Title = styled.h1`
  margin: 0 0 10px;

  font-size: 18px;
  font-weight: 600;
  color: #141414;
`;

const Intro = styled.p`
  margin: 0 0px;

  font-size: 14px;
  font-weight: 400;
  line-height: 22px;

  color: #141414;

  text-indent: 5px;
`;

const Section = styled.section`
  margin-top: 32px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 4px;

  font-size: 14px;
  font-weight: 600;
  line-height: 22px;

  color: #141414;
`;

const Text = styled.p`
  margin: 0;

  font-size: 12px;
  font-weight: 400;
  line-height: 20px;

  color: #141414;

  text-indent: 5px;
`;

const ManualImage = styled.img`
  display: block;

  width: 236px;
  height: auto;

  margin-top: 12px;

  object-fit: cover;
`;

const BottomInfo = styled.p`
  font-size: 10px;
  font-weight: 700;
  line-height: 18px;

  color: #141414;
`;

const BottomText = styled.p`
  margin: 0;

  font-size: 12px;
  font-weight: 400;
  line-height: 20px;

  color: #141414;
`;

export default function LabManual() {
  return (
    <>
      <Title>MCM Lab 매뉴얼</Title>

      <Intro>
        <strong>나만의 아이디어</strong>를 <strong>MCM 디자인</strong>으로
        제안해보세요.
        <br />
        MCM LAB은 매월 새로운 패션 테마와 소재 미션을 바탕으로 AI와 함께 나만의
        MCM 디자인을 만들어보는 크리에이티브 공간입니다.
      </Intro>

      <Section>
        <SectionTitle>01. 이번 달 미션을 확인하세요</SectionTitle>

        <Text>
          매월 공개되는 테마와 소재를 확인하고
          <br />
          이번 MCM LAB에서 어떤 디자인을 만들지 선택해보세요.
        </Text>

        <ManualImage src={manualImage} alt="MCM Lab 미션 예시" />
      </Section>

      <Section>
        <SectionTitle>02. 디자인 모델을 선택하세요</SectionTitle>

        <Text>
          디자인을 적용할 MCM 제품 모델을 선택하세요.
          <br />
          내가 선택한 모델을 바탕으로 AI 디자인이 진행됩니다.
        </Text>
      </Section>

      <Section>
        <SectionTitle>03. 원하는 디자인을 입력하세요</SectionTitle>

        <Text>
          상상하는 디자인을 자유롭게 적어보세요.
          <br />
          색상, 소재, 패턴, 장식, 분위기 등 원하는 요소를 구체적으로 입력할수록
          AI가 아이디어에 가까운 디자인을 제안합니다.
        </Text>
      </Section>

      <Section>
        <SectionTitle>04. AI가 디자인을 이미지화 시킵니다.</SectionTitle>

        <Text>
          입력한 아이디어와 선택한 제품을 AI가 분석해 시안을 생성합니다.
          <br />
          최대 3회의 AI 생성을 통해 마음에 드는 디자인을 확인하고 내 아이디어가
          실제 MCM 디자인으로 어떻게 구현되는지 살펴보세요.
        </Text>
      </Section>

      <Section>
        <SectionTitle>05. 포인트 아이템을 추가하세요</SectionTitle>

        <Text>
          디자인에 새로운 포인트를 더하고 싶다면 포인트 스와치의 컬러를
          변형시키거나 키링, 스카프 등 다양한 액세서리를 추가해보세요. 기존
          디자인과 어울리는 포인트를 AI와 함께 조합해 더 완성도 높은 나만의
          디자인을 만들어볼 수 있습니다.
        </Text>
      </Section>

      <Section>
        <SectionTitle>06. 나의 디자인을 출품하세요</SectionTitle>

        <Text>
          완성된 디자인을 MCM LAB에 출품하면 다른 사용자들의 디자인과 함께
          공개됩니다. 사용자들의 LIKE와 MCM의 심사를 통해 최종 제작될 디자인이
          선정됩니다. 선정된 디자인은 실제 제품으로 제작될 수 있습니다.
        </Text>
      </Section>

      <Section>
        <SectionTitle>07. 실물 제작과 매장 전시</SectionTitle>

        <BottomText>
          1st — 1 DESIGN
          <br />
          최우수 디자인 1개
          <br />
          2nd — 2 DESIGNS
          <br />
          우수 디자인 2개
          <br />
          3rd — 3 DESIGNS
          <br />
          선정 디자인 3개
        </BottomText>
      </Section>

      <Section>
        <BottomInfo>
          MISSION → MODEL → PROMPT → AI DESIGN → CUSTOM → SUBMIT
        </BottomInfo>
        <BottomText>
          매월 새로운 미션에 참여하고,
          <br />
          당신의 아이디어를 MCM의 다음 디자인으로 만들어보세요.
          <br />
          DESIGN YOUR OWN HERITAGE.
        </BottomText>
      </Section>
    </>
  );
}
