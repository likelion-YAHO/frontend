import apiClient from "./client";

// 상담원에게 문의 등록
// payload: { content }
export const createInquiry = async (orderNumber, payload) => {
  const response = await apiClient.post(
    `/api/reservations/${orderNumber}/inquiries`,
    payload,
  );
  return response.data.data;
};
