import apiClient from "./client";

// 내 제품 목록 조회
export const getProducts = async () => {
  const response = await apiClient.get("/api/products");
  return response.data.data;
};

// 제품 등록 + AI 상태 분석
// category: "BACKPACK" | "TOTE_SHOULDER" | "SHOULDER_CROSS" | "MINI_BAG" | "CLUTCH_POUCH" | "CLOTHING" | "STRAP_ACCESSORY"
// imageFiles: File 객체 배열 (1~5장)
// multipart/form-data로 전송해야 하므로 FormData 사용
export const createProduct = async (category, imageFiles) => {
  const formData = new FormData();
  formData.append("category", category);
  imageFiles.forEach((file) => {
    formData.append("images", file);
  });

  const response = await apiClient.post("/api/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};

// 제품 상세 조회 (본인 제품만 조회 가능)
export const getProductDetail = async (productId) => {
  const response = await apiClient.get(`/api/products/${productId}`);
  return response.data.data;
};

// 디자인 시안 추천
// payload: { userPrompt }
// 재호출 시 기존 시안은 교체됨
export const getDesignAnalysis = async (productId, payload) => {
  const response = await apiClient.post(
    `/api/products/${productId}/design-analysis`,
    payload,
  );
  return response.data.data;
};

// 커스텀 미리보기
// payload: { designOptionId, pointColor, metalColor, charmOptionId, scarfOptionId }
// 스와치 변경마다 호출 X, 미리보기 버튼에서만 호출 O
export const getDesignPreview = async (productId, payload) => {
  const response = await apiClient.post(
    `/api/products/${productId}/design-preview`,
    payload,
  );
  return response.data.data;
};
