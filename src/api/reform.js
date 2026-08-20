import apiClient from "./client";

// 리폼 선택 완료 (견적 확정/갱신)
// payload: { designOptionId, pointColor, metalColor, charmOptionId, scarfOptionId, previewImageUrl }
// 동일 productId로 재호출하면 기존 Reform을 덮어씀 (reformId 유지)
export const createReform = async (productId, payload) => {
  const response = await apiClient.post(
    `/api/products/${productId}/reforms`,
    payload,
  );
  return response.data.data;
};

// 리폼 상세 조회 (예약 생성 시 reformId 사용)
export const getReformDetail = async (reformId) => {
  const response = await apiClient.get(`/api/reforms/${reformId}`);
  return response.data.data;
};
