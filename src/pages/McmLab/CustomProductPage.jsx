import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import SubHeader from "../../common/header/SubHeader";
import IntentButton from "../../components/button/IntentButton";
import ImageSelector from "../../components/imageSelector/ImageSelector";
import ColorSwatchPicker from "../../components/colorSwatchPicker/ColorSwatchPicker";
import McmLabCompleteModal from "../../components/mcmLabCompleteModal/McmLabCompleteModal";

import {
  getPointColors,
  getMetalColors,
  getAddOnProducts,
} from "../../api/catalog";
import { createDesign } from "../../api/lab";

// 서버가 imageUrl을 상대경로("/xxx.png")로 내려주는 경우 base URL과 조합한다.
const resolveImageUrl = (path) => {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${import.meta.env.VITE_API_BASE_URL}${path}`;
};

// ColorSwatchPicker는 thumbnail에 "이미지 URL"을 기대하는데,
// 컬러 API는 hex 값만 내려주므로 단색 SVG를 즉석 생성해 이미지처럼 사용한다.
const hexToSwatchImage = (hex) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="${hex}"/></svg>`,
  )}`;

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

const ContentArea = styled.div`
  flex: 1;
`;

const DesignImage = styled.img`
  width: 350px;
  height: 400px;

  object-fit: cover;
  border-radius: 2px;
`;

const Section = styled.section`
  margin-top: 60px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: #141414;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const SectionDescription = styled.p`
  margin: 0;
  color: #727272;
  font-size: 10px;
  font-weight: 300;
  line-height: 18px;
`;

const SelectorArea = styled.div`
  margin-top: 12px;
`;

const AddOnGroup = styled.div`
  margin-top: 24px;
`;

const AddOnLabel = styled.p`
  margin: 0 0 12px;
  color: #141414;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`;

const ColorSection = styled(Section)`
  margin-top: 24px;
`;

const AddOnSection = styled(Section)`
  margin-top: 60px;
`;

const StatusText = styled.p`
  margin: 24px 0 0;
  color: #727272;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

const SubmitButtonArea = styled.div`
  margin: 42px -20px 0;
  padding: 10px 10px 72px;
  box-sizing: border-box;

  background: #ffffff;

  display: flex;
  justify-content: center;
