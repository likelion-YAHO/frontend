import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import SubHeader from "../../common/header/SubHeader";
import IntentButton from "../../components/button/IntentButton";
import dummyMcmLabModels from "../../data/dummyMcmLabModels";

const Screen = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;

  background: #f2f2f2;
`;

const Page = styled.div`
  position: relative;

  width: 100%;
  max-width: 390px;
  min-height: 100vh;

  padding: 68px 20px 0;
  box-sizing: border-box;

  background: #ffffff;

  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.h1`
  margin: 24px 0 0;

  color: var(--gray-900, #141414);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
`;

const ModelGrid = styled.div`
  margin-top: 24px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 4px;
  row-gap: 24px;

  flex: 1;
`;

const ModelCard = styled.button`
  appearance: none;
  -webkit-appearance: none;
  border: none;
  background: none;
  padding: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  cursor: pointer;
`;

const ModelName = styled.p`
  margin: 0 0 8px;

  color: var(--gray-900, #141414);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 500;
  line-height: 18px;
`;

const ModelImageWrap = styled.div`
  width: 173px;
  height: 200px;

  box-sizing: border-box;

  background: #f2f2f2;

  border: ${({ $selected }) =>
    $selected ? "1px solid var(--gray-900, #141414)" : "2px solid transparent"};

  overflow: hidden;
`;

const ModelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SubmitButtonArea = styled.div`
  margin: 24px -20px 0;
  padding: 10px 10px 72px;
  box-sizing: border-box;

  background: #ffffff;

  display: flex;
  justify-content: center;
`;

export default function ModelSelectPage() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);

  const handleComplete = () => {
    const selectedModel = dummyMcmLabModels.find(
      (model) => model.id === selectedId
    );
    navigate("/mcmlab/design-guide", { state: { model: selectedModel } });
  };

  return (
    <Screen>
      <Page>
        <SubHeader title="MCM Lab" onBack={() => navigate(-1)} />

        <PageTitle>커스텀 모델 선택</PageTitle>

        <ModelGrid>
          {dummyMcmLabModels.map((model) => (
            <ModelCard
              key={model.id}
              type="button"
              onClick={() => setSelectedId(model.id)}
            >
              <ModelName>{model.name}</ModelName>
              <ModelImageWrap $selected={selectedId === model.id}>
                <ModelImage src={model.image} alt={model.name} />
              </ModelImageWrap>
            </ModelCard>
          ))}
        </ModelGrid>

        <SubmitButtonArea>
          <IntentButton
            variant="black"
            width="350px"
            height="44px"
            onClick={handleComplete}
            disabled={selectedId === null}
          >
            선택 완료
          </IntentButton>
        </SubmitButtonArea>
      </Page>
    </Screen>
  );
}
