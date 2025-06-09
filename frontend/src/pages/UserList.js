import { useEffect, useState } from "react";
import { getUserList } from "../api";

export default function UserList() {
  const [users, setUsers] = useState([]); // ✅ 초기값을 반드시 배열로

  useEffect(() => {
    getUserList()
      .then(data => {
        console.log("📦 사용자 목록:", data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (Array.isArray(data.results)) {
          // PageNumberPagination 사용한 경우
          setUsers(data.results);
        } else {
          console.error("⚠️ 잘못된 응답 형식:", data);
        }
      })
      .catch(err => console.error("❌ 사용자 목록 불러오기 실패:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>회원 목록</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>아이디</th>
            <th>이메일</th>
            <th>이름</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.first_name} {user.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
