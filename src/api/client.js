import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 시 accessToken이 있으면 자동으로 Authorization 헤더에 첨부
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 공통 에러 처리 (401이면 토큰 만료로 간주하고 로그인 페이지로 리다이렉트)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      // TODO: 리프레시 토큰 로직(/api/auth/refresh) 연동 시 이 부분을 자동 재발급 시도로 교체
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
