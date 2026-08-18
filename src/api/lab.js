import apiClient from "./client";

// 베이스 제품 목록 조회
export const getBaseProducts = async () => {
  const response = await apiClient.get("/api/lab/base-products");
  return response.data.data;
};

// 갤러리(디자인) 목록 조회
// sort: "latest"(기본값) 또는 "popular"
export const getDesigns = async (sort = "latest") => {
  const response = await apiClient.get("/api/lab/designs", {
    params: { sort },
  });
  return response.data.data;
};

// 디자인 출품
// payload: { missionId, baseProduct, designName, concept, aiPrompt,
//            usedMaterials, imageUrl, pointColor, metalColor, charmOptionId, scarfOptionId }
export const createDesign = async (payload) => {
  const response = await apiClient.post("/api/lab/designs", payload);
  return response.data.data;
};

// 디자인 상세 조회
export const getDesignDetail = async (designId) => {
  const response = await apiClient.get(`/api/lab/designs/${designId}`);
  return response.data.data;
};

// 디자인 좋아요 토글
export const toggleDesignLike = async (designId) => {
  const response = await apiClient.post(`/api/lab/designs/${designId}/likes`);
  return response.data.data;
};

// AI 디자인 시안 생성
// payload: { baseProduct, prompt }
// 로그인 사용자 + 이달의 미션 + 베이스 제품당 최대 3회 제한
export const generateDesign = async (payload) => {
  const response = await apiClient.post("/api/lab/designs/generate", payload);
  return response.data.data;
};

// 랩 에디션 조회
export const getEditions = async () => {
  const response = await apiClient.get("/api/lab/editions");
  return response.data.data;
};

// 이달의 미션 조회
export const getCurrentMission = async () => {
  const response = await apiClient.get("/api/lab/missions/current");
  return response.data.data;
};

// 커스텀 미리보기 (generate 결과 이미지 + 포인트/메탈/추가상품 조합 합성)
// payload: { sourceImageUrl, pointColor, metalColor, charmOptionId, scarfOptionId }
export const previewDesign = async (payload) => {
  const response = await apiClient.post("/api/lab/designs/preview", payload);
  return response.data.data;
};

// 본인이 출품한 가상 디자인 삭제 (선정/판매 확정된 에디션은 삭제 불가)
export const deleteDesign = async (designId) => {
  const response = await apiClient.delete(`/api/lab/designs/${designId}`);
  return response.data.data;
};

// 랩 에디션 매장별 재고 조회
export const getEditionStocks = async (editionId) => {
  const response = await apiClient.get(`/api/lab/editions/${editionId}/stocks`);
  return response.data.data;
};
