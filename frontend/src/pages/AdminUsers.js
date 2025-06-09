import { useEffect, useState } from "react";
import { getUserList } from "../api";
import { Link } from 'react-router-dom';
import { getUserInfo } from "../auth";

export default function UserList() {
    const [users, setUsers] = useState([]); // ✅ 초기값을 반드시 배열로
    const [count, setCount] = useState(0);         // 전체 유저 수
    const [page, setPage] = useState(1);           // 현재 페이지
    const [totalPages, setTotalPages] = useState(1);
    const currentUser = getUserInfo();

    useEffect(() => {
        getUserList(page)
            .then(data => {
                console.log("📦 사용자 목록:", data);
                if (Array.isArray(data.results)) {
                    setUsers(data.results);
                    setCount(data.count);
                    setTotalPages(Math.ceil(data.count / 10)); // page_size = 10 기준
                } else {
                    console.error("⚠️ 잘못된 응답 형식:", data);
                }
            })
            .catch(err => console.error("❌ 사용자 목록 불러오기 실패:", err));
    }, [page]);

    const goToPage = (p) => {
        if (p > 0 && p <= totalPages) {
            setPage(p);
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: 1448, margin: '0 auto', padding: '20px', paddingTop:100 }}>
            <h2 style={{ fontWeight: 'bold', marginTop: 30 }}>관리자</h2>
            <p style={{ color: 'rgba(33, 37, 41, 0.75)', marginTop: 30, marginBottom: 0 }}>{currentUser?.username}</p>
            <p style={{ color: 'rgba(33, 37, 41, 0.75)' }}>{currentUser?.email}</p>

            <div style={{ marginTop: 30, display: 'flex' }}>
                <nav style={{ padding: '10px 0', width: '20%' }}>
                    <Link style={{ whiteSpace: 'nowrap', display: 'block', color: '#000', fontWeight: 'bold', marginBottom:5 }} to="/adminusers">회원관리</Link>
                    <Link style={{ display: 'block', color: 'rgba(33, 37, 41, 0.75)', marginBottom:5 }} to="/adminqna">문의관리</Link>
                    <Link style={{ display: 'block', color: 'rgba(33, 37, 41, 0.75)', marginBottom:5 }} to="/adminproducts">상품관리</Link>
                    <Link style={{ display: 'block', color: 'rgba(33, 37, 41, 0.75)', marginBottom: 5 }} to="/adminnotice">공지사항</Link>
                    <Link style={{ display: 'block', color: 'rgba(33, 37, 41, 0.75)' }} to="/admindataroom">자료실</Link>
                </nav>

                <div style={{ width: '100%', padding: '10px 0', borderLeft: '1px solid #e5e5e5' }}>
                    <p style={{ paddingLeft: 20, paddingBottom: 10, marginBottom: 0, width: '100%', borderBottom: '1px solid #e5e5e5', fontWeight: 'bold', marginBottom:30 }}>회원관리</p>
                    <div style={{ padding: 20 }}>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>아이디</th>
                                        <th>이메일</th>
                                        <th>이름</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td style={{ width: '10%' }}>{user.id}</td>
                                            <td style={{ width: '20%', whiteSpace: 'nowrap', }}>{user.username}</td>
                                            <td style={{ width: '50%' }}>{user.email}</td>
                                            <td style={{ width: '20%' }}>{user.last_name}{user.first_name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* 페이지네이션 */}
                        <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom:50 }}>
                            {/* 이전 버튼 */}
                            <button
                                onClick={() => goToPage(page - 1)}
                                disabled={page === 1}
                                style={{
                                    padding: '6px 12px',
                                    color: 'black',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                                    opacity: page === 1 ? 0.5 : 1,
                                }}
                            >이전</button>

                            {/* 페이지 번호들 */}
                            {[...Array(totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => goToPage(pageNum)}
                                        style={{
                                            padding: '6px 12px',
                                            margin: '0 2px',
                                            border: 0,
                                            borderRadius: '50%',
                                            backgroundColor: pageNum === page ? '#000' : 'white',
                                            color: pageNum === page ? 'white' : '#333',
                                            cursor: 'pointer',
                                            fontWeight: pageNum === page ? 'bold' : 'normal'
                                        }}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            {/* 다음 버튼 */}
                            <button
                                onClick={() => goToPage(page + 1)}
                                disabled={page === totalPages}
                                style={{
                                    padding: '6px 12px',
                                    color: 'black',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: page === totalPages ? 'not-allowed' : 'pointer',
                                    opacity: page === totalPages ? 0.5 : 1,
                                }}
                            >
                                다음
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
