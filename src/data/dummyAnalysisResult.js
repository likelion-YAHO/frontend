// 추후 실제 AI 분석 API 응답으로 교체될 더미 데이터
// 구조는 백엔드 응답 형태를 미리 가정하여 구성함

import deerCharm from "../assets/images/custom/deer-charm.png";
import bag1 from "../assets/images/custom/bag-1.png";
import pouch from "../assets/images/custom/pouch.png";
import bag2 from "../assets/images/custom/bag-2.png";

import charm1 from "../assets/images/custom/charm-1.png";
import charm2 from "../assets/images/custom/charm-2.png";
import charm3 from "../assets/images/custom/charm-3.png";
import charm4 from "../assets/images/custom/charm-4.png";

import scarf1 from "../assets/images/custom/scarf-1.png";
import scarf2 from "../assets/images/custom/scarf-2.png";
import scarf3 from "../assets/images/custom/scarf-3.png";
import scarf4 from "../assets/images/custom/scarf-4.png";

import stitchBrown from "../assets/images/custom/stitch/brown.png";
import stitchRed from "../assets/images/custom/stitch/red.png";
import stitchOrange from "../assets/images/custom/stitch/orange.png";
import stitchPink from "../assets/images/custom/stitch/pink.png";
import stitchLavender from "../assets/images/custom/stitch/lavender.png";
import stitchPurple from "../assets/images/custom/stitch/purple.png";
import stitchMagenta from "../assets/images/custom/stitch/magenta.png";
import stitchBlack from "../assets/images/custom/stitch/black.png";
import stitchGray from "../assets/images/custom/stitch/gray.png";
import stitchWhite from "../assets/images/custom/stitch/white.png";
import stitchBlue from "../assets/images/custom/stitch/blue.png";
import stitchTeal from "../assets/images/custom/stitch/teal.png";
import stitchMint from "../assets/images/custom/stitch/mint.png";
import stitchGreen from "../assets/images/custom/stitch/green.png";

import metalGold from "../assets/images/custom/stitch/gold.png";
import metalSilver from "../assets/images/custom/stitch/silver.png";

const dummyAnalysisResult = {
  recommendedTags: [
    "#리버서블 모노그램 프린트 쁘띠 스카프",
    "#MCM 메탈 스퀘어 참",
  ],

  upcyclableProducts: [
    { id: "deer-charm", name: "디어 참", thumbnail: deerCharm },
    { id: "bag-1", name: "크로스백", thumbnail: bag1 },
    { id: "pouch", name: "플랩백", thumbnail: pouch },
    { id: "bag-2", name: "버킷백", thumbnail: bag2 },
  ],

  pointStitchColors: [
    { id: "brown", thumbnail: stitchBrown },
    { id: "red", thumbnail: stitchRed },
    { id: "orange", thumbnail: stitchOrange },
    { id: "pink", thumbnail: stitchPink },
    { id: "lavender", thumbnail: stitchLavender },
    { id: "purple", thumbnail: stitchPurple },
    { id: "magenta", thumbnail: stitchMagenta },
    { id: "black", thumbnail: stitchBlack },
    { id: "gray", thumbnail: stitchGray },
    { id: "white", thumbnail: stitchWhite },
    { id: "blue", thumbnail: stitchBlue },
    { id: "teal", thumbnail: stitchTeal },
    { id: "mint", thumbnail: stitchMint },
    { id: "green", thumbnail: stitchGreen },
  ],

  metalColors: [
    { id: "gold", thumbnail: metalGold },
    { id: "silver", thumbnail: metalSilver },
  ],

  addOns: {
    leatherCharms: [
      { id: "charm-1", name: "레더 참 1", thumbnail: charm1 },
      { id: "charm-2", name: "레더 참 2", thumbnail: charm2 },
      { id: "charm-3", name: "래빗 참", thumbnail: charm3 },
      { id: "charm-4", name: "베어 참", thumbnail: charm4 },
    ],
    scarves: [
      { id: "scarf-1", name: "스카프 1", thumbnail: scarf1 },
      { id: "scarf-2", name: "스카프 2", thumbnail: scarf2 },
      { id: "scarf-3", name: "스카프 3", thumbnail: scarf3 },
      { id: "scarf-4", name: "스카프 4", thumbnail: scarf4 },
    ],
  },
};

export default dummyAnalysisResult;
