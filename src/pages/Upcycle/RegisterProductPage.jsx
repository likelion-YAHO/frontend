import { useState, useRef } from "react";
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

const MAX_PHOTOS = 5;

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

const HiddenFileInput = styled.input`
  display: none;
`;

const PhotoUploadBox = styled.div`
  width: 350px;
  height: 400px;
  margin: 0 auto;

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
  transition: background 0.2s ease;

  &:hover {
    background: #d0d0d0;
  }
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

const PhotoGrid = styled.div`
  width: 350px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  background: #f6f6f6;
  border-radius: 2px;
  outline: 1px solid #e3e3e3;
  outline-offset: -1px;
  overflow: hidden;
`;

const PhotoThumbWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 117 / 200;
`;

const PhotoThumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;

  width: 24px;
  height: 24px;

  border: none;
  border-radius: 50%;
  background: #f6f6f6;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  outline: 0.5px solid #ffffff;
  outline-offset: -0.5px;

  color: #141414;
  font-size: 12px;
  line-height: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const AddMoreCell = styled.button`
  width: 100%;
  aspect-ratio: 117 / 200;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  border: none;
  background: #f6f6f6;

  color: #141414;
  font-size: 10px;
  font-weight: 600;

  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #d0d0d0;
  }
`;

const AddMoreIcon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
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

const Toast = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 12px 20px;
  border-radius: 8px;

  background: rgba(20, 20, 20, 0.85);
  color: #ffffff;

  font-size: 14px;
  font-weight: 600;

  white-space: nowrap;
  z-index: 200;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.25s ease;
  pointer-events: none;
`;

export default function RegisterProductPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const toastTimerRef = useRef(null);

  const [category, setCategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [showLimitToast, setShowLimitToast] = useState(false);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingSlots = MAX_PHOTOS - photos.length;
    const filesToAdd = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      setShowLimitToast(true);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => {
        setShowLimitToast(false);
      }, 2000);
    }

    const newPhotos = filesToAdd.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      url: URL.createObjectURL(file),
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
    e.target.value = "";
  };

  const handleRemovePhoto = (id) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

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

        <HiddenFileInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />

        {photos.length === 0 ? (
          <PhotoUploadBox onClick={handleBoxClick}>
            <CameraIcon src={cameraIcon} alt="사진 업로드" />
            <PhotoCount>0/5</PhotoCount>
          </PhotoUploadBox>
        ) : (
          <PhotoGrid>
            <AddMoreCell type="button" onClick={handleBoxClick}>
              <AddMoreIcon src={cameraIcon} alt="" />
              {photos.length}/{MAX_PHOTOS}
            </AddMoreCell>

            {photos.map((photo) => (
              <PhotoThumbWrapper key={photo.id}>
                <PhotoThumb src={photo.url} alt="업로드된 제품 사진" />
                <RemoveButton
                  type="button"
                  onClick={() => handleRemovePhoto(photo.id)}
                  aria-label="사진 삭제"
                >
                  ✕
                </RemoveButton>
              </PhotoThumbWrapper>
            ))}
          </PhotoGrid>
        )}

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

        <Toast $visible={showLimitToast}>
          최대 5장까지 등록할 수 있어요
        </Toast>
      </Page>
    </Screen>
  );
}