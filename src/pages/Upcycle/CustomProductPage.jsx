import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import SubHeader from "../../common/header/SubHeader";
import IntentButton from "../../components/button/IntentButton";
import ImageSelector from "../../components/imageSelector/ImageSelector";
import ColorSwatchPicker from "../../components/colorSwatchPicker/ColorSwatchPicker";

import { getPointColors, getMetalColors, getAddOnProducts } from "../../api/catalog";
import { getDesignPreview } from "../../api/product";
import { createReform } from "../../api/reform";

const resolveImageUrl = (path) => {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${import.meta.env.VITE_API_BASE_URL}${path}`;
};

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

const DesignImageWrap = styled.div`
  position: relative;
`;

const DesignImage = styled.img`
  width: 350px;
  height: 400px;

  object-fit: cover;
  border-radius: 2px;

  filter: ${({ $dimmed }) => ($dimmed ? "brightness(0.7)" : "none")};
`;

const PreviewLoadingText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  margin: 0;
  padding: 8px 16px;

  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;

  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
`;

const TagArea = styled.div`
  margin-top: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TagLabel = styled.p`
  margin: 0;
  color: #141414;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  padding: 6px 10px;
  border-radius: 20px;
  background: #141414;
  color: #fafafa;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
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
  margin: 0 0 4px;
  color: #141414;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`;

const UpcyclableSection = styled(Section)`
  margin-top: 50px;
`;

const ColorSection = styled(Section)`
  margin-top: 60px;
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

const PreviewButtonArea = styled.div`
  margin: 24px -20px 0;
  padding: 0 20px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
`;

const SubmitButtonArea = styled.div`
  margin: 10px -20px 0;
  padding: 10px 10px 72px;
  box-sizing: border-box;

  background: #ffffff;

  display: flex;
  justify-content: center;
`;

export default function CustomProductPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;
  const analysis = location.state?.analysis;

  const productId = product?.productId;
  const designOptions = analysis?.designOptions ?? product?.designOptions ?? [];

  const recommendedCharmName =
    analysis?.recommendedCharmName ?? product?.recommendedCharmName ?? null;
  const recommendedScarfName =
    analysis?.recommendedScarfName ?? product?.recommendedScarfName ?? null;

  const [selectedDesignOptionId, setSelectedDesignOptionId] = useState(
    designOptions[0]?.id ?? null,
  );

  const [displayImage, setDisplayImage] = useState(
    resolveImageUrl(designOptions[0]?.imageUrl),
  );

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

  const [isPreviewing, setIsPreviewing] = useState(false);
  const [previewError, setPreviewError] = useState(null);
  const [appliedPreviewImageUrl, setAppliedPreviewImageUrl] = useState(null);

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

  const clearAppliedPreview = () => {
    setAppliedPreviewImageUrl(null);
    setPreviewError(null);
  };

  const handleSelectDesignOption = (optionId) => {
    const option = designOptions.find((item) => item.id === optionId);
    if (!option) return;

    setSelectedDesignOptionId(option.id);
    setDisplayImage(resolveImageUrl(option.imageUrl));
    clearAppliedPreview();
  };

  const handleSelectStitchColor = (value) => {
    setSelectedStitchColor(value);
    clearAppliedPreview();
  };

  const handleSelectMetalColor = (value) => {
    setSelectedMetalColor(value);
    clearAppliedPreview();
  };

  const handleSelectCharm = (value) => {
    setSelectedCharm(value);
    clearAppliedPreview();
  };

  const handleSelectScarf = (value) => {
    setSelectedScarf(value);
    clearAppliedPreview();
  };

  const designOptionItems = designOptions.map((option) => ({
    id: option.id,
    name: option.name,
    thumbnail: resolveImageUrl(option.imageUrl),
  }));

  const hasAnyOptionSelected =
    selectedStitchColor || selectedMetalColor || selectedCharm || selectedScarf;

  const handlePreview = async () => {
    if (!productId || !selectedDesignOptionId || !hasAnyOptionSelected) {
      setPreviewError("미리보기를 적용할 옵션을 하나 이상 선택해주세요.");
      return;
    }

    setIsPreviewing(true);
    setPreviewError(null);

    try {
      const payload = {
        designOptionId: selectedDesignOptionId,
        ...(selectedStitchColor && { pointColor: selectedStitchColor }),
        ...(selectedMetalColor && { metalColor: selectedMetalColor }),
        ...(selectedCharm && { charmOptionId: selectedCharm }),
        ...(selectedScarf && { scarfOptionId: selectedScarf }),
      };

      const result = await getDesignPreview(productId, payload);
      setDisplayImage(resolveImageUrl(result.previewImageUrl));
      setAppliedPreviewImageUrl(result.previewImageUrl);
    } catch {
      setPreviewError("미리보기 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsPreviewing(false);
    }
  };

  const handleComplete = async () => {
    if (!productId || !selectedDesignOptionId) {
      setSubmitError("제품 정보가 없습니다. 이전 단계부터 다시 진행해주세요.");
      return;
    }

    const selectedOption = designOptions.find(
      (option) => option.id === selectedDesignOptionId,
    );
    const previewImageUrl = appliedPreviewImageUrl ?? selectedOption?.imageUrl;

    if (!previewImageUrl) {
      setSubmitError("제품 정보가 없습니다. 이전 단계부터 다시 진행해주세요.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        designOptionId: selectedDesignOptionId,
        previewImageUrl,
        ...(selectedStitchColor && { pointColor: selectedStitchColor }),
        ...(selectedMetalColor && { metalColor: selectedMetalColor }),
        ...(selectedCharm && { charmOptionId: selectedCharm }),
        ...(selectedScarf && { scarfOptionId: selectedScarf }),
      };

      const reform = await createReform(productId, payload);

      const summary = {
        items: (reform.priceBreakdown ?? []).map((row, index) => ({
          id: `${reform.reformId}-${index}`,
          name: row.name,
          quantity: row.quantity,
          price: row.unitPrice,
        })),
        total: reform.totalPrice,
      };

      navigate("/upcycle/reservation", {
        state: { summary, reformId: reform.reformId },
      });
    } catch {
      setSubmitError("선택 완료 처리에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen>
      <Page>
        <SubHeader title="제품 커스텀" onBack={() => navigate(-1)} />

        <ContentArea>
          {displayImage && (
            <DesignImageWrap>
              <DesignImage
                src={displayImage}
                alt="커스텀 디자인"
                $dimmed={isPreviewing}
              />
              {isPreviewing && (
                <PreviewLoadingText>미리보기 생성 중...</PreviewLoadingText>
              )}
            </DesignImageWrap>
          )}

          {(recommendedCharmName || recommendedScarfName) && (
            <TagArea>
              <TagLabel>AI 커스텀 추천</TagLabel>
              <TagList>
                {recommendedCharmName && <Tag>#{recommendedCharmName}</Tag>}
                {recommendedScarfName && <Tag>#{recommendedScarfName}</Tag>}
              </TagList>
            </TagArea>
          )}

          {designOptionItems.length > 0 && (
            <UpcyclableSection>
              <SectionTitle>업사이클 가능한 제품</SectionTitle>
              <SelectorArea>
                <ImageSelector
                  items={designOptionItems}
                  value={selectedDesignOptionId}
                  onChange={handleSelectDesignOption}
                />
              </SelectorArea>
            </UpcyclableSection>
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
                    onChange={handleSelectStitchColor}
                  />
                </SelectorArea>

                <AddOnGroup>
                  <AddOnLabel>메탈 컬러</AddOnLabel>
                  <ColorSwatchPicker
                    colors={metalColors}
                    value={selectedMetalColor}
                    onChange={handleSelectMetalColor}
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
                    onChange={handleSelectCharm}
                    itemHeight="100px"
                  />
                </SelectorArea>

                <AddOnGroup>
                  <AddOnLabel>스카프</AddOnLabel>
                  <ImageSelector
                    items={scarves}
                    value={selectedScarf}
                    onChange={handleSelectScarf}
                    itemHeight="100px"
                  />
                </AddOnGroup>
              </AddOnSection>
            </>
          )}

          {previewError && <StatusText>{previewError}</StatusText>}
          {submitError && <StatusText>{submitError}</StatusText>}
        </ContentArea>

        <PreviewButtonArea>
          <IntentButton
            variant="white"
            width="350px"
            height="44px"
            onClick={handlePreview}
            disabled={isLoading || loadError || isPreviewing || !hasAnyOptionSelected}
          >
            {isPreviewing ? "미리보기 생성 중..." : "미리보기 적용"}
          </IntentButton>
        </PreviewButtonArea>

        <SubmitButtonArea>
          <IntentButton
            variant="black"
            width="350px"
            height="44px"
            onClick={handleComplete}
            disabled={isLoading || loadError || isSubmitting || isPreviewing}
          >
            {isSubmitting ? "처리 중..." : "선택 완료"}
          </IntentButton>
        </SubmitButtonArea>
      </Page>
    </Screen>
  );
}