import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import Dropdown from "../../components/dropdown/Dropdown";
import IntentButton from "../../components/button/IntentButton";
import SubHeader from "../../common/header/SubHeader";
import PhotoUploader from "../../components/photoUploader/PhotoUploader";
import LimitToast from "../../components/toast/LimitToast";
import LoadingOverlay from "../../components/loadingOverlay/LoadingOverlay";

import { createProduct, getDesignAnalysis } from "../../api/product";

import downArrowThickIcon from "../../assets/images/icons/downArrowThick_icon.svg";

const categoryOptions = [
  "백팩",
  "토트백 & 숄더백",
  "숄더백 & 크로스백",
  "미니백",
  "클러치 & 파우치",
  "의류",
  "스트랩 & 액세서리",
];

const CATEGORY_LABEL_TO_CODE = {
  "백팩": "BACKPACK",
  "토트백 & 숄더백": "TOTE_SHOULDER",
  "숄더백 & 크로스백": "SHOULDER_CROSS",
  "미니백": "MINI_BAG",
  "클러치 & 파우치": "CLUTCH_POUCH",
  "의류": "CLOTHING",
  "스트랩 & 액세서리": "STRAP_ACCESSORY",
};

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
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
`;

const GuideField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const GuideLabel = styled.p`
  margin: 0;
  color: ${({ $active }) => ($active ? "#141414" : "#d0d0d0")};
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
  transition: color 0.25s ease;
`;

const GuideHint = styled.p`
  margin: 0;
  color: #727272;
  font-size: 10px;
  font-weight: 300;
  line-height: 18px;
`;

const GuideTextarea = styled.textarea`
  width: 100%;
  min-height: 90px;
  margin-top: 4px;
  padding: 4px 10px;
  box-sizing: border-box;
  color: #141414;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  font-family: "Pretendard Variable", Pretendard, sans-serif;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  resize: none;
  outline: none;

  &::placeholder {
    color: #727272;
  }

  &:disabled {
    background: #f6f6f6;
    color: #d0d0d0;
  }
`;

const AnalyzeButtonArea = styled.div`
  margin-top: ${({ $isCategoryOpen }) => ($isCategoryOpen ? "24px" : "60px")};
  transition: margin-top 0.35s ease;
  display: flex;
  justify-content: center;
`;

const PulsingIntentButton = styled(IntentButton)`
  animation: ${({ $analyzing }) => ($analyzing ? pulse : "none")} 1.1s ease-in-out
    infinite;
  opacity: ${({ $looksDisabled }) => ($looksDisabled ? 0.5 : 1)};
  transition: opacity 0.25s ease;
`;

export default function RegisterProductPage() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [guideText, setGuideText] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // design-analysis가 실패해도(레이트리밋 등) 재시도할 때 createProduct를 또 부르지 않도록
  // 이미 등록에 성공한 제품을 기억해둔다. 사진/카테고리가 바뀌면 무효화된다.
  const [registeredProduct, setRegisteredProduct] = useState(null);

  const hasPhotos = photos.length > 0;
  const hasCategory = !!category;
  const guideActive = hasPhotos && hasCategory;

  const handlePhotosChange = (updatedPhotos) => {
    setPhotos(updatedPhotos);
    setRegisteredProduct(null);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setRegisteredProduct(null);
  };

  const handleAnalyze = async () => {
    if (photos.length === 0 || !category || isAnalyzing) return;

    const trimmedText = guideText.trim();

    if (trimmedText.length === 0) {
      setToastMessage("텍스트를 작성해주세요.");
      return;
    }

    if (trimmedText.length < 10) {
      setToastMessage("텍스트 입력은 최소 10자 이상입니다.");
      return;
    }

    setIsAnalyzing(true);

    try {
      let product = registeredProduct;

      if (!product) {
        const categoryCode = CATEGORY_LABEL_TO_CODE[category];
        const imageFiles = photos.map((photo) => photo.file).filter(Boolean);

        if (imageFiles.length === 0) {
          setToastMessage("사진을 다시 첨부해주세요.");
          setIsAnalyzing(false);
          return;
        }

        product = await createProduct(categoryCode, imageFiles);
        setRegisteredProduct(product);
      }

      const analysis = await getDesignAnalysis(product.productId, {
        userPrompt: trimmedText,
      });

      navigate("/upcycle/custom", {
        state: { product, analysis},
      });
    } catch (error) {
      console.error("제품 등록/AI 분석 실패:", error);
      setToastMessage("AI 분석에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const buttonKey = isAnalyzing
    ? "loading"
    : hasPhotos && hasCategory
      ? "complete"
      : "analyze";

  const buttonLabel = isAnalyzing
    ? "AI 분석 중 …"
    : hasPhotos && hasCategory
      ? "선택 완료"
      : "AI 분석";

  return (
    <Screen>
      <Page>
        <SubHeader title="제품 등록하기" onBack={() => navigate(-1)} />

        <PhotoArea>
          <PhotoUploader
            onPhotosChange={handlePhotosChange}
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
              onChange={handleCategoryChange}
              placeholder="카테고리를 선택해주세요."
              width="100%"
              fontSize="14px"
              arrowIcon={downArrowThickIcon}
              onOpenChange={setIsCategoryOpen}
            />
          </CategoryField>

          <AnimatePresence>
            {hasPhotos && (
              <motion.div
                key="guide-field"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <GuideField>
                  <GuideLabel $active={guideActive}>
                    AI 디자인 가이드
                  </GuideLabel>

                  <AnimatePresence>
                    {guideActive && (
                      <motion.div
                        key="guide-input"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <GuideHint>
                          *AI에게 원하는 디자인을 알려주세요.
                          <br />
                          예) 미니멀한 디자인으로 바꾸고 싶어요. 포인트
                          컬러는 그린 계열로 추천해주세요.
                        </GuideHint>

                        <GuideTextarea
                          placeholder="기존 제품을 바탕으로 AI가 업사이클링 커스텀을 제안합니다."
                          value={guideText}
                          onChange={(e) => setGuideText(e.target.value)}
                          disabled={isAnalyzing}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GuideField>
              </motion.div>
            )}
          </AnimatePresence>
        </FieldGroup>

        <AnalyzeButtonArea $isCategoryOpen={isCategoryOpen}>
          <PulsingIntentButton
            variant="black"
            width="350px"
            height="44px"
            onClick={handleAnalyze}
            disabled={!hasPhotos || !hasCategory || isAnalyzing}
            $analyzing={isAnalyzing}
            $looksDisabled={!hasPhotos || !hasCategory || isAnalyzing}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={buttonKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {buttonLabel}
              </motion.span>
            </AnimatePresence>
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