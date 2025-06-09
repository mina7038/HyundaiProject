// src/auth.js
export const setTokens = ({ access, refresh }) => {
  localStorage.setItem("token", access);
  localStorage.setItem("refresh", refresh);
};

export const clearTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");          // ★ user 정보도 같이 삭제
};

export const getAccess = () => localStorage.getItem("token");

export const getUserInfo = () => {
  const data = localStorage.getItem("user");

  // null 또는 "undefined" 문자열이면 파싱하지 않음
  if (!data || data === "undefined") return null;

  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("유저 정보 파싱 오류:", e);
    return null;
  }
};

export async function fetchAuth(url, options = {}) {
  const access = getAccess();
  const headers = { ...(options.headers || {}), Authorization: `Bearer ${access}` };
  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    alert("세션이 만료되었습니다. 다시 로그인 해주세요");
    clearTokens();
    window.location = "/login";
  }
  return res;
}
