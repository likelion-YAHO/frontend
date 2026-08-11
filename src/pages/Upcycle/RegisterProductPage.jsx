import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import Dropdown from "../../components/dropdown/Dropdown";
import IntentButton from "../../components/button/IntentButton";
import SubHeader from "../../common/header/SubHeader";
import PhotoUploader from "../../components/photoUploader/PhotoUploader";
import LimitToast from "../../components/toast/LimitToast";
import LoadingOverlay from "../../components/loadingOverlay/LoadingOverlay";

import dummyAnalysisResult from "../../data/dummyAnalysisResult";

import downArrowThickIcon from "../../assets/images/icons/downArrowThick_icon.svg";

const ANALYZE_DUMMY_DELAY = 2000;

const categoryOptions = [
  "백팩",
  "토트백 & 숄더백",
  "숄더백 & 크로스백",
  "미니백",
  "클러치 & 파우치",
  "의류",
  "스트랩 & 액세서리",
];

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
  padding: 67px 20px 36px;
  box-sizing: border-box;
  background: #ffffff;
`;

const FieldGroup = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CategoryField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FieldLabel = styled.p`
  margin: 0;
  color: #141414;
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
`;

const PhotoArea = styled.div`
  position: relative;
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.55;
  }
`;

const AnalyzeButtonArea = styled.div`
  margin-top: ${({ $isCategoryOpen }) => ($isCategoryOpen ? "24px" : "120px")};
  transition: margin-top 0.35s ease;
  display: flex;
  justify-content: center;
`;

const PulsingIntentButton = styled(IntentButton)`
  animation: ${({ $analyzing }) => ($analyzing ? pulse : "none")} 1.1s ease-in-out
    infinite;
  opacity: ${({ $looksDisabled }) => ($looksDisabled ? 0.5 : 1)};
`;

export default function RegisterProductPage() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!category) {
      setToastMessage("카테고리를 선택해주세요");
      return;
    }

    setIsAnalyzing(true);

    // TODO: 백엔드 AI 분석 API 연동 시 아래 setTimeout을 실제 API 호출로 교체
    setTimeout(() => {
      navigate("/upcycle/custom", {
        state: { analysisResult: dummyAnalysisResult, photos },
      });
    }, ANALYZE_DUMMY_DELAY);
  };

  return (
    <Screen>
      <Page>
        <SubHeader title="제품 등록하기" onBack={() => navigate(-1)} />

        <PhotoArea>
          <PhotoUploader
            onPhotosChange={setPhotos}
            onLimitExceeded={() =>
              setToastMessage("최대 5장까지 등록할 수 있어요")
            }
          />
          <LoadingOverlay visible={isAnalyzing} />
        </PhotoArea>

        <FieldGroup>
          <CategoryField>
            <FieldLabel>제품 카테고리</FieldLabel>
            <Dropdown
              options={categoryOptions}
              value={category}
              onChange={setCategory}
              placeholder="카테고리를 선택해주세요."
              width="100%"
              fontSize="14px"
              arrowIcon={downArrowThickIcon}
              onOpenChange={setIsCategoryOpen}
            />
          </CategoryField>
        </FieldGroup>

        <AnalyzeButtonArea $isCategoryOpen={isCategoryOpen}>
          <PulsingIntentButton
            variant="black"
            width="350px"
            height="44px"
            onClick={handleAnalyze}
            disabled={photos.length === 0 || isAnalyzing}
            $analyzing={isAnalyzing}
            $looksDisabled={photos.length === 0 || isAnalyzing || !category}
          >
            {isAnalyzing ? "AI 분석 중 …" : "AI 분석"}
          </PulsingIntentButton>
        </AnalyzeButtonArea>

        <LimitToast
          visible={!!toastMessage}
          message={toastMessage}
          onHide={() => setToastMessage(null)}
        />
      </Page>
    </Screen>
  );
}
