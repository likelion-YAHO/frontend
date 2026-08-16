import apiClient from "./client";

// 예약 접수
// payload: { reformId, storeId, visitDate } (visitDate 형식: "2026-08-18T14:00:00")
export const createReservation = async (payload) => {
  const response = await apiClient.post("/api/reservations", payload);
  return response.data.data;
};

// [사용자용] 예약 상세 조회
export const getReservationDetail = async (reservationId) => {
  const response = await apiClient.get(`/api/reservations/${reservationId}`);
  return response.data.data;
};

// 예약 변경
// payload: { reformId, storeId, visitDate }
export const updateReservation = async (reservationId, payload) => {
  const response = await apiClient.put(
    `/api/reservations/${reservationId}`,
    payload,
  );
  return response.data.data;
};

// 예약 취소
export const cancelReservation = async (reservationId) => {
  const response = await apiClient.delete(`/api/reservations/${reservationId}`);
  return response.data.data;
};

// 예약 복원
export const restoreReservation = async (reservationId) => {
  const response = await apiClient.post(
    `/api/reservations/${reservationId}/restore`,
  );
  return response.data.data;
};

// 내 예약 목록 조회
export const getMyReservations = async () => {
  const response = await apiClient.get("/api/reservations/my");
  return response.data.data;
};

// [매장 직원용] 바코드 스캔 조회
// orderNumber 형식 예: "UPC-7K4D-92LM"
export const getReservationByOrderNumber = async (orderNumber) => {
  const response = await apiClient.get(
    `/api/reservations/scan/${orderNumber}`,
  );
  return response.data.data;
};
