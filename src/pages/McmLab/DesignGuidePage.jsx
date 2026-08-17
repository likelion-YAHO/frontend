import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import SubHeader from "../../common/header/SubHeader";
import IntentButton from "../../components/button/IntentButton";
import LimitToast from "../../components/toast/LimitToast";
import LoadingOverlay from "../../components/loadingOverlay/LoadingOverlay";
import materialSwatch from "../../assets/images/mcmlab/mcmlab_material_swatch.png";
import { generateDesign, getCurrentMission } from "../../api/lab";

const MAX_DESIGN_COUNT = 3;

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

const ModelImageWrap = styled.div`
  position: relative;

  margin-top: 24px;

  width: 350px;
  height: 400px;

  background: #fbfbfb;

  overflow: hidden;
`;

const ModelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  filter: ${({ $blurred }) => ($blurred ? "blur(6px)" : "none")};
`;

const ThemeSection = styled.div`
  margin-top: 24px;
`;

const SectionTitle = styled.h2`
  margin: 0;

  color: var(--gray-900, #141414);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
`;

const ThemeRow = styled.div`
  margin-top: 4px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const ThemeDescription = styled.p`
  margin: 0;

  color: var(--gray-700, #727272);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 300;
  line-height: 18px;
`;

const MaterialThumb = styled.img`
  width: 120px;
  height: 36px;
  flex-shrink: 0;

  object-fit: cover;
`;

const GuideSection = styled.div`
  margin-top: 24px;
`;

const GuideDescription = styled.p`
  margin: 4px 0 0;

  color: var(--gray-700, #727272);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 300;
  line-height: 18px;
`;

const GuideTextarea = styled.textarea`
  margin-top: 8px;

  width: 100%;
  height: 120px;

  padding: 10px;
  box-sizing: border-box;

  border: 1px solid var(--gray-500, #d0d0d0);
  border-radius: 4px;
  resize: none;
  outline: none;

  color: var(--gray-700, #727272);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;

  &:focus {
    border-color: var(--gray-500, #d0d0d0);
  }

  &::placeholder {
    color: var(--gray-700, #727272);
  }
`;

const GeneratedSection = styled.div`
  margin-top: 8px;
`;

const DesignSectionTitle = styled.h2`
  margin: 0;

  color: var(--gray-900, #141414);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const DesignGrid = styled.div`
  margin-top: 8px;

  display: flex;
  gap: 4px;
`;

const DesignThumbButton = styled.button`
  width: 114px;
  height: 114px;
  padding: 0;
  box-sizing: border-box;

  border: 1px solid ${({ $selected }) => ($selected ? "#141414" : "#ffffff")};
  background: #ffffff;

  overflow: hidden;
  cursor: pointer;
`;

const DesignThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DesignThumbPlaceholder = styled.div`
  width: 114px;
  height: 114px;

  background: var(--gray-100, #f2f2f2);
`;

const SubmitButtonArea = styled.div`
  margin: 42px -20px 0;
  padding: 10px 10px 72px;
  box-sizing: border-box;

  background: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const RegenerateButton = styled.button`
  width: 350px;
  height: 44px;
  padding: 10px;
  box-sizing: border-box;

  border: 1px solid #e3e3e3;
  background: #ffffff;

  color: var(--gray-900, #141414);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;

  cursor: pointer;

  &:disabled {
    border-color: var(--gray-300, #e0e0e0);
    color: var(--gray-400, #b0b0b0);
    cursor: not-allowed;
  }
`;

export default function DesignGuidePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const model = location.state?.model;

  const [mission, setMission] = useState(null);
  const [isMissionLoading, setIsMissionLoading] = useState(true);

  const [guideText, setGuideText] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [hasGenerated, setHasGenerated] = useState(false);
  const [designs, setDesigns] = useState([]);
  const [tryCount, setTryCount] = useState(0);
  const [selectedDesignIndex, setSelectedDesignIndex] = useState(0);

  useEffect(() => {
    if (!model) {
      queueMicrotask(() => setToastMessage("모델을 다시 선택해주세요."));
      return;
    }

    let isMounted = true;

    const fetchMission = async () => {
      setIsMissionLoading(true);
      try {
        const data = await getCurrentMission();
        if (isMounted) setMission(data);
      } catch {
        if (isMounted) setMission(null);
      } finally {
        if (isMounted) setIsMissionLoading(false);
      }
    };

    fetchMission();

    return () => {
      isMounted = false;
    };
  }, [model]);

  const runGenerate = async () => {
    if (!model?.code) {
      setToastMessage("모델을 다시 선택해주세요.");
      return;
    }

    setIsGenerating(true);

    try {
      const data = await generateDesign({
        baseProduct: model.code,
        prompt: guideText.trim(),
      });

      setDesigns((prev) => {
        const updated = [...prev, data.imageUrl];
        setSelectedDesignIndex(updated.length - 1);
        return updated;
      });
      setTryCount(data.tryCount ?? 0);
      setHasGenerated(true);
    } catch {
      setToastMessage("디자인 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = () => {
    const trimmedText = guideText.trim();

    if (trimmedText.length === 0) {
      setToastMessage("텍스트를 작성해주세요.");
      return;
    }

    if (trimmedText.length < 10) {
      setToastMessage("텍스트 입력은 최소 10자 이상입니다.");
      return;
    }

    runGenerate();
  };

  const handleRegenerate = () => {
    if (isGenerating || tryCount >= MAX_DESIGN_COUNT) return;
    runGenerate();
  };

  const handleComplete = () => {
    const selectedDesign = designs[selectedDesignIndex];

    navigate("/mcmlab/custom-product", {
      state: {
        model,
        mission,
        design: selectedDesign,
        aiPrompt: guideText.trim(),
      },
    });
  };

  const emptySlotCount = MAX_DESIGN_COUNT - designs.length;

  return (
    <Screen>
      <Page>
        <SubHeader title="MCM Lab" onBack={() => navigate(-1)} />

        <ModelImageWrap>
          {model?.image && (
            <ModelImage
              src={model.image}
              alt={model.name}
              $blurred={isGenerating}
            />
          )}
          <LoadingOverlay visible={isGenerating} />
        </ModelImageWrap>

        <ThemeSection>
          <SectionTitle>테마</SectionTitle>
          <ThemeRow>
            <ThemeDescription>
              {isMissionLoading ? (
                "테마 정보를 불러오는 중..."
              ) : mission ? (
                <>
                  주제 : {mission.title}
                  <br />
                  업사이클링 소재 : {mission.materialDetails}
                </>
              ) : (
                "테마 정보를 불러오지 못했습니다."
              )}
            </ThemeDescription>
            <MaterialThumb src={materialSwatch} alt="소재 미리보기" />
          </ThemeRow>
        </ThemeSection>

        <GuideSection>
          <SectionTitle>AI 디자인 가이드</SectionTitle>
          <GuideDescription>
            *AI에게 원하는 디자인을 알려주세요.
            <br />
            예) 미니멀한 디자인으로 바꾸고 싶어요. 포인트 컬러는 그린 계열로
            추천해주세요.
          </GuideDescription>
          <GuideTextarea
            placeholder="원하는 모습을 자유롭게 적어주세요."
            value={guideText}
            onChange={(e) => setGuideText(e.target.value)}
          />
        </GuideSection>

        {hasGenerated && (
          <GeneratedSection>
            <DesignSectionTitle>생성한 디자인</DesignSectionTitle>
            <DesignGrid>
              {designs.map((src, index) => (
                <DesignThumbButton
                  key={src}
                  type="button"
                  $selected={selectedDesignIndex === index}
                  onClick={() => setSelectedDesignIndex(index)}
                >
                  <DesignThumbImage src={src} alt={`생성한 디자인 ${index + 1}`} />
                </DesignThumbButton>
              ))}
              {Array.from({ length: emptySlotCount }).map((_, index) => (
                <DesignThumbPlaceholder key={`empty-${index}`} />
              ))}
            </DesignGrid>
          </GeneratedSection>
        )}

        <SubmitButtonArea>
          {!hasGenerated ? (
            <IntentButton
              variant="black"
              width="350px"
              height="44px"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? "AI 분석 중 …" : "AI 생성하기"}
            </IntentButton>
          ) : (
            <>
              <RegenerateButton
                type="button"
                onClick={handleRegenerate}
                disabled={isGenerating || tryCount >= MAX_DESIGN_COUNT}
              >
                {isGenerating
                  ? "AI 분석 중 …"
                  : `다시 생성하기 ${tryCount}/${MAX_DESIGN_COUNT}`}
              </RegenerateButton>
              <IntentButton
                variant="black"
                width="350px"
                height="44px"
                onClick={handleComplete}
                disabled={isGenerating}
              >
                선택 완료
              </IntentButton>
            </>
          )}
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
