import { useParams } from "react-router-dom";

import LabEditionProductHero from "./LabEditionProductHero";
import LabEditionProductInfo from "./LabEditionProductInfo";
import LabEditionProductDetails from "./LabEditionProductDetails";
import LabEditionRecommend from "./LabEditionRecommend";
import BrandIntro from "../MainPage/BrandIntro";

import dummyLabEditionProducts from "../../data/dummyLabEditionProducts";

export default function LabEditionDetailPage() {
  const { productId } = useParams();

  const product = dummyLabEditionProducts.find(
    (item) => item.id === Number(productId),
  );

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  const recommendedProducts = dummyLabEditionProducts.filter(
    (item) => item.id !== product.id,
  );

  return (
    <>
      <LabEditionProductHero product={product} />

      <LabEditionProductInfo product={product} />

      <LabEditionProductDetails />

      <LabEditionRecommend products={recommendedProducts} />

      <BrandIntro />
    </>
  );
}
