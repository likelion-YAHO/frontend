import apiClient from "./client";

// 추가상품 목록
// category: "KEYRING" | "SCARF" (미입력 시 전체)
export const getAddOnProducts = async (category) => {
  const response = await apiClient.get("/api/add-on-products", {
    params: category ? { category } : undefined,
  });
  return response.data.data;
};

// 메탈 컬러 목록 (골드/실버 등)
export const getMetalColors = async () => {
  const response = await apiClient.get("/api/colors/metal");
  return response.data.data;
};

// 포인트 컬러 목록
export const getPointColors = async () => {
  const response = await apiClient.get("/api/colors/point");
  return response.data.data;
};
