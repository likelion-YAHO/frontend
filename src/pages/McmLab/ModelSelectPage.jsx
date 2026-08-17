import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import SubHeader from "../../common/header/SubHeader";
import IntentButton from "../../components/button/IntentButton";
import LimitToast from "../../components/toast/LimitToast";
import { getBaseProducts } from "../../api/lab";

import model01 from "../../assets/images/mcmlab/models/model_thumb_01.png";
import model02 from "../../assets/images/mcmlab/models/model_thumb_02.png";
import model03 from "../../assets/images/mcmlab/models/model_thumb_03.png";
import model04 from "../../assets/images/mcmlab/models/model_thumb_04.png";
import model05 from "../../assets/images/mcmlab/models/model_thumb_05.png";
import model06 from "../../assets/images/mcmlab/models/model_thumb_06.png";

// 서버 응답(code)에는 이미지가 없어 프론트에서 로컬 이미지로 매칭한다.
// (팀 확인 완료: 베이스 제품 6종은 고정 목록이라 로컬 이미지 관리로 처리하기로 함)
const MODEL_IMAGE_MAP = {
  TRACY_SATCHEL: model01,
  PINA_TAMBOURINE_BAG: model02,
  AREN_VANITY_CASE: model03,
  ELLA_BOSTON_BAG: model04,
  TONI_TOP_ZIP_SHOPPER: model05,
  STARK_SIDE_STUDS_BACKPACK: model06,
};
// 혹시 매핑 안 된 새 code가 서버에서 오는 경우를 대비한 안전장치용 기본 이미지
const FALLBACK_IMAGE = model01;

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

  padding: 44px 20px 0;
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

const StatusText = styled.p`
  margin: 24px 0 0;

  color: var(--gray-700, #727272);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

const ModelGrid = styled.div`
  margin-top: 24px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 4px;
  row-gap: 5px;

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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ModelName = styled.p`
  margin: 0 0 1px;
  padding: 0 8px;

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

  background: #ffffff;

  border: ${({ $selected }) =>
    $selected ? "1px solid var(--gray-900, #141414)" : "1px solid transparent"};

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

  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [selectedCode, setSelectedCode] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchModels = async () => {
      setIsLoading(true);
      setLoadError(false);

      try {
        const data = await getBaseProducts();
        if (!isMounted) return;

        const mapped = (data ?? []).map((item) => ({
          code: item.code,
          name: item.name,
          image: MODEL_IMAGE_MAP[item.code] ?? FALLBACK_IMAGE,
        }));

        setModels(mapped);
      } catch {
        if (!isMounted) return;
        setLoadError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchModels();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleComplete = () => {
    if (isLoading || loadError) return;

    if (selectedCode === null) {
      setToastMessage("커스텀 할 모델을 선택해주세요.");
      return;
    }

    const selectedModel = models.find((model) => model.code === selectedCode);
    if (!selectedModel) {
      setToastMessage("커스텀 할 모델을 선택해주세요.");
      return;
    }

    navigate("/mcmlab/design-guide", { state: { model: selectedModel } });
  };

  return (
    <Screen>
      <Page>
        <SubHeader title="MCM Lab" onBack={() => navigate(-1)} />

        <PageTitle>커스텀 모델 선택</PageTitle>

        {isLoading && <StatusText>모델 목록을 불러오는 중...</StatusText>}
        {!isLoading && loadError && (
          <StatusText>모델 목록을 불러오지 못했습니다. 다시 시도해주세요.</StatusText>
        )}

        {!isLoading && !loadError && (
          <ModelGrid>
            {models.map((model) => (
              <ModelCard
                key={model.code}
                type="button"
                onClick={() => setSelectedCode(model.code)}
              >
                <ModelName>{model.name}</ModelName>
                <ModelImageWrap $selected={selectedCode === model.code}>
                  <ModelImage src={model.image} alt={model.name} />
                </ModelImageWrap>
              </ModelCard>
            ))}
          </ModelGrid>
        )}

        <SubmitButtonArea>
          <IntentButton
            variant="black"
            width="350px"
            height="44px"
            onClick={handleComplete}
            disabled={isLoading || loadError}
          >
            선택 완료
          </IntentButton>
        </SubmitButtonArea>

        <LimitToast
          visible={!!toastMessage}
          message={toastMessage}
          onHide={() => setToastMessage(null)}
        />
      </Page>
    </Screen>
  );
}
