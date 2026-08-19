import styled from "styled-components";

const Title = styled.h1`
  margin: 0 0 10px;

  font-size: 18px;
  font-weight: 600;
  color: #141414;
`;

const Intro = styled.p`
  margin: 0 0 20px;

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

const Notice = styled.p`
  margin: 4px 0 10px;

  font-size: 10px;
  font-weight: 300;
  line-height: 18px;
  letter-spacing: -0.2px;

  color: #727272;
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

export default function UpcycleManual() {
  return (
    <>
      <Title>UPCYCLING 매뉴얼</Title>

      <Intro>
        <strong>가지고 있는 MCM</strong>을, 나의 취향으로,
        <br />
        MCM 업사이클링은 오래된 MCM 제품에 <strong>새로운 커스텀</strong>을 더해
        버리지 않고 다시 사용할 수 있도록 돕는 서비스입니다.
        <br />
        AI를 활용해 원하는 스타일을 미리 커스텀해보고, 완성된 시안을 바탕으로
        실제 업사이클링을 예약할 수 있습니다.
      </Intro>

      <Section>
        <SectionTitle>01. 제품을 등록하세요</SectionTitle>
        <Text>
          업사이클링하고 싶은 MCM 제품을 촬영해 등록하세요.
          <br />
          제품 사진을 바탕으로 AI가 제품의 형태와 상태를 분석하고 업사이클링
          가능한 요소들을 제안합니다.
        </Text>
      </Section>

      <Section>
        <SectionTitle>02. 원하는 스타일을 입력하세요</SectionTitle>
        <Text>
          AI 입력창에 원하는 업사이클링 방향을 자유롭게 작성하세요.
          <br />
          색상, 소재, 장식, 분위기 등
          <br />
          원하는 디자인 요소를 구체적으로 입력할 수 있습니다.
          <br />
          예시&#41; 터콰이즈 포인트와 실버 메탈 체인을 더한 클래식한 무드로
          커스텀하고 싶어요.
        </Text>
      </Section>

      <Section>
        <SectionTitle>03. AI 디자인 가이드를 확인하세요</SectionTitle>
        <Text>
          등록한 제품과 입력한 스타일을 AI가 분석해
          <br />
          제품에 어울리는 커스텀과 컬러를 추천합니다.
          <br />
          여러 디자인 시안 중 마음에 드는 방향을 선택해보세요.
        </Text>
      </Section>

      <Section>
        <SectionTitle>04. 원하는 부분을 커스텀하세요</SectionTitle>
        <Text>
          선택한 디자인에 원하는 포인트를 추가할 수 있습니다.
          <br />
          포켓, 스카프, 키링 등 다양한 요소를 조합해 나만의 업사이클링 디자인을
          완성하세요.
        </Text>
      </Section>

      <Section>
        <SectionTitle>05. 최종 시안을 확인하세요</SectionTitle>
        <Text>
          완성된 디자인을 확인하고 실제 제품으로 제작했을 때의 모습을 미리
          살펴보세요.
          <br />
          수정이 필요하다면 이전 단계로 돌아가 AI 디자인을 다시 생성하거나
          원하는 부분을 변경할 수 있습니다.
        </Text>
      </Section>

      <Section>
        <SectionTitle>06. 업사이클링을 예약하세요</SectionTitle>
        <Text>
          디자인이 마음에 든다면 업사이클링을 예약하세요.
          <br />
          제품을 MCM에 전달하면 선택한 디자인을 바탕으로 실제 업사이클링이
          진행됩니다.
        </Text>

        <Notice>
          ※ 실제 제작 과정에서 제품의 상태나 소재에 따라 디자인 및 추가 비용이
          변경될 수 있습니다.
        </Notice>
      </Section>

      <BottomInfo>REGISTER → AI PROMPT → CUSTOM → PREVIEW → RESERVE</BottomInfo>

      <BottomText>
        오래된 제품을 버리는 대신,
        <br />
        MCM의 헤리티지를 새로운 모습으로 이어가세요.
      </BottomText>
    </>
  );
}