`;

export default function CustomProductPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const model = location.state?.model;
  const mission = location.state?.mission;
  const design = location.state?.design;
  const aiPrompt = location.state?.aiPrompt ?? "";

  const [pointColors, setPointColors] = useState([]);
  const [metalColors, setMetalColors] = useState([]);
  const [leatherCharms, setLeatherCharms] = useState([]);
  const [scarves, setScarves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [selectedStitchColor, setSelectedStitchColor] = useState(null);
  const [selectedMetalColor, setSelectedMetalColor] = useState(null);
  const [selectedCharm, setSelectedCharm] = useState(null);
  const [selectedScarf, setSelectedScarf] = useState(null);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCatalog = async () => {
      setIsLoading(true);
      setLoadError(false);

      try {
        const [points, metals, charms, scarfItems] = await Promise.all([
          getPointColors(),
          getMetalColors(),
          getAddOnProducts("KEYRING"),
          getAddOnProducts("SCARF"),
        ]);

        if (!isMounted) return;

        setPointColors(
          (points?.colors ?? []).map((color) => ({
            id: color.code,
            thumbnail: hexToSwatchImage(color.hex),
          })),
        );
        setMetalColors(
          (metals?.colors ?? []).map((color) => ({
            id: color.code,
            thumbnail: hexToSwatchImage(color.hex),
          })),
        );
        setLeatherCharms(
          (charms?.items ?? []).map((item) => ({
            id: item.id,
            name: item.name,
            thumbnail: resolveImageUrl(item.imageUrl),
          })),
        );
        setScarves(
          (scarfItems?.items ?? []).map((item) => ({
            id: item.id,
            name: item.name,
            thumbnail: resolveImageUrl(item.imageUrl),
          })),
        );
      } catch {
        if (isMounted) setLoadError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCatalog();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleComplete = async () => {
    if (!mission?.id || !model?.code || !design) {
      setSubmitError("출품에 필요한 정보가 없습니다. 이전 단계부터 다시 진행해주세요.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // designName/concept/usedMaterials는 화면 입력 UI가 없어 값이 있을 때만 전송한다.
      // (팀 확인: 백엔드에서 해당 필드들을 필수에서 선택으로 변경 예정)
      const payload = {
        missionId: mission.id,
        baseProduct: model.code,
        aiPrompt,
        imageUrl: design,
        ...(selectedStitchColor && { pointColor: selectedStitchColor }),
        ...(selectedMetalColor && { metalColor: selectedMetalColor }),
        ...(selectedCharm && { charmOptionId: selectedCharm }),
        ...(selectedScarf && { scarfOptionId: selectedScarf }),
      };

      await createDesign(payload);
      setIsCompleteModalOpen(true);
    } catch {
      setSubmitError("출품에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToLabEdition = () => {
    navigate("/mcmlab", { state: { initialTab: "edition" } });
  };

  const goToMcmLabHome = () => {
    navigate("/mcmlab");
  };

  return (
    <Screen>
      <Page>
        <SubHeader title="제품 커스텀" onBack={() => navigate(-1)} />

        <ContentArea>
          {(design || model?.image) && (
            <DesignImage
              src={design ?? model?.image}
              alt={model?.name ?? "커스텀 디자인"}
            />
          )}

          {isLoading && <StatusText>옵션을 불러오는 중...</StatusText>}
          {!isLoading && loadError && (
            <StatusText>옵션을 불러오지 못했습니다. 다시 시도해주세요.</StatusText>
          )}

          {!isLoading && !loadError && (
            <>
              <ColorSection>
                <SectionTitle>컬러</SectionTitle>
                <SectionDescription>
                  *제품의 포인트 컬러를 변경할 수 있습니다.
                </SectionDescription>

                <SelectorArea>
                  <AddOnLabel>포인트 스와치</AddOnLabel>
                  <ColorSwatchPicker
                    colors={pointColors}
                    value={selectedStitchColor}
                    onChange={setSelectedStitchColor}
                  />
                </SelectorArea>

                <AddOnGroup>
                  <AddOnLabel>메탈 컬러</AddOnLabel>
                  <ColorSwatchPicker
                    colors={metalColors}
                    value={selectedMetalColor}
                    onChange={setSelectedMetalColor}
                  />
                </AddOnGroup>
              </ColorSection>

              <AddOnSection>
                <SectionTitle>추가 상품</SectionTitle>
                <SectionDescription>
                  추가 상품을 선택해 커스터마이징이 가능합니다.
                </SectionDescription>

                <SelectorArea>
                  <AddOnLabel>레더 참 &amp; 키링</AddOnLabel>
                  <ImageSelector
                    items={leatherCharms}
                    value={selectedCharm}
                    onChange={setSelectedCharm}
                    itemHeight="100px"
                  />
                </SelectorArea>

                <AddOnGroup>
                  <AddOnLabel>스카프</AddOnLabel>
                  <ImageSelector
                    items={scarves}
                    value={selectedScarf}
                    onChange={setSelectedScarf}
                    itemHeight="100px"
                  />
                </AddOnGroup>
              </AddOnSection>
            </>
          )}

          {submitError && <StatusText>{submitError}</StatusText>}
        </ContentArea>

        <SubmitButtonArea>
          <IntentButton
            variant="black"
            width="350px"
            height="44px"
            onClick={handleComplete}
            disabled={isLoading || loadError || isSubmitting}
          >
            {isSubmitting ? "출품 중..." : "선택 완료"}
          </IntentButton>
        </SubmitButtonArea>

        <McmLabCompleteModal
          isOpen={isCompleteModalOpen}
          onConfirm={goToLabEdition}
          onAutoRedirect={goToMcmLabHome}
        />
      </Page>
    </Screen>
  );
}
