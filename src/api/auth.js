import apiClient from "./client";

// 로그인
// email, password를 받아 서버에 로그인 요청을 보내고,
// 성공 시 응답에서 받은 토큰을 localStorage에 저장한다.
export const login = async (email, password) => {
  const response = await apiClient.post("/api/auth/login", {
    email,
    password,
  });

  const { data } = response.data;

  if (data?.accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
  }
  if (data?.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

// 로그아웃
export const logout = async () => {
  try {
    await apiClient.post("/api/auth/logout");
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }
};
