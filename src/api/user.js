import apiClient from "./client";

// 내 프로필 조회
export const getMyProfile = async () => {
  const response = await apiClient.get("/api/users/me");
  return response.data.data;
};

// 알림 수신 여부 변경
// alarmEnabled: true(수신) / false(끄기)
export const updateAlarm = async (alarmEnabled) => {
  const response = await apiClient.patch("/api/users/me/alarm", {
    alarmEnabled,
  });
  return response.data.data;
};

// 참고: 프로필 수정(PATCH /api/users/me), 프로필 이미지 변경(POST /api/users/me/profile-image)은
// 팀 논의에 따라 프론트 구현 범위에서 제외되어 여기 포함하지 않음.
// 필요해지면 아래 스키마 참고해서 추가할 것
// - PATCH /api/users/me body: { nickname, email, phone }
// - POST /api/users/me/profile-image: multipart/form-data, key "image"
