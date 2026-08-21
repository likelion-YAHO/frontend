import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LabEditionProductHero from "./LabEditionProductHero";
import LabEditionProductInfo from "./LabEditionProductInfo";
import StoreSearchModal from "../../components/storeSearchModal/StoreSearchModal";
import LabEditionProductDetails from "./LabEditionProductDetails";
import LabEditionRecommend from "./LabEditionRecommend";
import BrandIntro from "../MainPage/BrandIntro";
import { getEditions } from "../../api/lab";

// 서버가 imageUrl을 상대경로("/xxx.png")로 내려주는 경우 base URL과 조합한다.
const resolveImageUrl = (path) => {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${import.meta.env.VITE_API_BASE_URL}${path}`;
};

const StatusText = styled.p`
  margin: 24px 20px 0;
  color: #727272;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

// LabEditionCard/LabEditionProductInfo가 기대하는 필드 형태로 매핑한다.
const mapEdition = (edition) => ({
  id: edition.id,

  // 대표 이미지
  image: resolveImageUrl(edition.imageUrl),

  // 상세 페이지 4방향 이미지
  images: (edition.imageUrls ?? []).map(resolveImageUrl),

  name: edition.designName,
  edition: edition.concept,
  price: edition.price,
  colorHex: edition.colorHex,
  colorName: edition.color,
  size: edition.size,
  stock: edition.stock,
});

export default function LabEditionDetailPage() {
  const { productId } = useParams();

  const [editions, setEditions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchEditions = async () => {
      setIsLoading(true);
      setLoadError(false);

      try {
        const data = await getEditions();
        if (isMounted) setEditions(data ?? []);
      } catch {
        if (isMounted) setLoadError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchEditions();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <StatusText>상품 정보를 불러오는 중...</StatusText>;
  }

  if (loadError) {
    return (
      <StatusText>
        상품 정보를 불러오지 못했습니다. 다시 시도해주세요.
      </StatusText>
    );
  }

  const rawProduct = editions.find((item) => item.id === Number(productId));

  if (!rawProduct) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  const product = mapEdition(rawProduct);

  const recommendedProducts = editions
    .filter((item) => item.id !== rawProduct.id)
    .map(mapEdition);

  return (
    <>
      <LabEditionProductHero product={product} />
      <LabEditionProductInfo
        product={product}
        onOpenStockModal={() => {
          console.log("매장 재고 모달 열기");
          setIsStoreModalOpen(true);
        }}
      />
      <StoreSearchModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
        mode="edition"
        editionId={product.id}
        onSelectComplete={(store) => {
          console.log("선택 매장:", store);
          setIsStoreModalOpen(false);
        }}
      />
      <LabEditionProductDetails />
      <LabEditionRecommend products={recommendedProducts} />
      <BrandIntro />
    </>
  );
}
