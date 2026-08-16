import apiClient from "./client";

// 예약 매장 목록 조회
// latitude, longitude 필수 (사용자 현재 위치 기준 가까운 순 정렬)
export const getStores = async (latitude, longitude) => {
  const response = await apiClient.get("/api/stores", {
    params: { latitude, longitude },
  });
  return response.data.data;
};
