import { useEffect, useState } from 'react';
import { getQuestions, deleteQuestion } from '../api';
import { Link } from 'react-router-dom';
import { getUserInfo } from "../auth";

function AdminQna() {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const currentUser = getUserInfo();

    useEffect(() => {
        getQuestions(1).then(data => {
            if (data && Array.isArray(data.results)) {
                setQuestions(data.results);
            } else {
                setQuestions([]); // results가 없을 경우 fallback
            }
        });
    }, []);

    useEffect(() => {
        fetchPage(page);
    }, [page]);

    const fetchPage = async (pageNumber) => {
        try {
            const res = await getQuestions(pageNumber);
            setQuestions(Array.isArray(res.results) ? res.results : []);
            setCount(Math.ceil(res.count / 10));
        } catch (err) {
            console.error("❌ 질문 목록 불러오기 실패:", err);
            setQuestions([]); // 오류 발생 시도 비워줌
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= count) {
            setPage(newPage);
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');  // 월은 0부터 시작
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    const handleDelete = async (id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            const token = localStorage.getItem("token");
            await deleteQuestion(id, token);
            alert("삭제되었습니다.");
            // 삭제 후 목록 갱신
            fetchPage(page);
        } catch (error) {
            console.error("❌ 삭제 실패:", error);
            alert("삭제 실패: " + error.message);
        }
    };


    return (
        <div style={{ width: '100%', maxWidth: 1448, margin: '0 auto', padding: '20px', paddingTop: 100 }}>
            <h2 style={{ fontWeight: 'bold', marginTop: 30 }}>관리자</h2>
            <p style={{ color: 'rgba(33, 37, 41, 0.75)', marginTop: 30, marginBottom: 0 }}>{currentUser?.username}</p>
            <p style={{ color: 'rgba(33, 37, 41, 0.75)' }}>{currentUser?.email}</p>
            <div style={{ marginTop: 30, display: 'flex' }}>
                <nav style={{ padding: '10px 0', width: '20%' }}>
                    <Link style={{ whiteSpace: 'nowrap',display: 'block', color: 'rgba(33, 37, 41, 0.75)', marginBottom: 5 }} to="/adminusers">회원관리</Link>
                    <Link style={{ display: 'block', color: '#000', fontWeight: 'bold', marginBottom: 5 }} to="/adminqna">문의관리</Link>
                    <Link style={{ display: 'block', color: 'rgba(33, 37, 41, 0.75)', marginBottom: 5 }} to="/adminproducts">상품관리</Link>
                    <Link style={{ display: 'block', color: 'rgba(33, 37, 41, 0.75)', marginBottom: 5 }} to="/adminnotice">공지사항</Link>
                    <Link style={{ display: 'block', color: 'rgba(33, 37, 41, 0.75)' }} to="/admindataroom">자료실</Link>
                </nav>

                <div style={{ width: '100%', padding: '10px 0', borderLeft: '1px solid #e5e5e5' }}>
                    <p style={{ paddingLeft: 20, paddingBottom: 10, width: '100%', borderBottom: '1px solid #e5e5e5', fontWeight: 'bold', marginBottom: 30 }}>1:1문의관리</p>

                    <div style={{ padding: 20 }}>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th style={{ whiteSpace: 'nowrap', }}>아이디</th>
                                        <th>제목</th>
                                        <th>날짜</th>
                                        <th>상태</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {questions.map(q => (
                                        <tr key={q.id}>
                                            <td style={{ width: '10%' }}>{q.id}</td>
                                            <td style={{ whiteSpace: 'nowrap', width: '10%' }}>{q.author_username}</td>
                                            <td style={{ whiteSpace: 'nowrap', width: '30%' }}><a style={{ color: '#000', fontWeight: 'bold' }} href={`/questions/${q.id}`}>{q.title}</a></td>
                                            <td style={{ whiteSpace: 'nowrap', width: '20%' }}>{formatDate(q.created_at)}</td>
                                            <td style={{ whiteSpace: 'nowrap', width: '20%' }}>
                                                {q.is_answered ? '✅ 답변 완료' : '⏳ 미답변'}
                                            </td>
                                            <td style={{ width: '10%' }}>
                                                <button
                                                    style={{ whiteSpace: 'nowrap', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                                                    onClick={() => handleDelete(q.id)}
                                                >
                                                    삭제
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* 페이지네이션 */}
                        <div style={{ textAlign: 'center', marginTop: 20, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: 50 }}>
                            {/* 이전 버튼 */}
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                style={{
                                    padding: '6px 12px',
                                    background: 'none',
                                    color: 'black',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                                    opacity: page === 1 ? 0.5 : 1,
                                }}
                            >
                                이전
                            </button>

                            {/* 페이지 번호 버튼들 */}
                            {Number.isInteger(count) && count > 0 && (
                                [...Array(count)].map((_, i) => {
                                    const pageNum = i + 1;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            style={{
                                                padding: '6px 12px',
                                                border: '0',
                                                borderRadius: '50%',
                                                backgroundColor: page === pageNum ? '#000' : 'white',
                                                color: page === pageNum ? 'white' : '#333',
                                                fontWeight: page === pageNum ? 'bold' : 'normal',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })
                            )}


                            {/* 다음 버튼 */}
                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === count}
                                style={{
                                    padding: '6px 12px',
                                    color: 'black',
                                    background: 'none',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: page === count ? 'not-allowed' : 'pointer',
                                    opacity: page === count ? 0.5 : 1,
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

export default AdminQna;