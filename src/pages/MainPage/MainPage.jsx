import HeroBanner from "./HeroBanner";
import UpcyclingSection from "./UpcyclingSection";
import NewDesignsSection from "./NewDesignsSection";
import BrandStorySection from "./BrandStorySection";
import BrandIntro from "./BrandIntro";

function MainPage() {
  return (
    <div>
      <HeroBanner />
      <UpcyclingSection />
      <NewDesignsSection />
      <BrandStorySection />
      <BrandIntro />
    </div>
  );
}

export default MainPage;
