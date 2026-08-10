import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Dropdown from "../../components/dropdown/Dropdown";
import IntentButton from "../../components/button/IntentButton";

import cameraIcon from "../../assets/images/icons/camera_icon.svg";
import backArrowIcon from "../../assets/images/icons/backArrow_icon.svg";
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

const Screen = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: #f2f2f2;
`;

const Page = styled.div`
  width: 100%;
  max-width: 390px;
  min-height: 100vh;
  padding: 20px 20px 36px;
  box-sizing: border-box;
  background: #ffffff;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  margin-bottom: 23px;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const BackIcon = styled.img`
  width: 24px;
  height: 23px;
  object-fit: contain;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  color: #141414;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
`;

const PhotoUploadBox = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #f6f6f6;
  border-radius: 2px;
  outline: 1px solid #e3e3e3;
  outline-offset: -1px;
  cursor: pointer;
`;

const CameraIcon = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

const PhotoCount = styled.span`
  color: #141414;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
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

const AnalyzeButtonArea = styled.div`
  margin-top: ${({ $isCategoryOpen }) => ($isCategoryOpen ? "24px" : "120px")};
  transition: margin-top 0.35s ease;
  display: flex;
  justify-content: center;
`;

export default function RegisterProductPage() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleAnalyze = () => {
    // TODO: AI 분석 연동 (추후 이슈)
  };

  return (
    <Screen>
      <Page>
        <Header>
          <BackButton
            type="button"
            onClick={() => navigate(-1)}
            aria-label="뒤로가기"
          >
            <BackIcon src={backArrowIcon} alt="" />
          </BackButton>
          <HeaderTitle>제품 등록하기</HeaderTitle>
        </Header>

        <PhotoUploadBox>
          <CameraIcon src={cameraIcon} alt="사진 업로드" />
          <PhotoCount>0/5</PhotoCount>
        </PhotoUploadBox>

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
          <IntentButton
            variant="black"
            width="350px"
            height="44px"
            onClick={handleAnalyze}
          >
            AI 분석
          </IntentButton>
        </AnalyzeButtonArea>
      </Page>
    </Screen>
  );
}