//src/api.js
import { fetchAuth } from "./auth";
import axios from 'axios';

const API_URL = "http://localhost:8000/api/notices/";
const BASE_URL = "http://localhost:8000/api/";
const DATAROOM_URL = "http://localhost:8000/api/dataroom/";

//공지사항 목록 API : GET - http://localhost:8000/api/notices/
// page를 기본값 1로 받음
export async function getNotices(page = 1) {
    const res = await fetch(`${API_URL}?page=${page}`);
    return await res.json();
}


//공지사항 특정 글 상세보기 : GET - http://localhost:8000/api/notices/1/
export async function getNotice(id) {
    const res = await fetch(`${API_URL}${id}/`);
    return await res.json();
}

//공지사항 글 등록 : POST - http://localhost:8000/api/notices/
export async function createNotice(data) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return await res.json();
}

//공지사항 글 수정 : PUT - http://localhost:8000/api/notices/1/
export async function updateNotice(id, data) {
  const res = await fetch(`${API_URL}${id}/`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

//공지사항 글 삭제 : DELETE - http://localhost:8000/api/notices/1/
export async function deleteNotice(id) {
  await fetch(`${API_URL}${id}/`, { method: "DELETE" });
}

// 공지사항 이전/다음 글 : GET - http://localhost:8000/api/notices/<id>/adjacent/
export async function getAdjacentNotice(id) {
  const res = await fetch(`http://localhost:8000/api/notices/${id}/adjacent/`);
  if (!res.ok) {
    throw new Error("이전/다음 글을 불러오는 데 실패했습니다.");
  }
  return await res.json();
}



//BASE_URL = "http://localhost:8000/api/";
//회원가입 : POST - http://localhost:8000/api/users/register/
export const register = data => fetch(`${BASE_URL}users/register/`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
}).then(r => r.json());

//로그인 : POST - http://localhost:8000/api/users/login/
export const login = data => fetch(`${BASE_URL}users/login/`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
}).then(r => r.json());

//아이디 중복 체크 : GET - http://localhost:8000/api/users/check-username/?username=test1
export const checkUsername = username => fetch(`${BASE_URL}users/check-username/?username=${username}`
).then(r => r.json());

//마이페이지 : GET - http://localhost:8000/api/users/profile/
export const getProfile = () => fetchAuth(`${BASE_URL}users/profile/`
).then(r => r.json());

//관리자의 회원 목록 보기 : GET - http://localhost:8000/api/users/list/
export const getUserList = (page = 1) =>
  fetchAuth(`${BASE_URL}users/list/?page=${page}`)
    .then(res => res.json());





const API = axios.create({ baseURL: 'http://localhost:8000/api/qna' });

export async function getQuestions(page = 1) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}qna/questions/?page=${page}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await res.json();
}

export const getQuestion = (id) => {
  const token = localStorage.getItem('token');
  return API.get(`questions/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const createQuestion = (data, token) =>
  API.post('questions/', data, { headers: { Authorization: `Bearer ${token}` } });

export const createAnswer = (data, token) =>
  API.post('answers/', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });

  export async function deleteQuestion(id, token) {
  const res = await fetch(`http://localhost:8000/api/qna/questions/${id}/`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "삭제 실패");
  }
}


const PRODUCT_URL = "http://localhost:8000/api/products/";

export async function getProducts({ category, page = 1 }) {
  const query = new URLSearchParams({
    page: page.toString(),
    category: category || "", // 빈값 방지
  });

  const res = await fetch(`http://localhost:8000/api/products/?${query}`);
  if (!res.ok) throw new Error("상품 목록 요청 실패");
  const data = await res.json();
  return data;
}

export async function getCategoryCounts() {
  const res = await fetch("http://localhost:8000/api/products/category-counts/");
  if (!res.ok) throw new Error("카테고리 개수 요청 실패");
  return await res.json();
}

export const getProduct = (id) => {
  const token = localStorage.getItem('token');
  return axios.get(`http://localhost:8000/api/products/${id}/`, {
    headers: {
      Authorization: undefined
    }
  });
};


export async function createProduct(formData, token) {
  const res = await fetch(PRODUCT_URL, {
    method: 'POST',
    headers: {
      // 'Content-Type': 생략해야 함. 브라우저가 자동으로 multipart 경계를 설정함
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  });

  if (!res.ok) {
    const errorText = await res.text();  // JSON 아니면 text로 확인
    throw new Error(errorText);
  }

  return await res.json();  // 정상 응답이면 JSON으로 파싱
}

export async function deleteProduct(id, token) {
  const res = await fetch(`http://localhost:8000/api/products/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "상품 삭제 실패");
  }
}

export async function updateProduct(id, data, token) {
  const res = await fetch(`http://localhost:8000/api/products/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('상품 수정 실패');
  }

  return await res.json();
}






//자료실 목록 : GET - http://localhost:8000/api/dataroom/
export async function getDatarooms(page = 1) {
  const res = await fetch(`${DATAROOM_URL}?page=${page}`);
  const data = await res.json();
  return data; // 전체 객체 반환 (count, next, previous, results 등 포함)
}

//자료실 글 상세보기 : GET - http://localhost:8000/api/dataroom/1/
export async function getDataroom(id) {
  const res = await fetch(`${DATAROOM_URL}${id}/`);
  return await res.json();
}

//자료실 글 등록 : POST - http://localhost:8000/api/dataroom/
export async function createDataroom(FormData) {
  const res = await fetch(DATAROOM_URL, {
    method: "POST",
    body: FormData,
  });
  return await res.json();
}

//자료실 글 수정 : PUT - http://localhost:8000/api/dataroom/1/
export async function updateDataroom(id, FormData) {
  const res = await fetch(`${DATAROOM_URL}${id}/`, {
    method: "PUT",
    body: FormData,
  });
  return await res.json();
}

//자료실 글 삭제 : DELETE - http://localhost:8000/api/dataroom/1/
export async function deleteDataroom(id, FormData) {
  return await fetch(`${DATAROOM_URL}${id}/`, {
    method: "DELETE",
  });
}