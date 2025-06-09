import React, { useEffect, useState } from "react";
import { getDatarooms, deleteDataroom } from "../api";
import { Link } from "react-router-dom";
import { getUserInfo } from "../auth";

export default function DataroomList() {
    const [items, setItems] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const currentUser = getUserInfo();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        getDatarooms(page).then((data) => {
            const list = Array.isArray(data.results) ? data.results : [];
            setItems(list);
            setFiltered(list);
            setTotalPages(Math.ceil(data.count / 10)); // 페이지 수 계산
        });
    }, [page]);


    const handleSearchClick = () => {
        const keyword = searchTerm.trim().toLowerCase();
        if (keyword === "") {
            setFiltered(items); // 입력이 없으면 전체 목록
        } else {
            const result = items.filter((item) =>
                item.title.toLowerCase().includes(keyword)
            );
            setFiltered(result);
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    return (
        <div style={{ width: '100%', maxWidth: 1448, margin: '0 auto', padding: '20px', paddingTop:100 }} >
            <h2 style={{ fontWeight: 'bold', marginTop: 30 }}>관리자</h2>
            <p style={{ color: 'rgba(33, 37, 41, 0.75)', marginTop: 30, marginBottom: 0 }}>{currentUser?.username}</p>
            <p style={{ color: 'rgba(33, 37, 41, 0.75)' }}>{currentUser?.email}</p>
            <div style={{ marginTop: 30, display: 'flex' }}>
                <nav style={{ padding: '10px 0', width: '20%' }}>
                    <Link style={{ whiteSpace: 'nowrap',display: 'block', color: 'rgba(33, 37, 41, 0.75)', marginBottom: 5 }} to="/adminusers">회원관리</Link>
                    <Link style={{ display: 'block', color: 'rgba(33, 37, 41, 0.75)', marginBottom: 5 }} to="/adminqna">문의관리</Link>
                    <Link style={{ display: 'block', color: 'rgba(33, 37, 41, 0.75)', marginBottom: 5 }} to="/adminproducts">상품관리</Link>
                    <Link style={{ display: 'block', color: 'rgba(33, 37, 41, 0.75)', marginBottom: 5 }} to="/adminnotice">공지사항</Link>
                    <Link style={{ display: 'block', color: '#000', fontWeight: 'bold' }} to="/admindataroom">자료실</Link>
                </nav>
                <div style={{ width: '100%', padding: '10px 0', borderLeft: '1px solid #e5e5e5' }}>
                    <p style={{ paddingLeft: 20, paddingBottom: 10, marginBottom: 0, width: '100%', borderBottom: '1px solid #e5e5e5', fontWeight: 'bold' }}>자료실</p>
                    <Link to="/dataroom/create" style={{ textAlign: 'center', fontSize: 13, margin: 20, maxWidth: 60, display: "block", backgroundColor: '#000', padding: 5, color: '#fff' }}>글 등록</Link>
                    <div style={{ padding: 20 }}>
                        <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>자료명</th>
                                    <th>날짜</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr style={{ verticalAlign: 'middle' }} key={item.id}>
                                        <td style={{ width: '10%' }}>{item.id}</td>
                                        <td style={{ width: '60%' }}><Link style={{ color: '#000', fontWeight: 'bold' }} to={`/dataroom/detail/${item.id}`}>{item.title}</Link></td>
                                        <td style={{ whiteSpace: 'nowrap',width: '20%' }}>{formatDate(item.resdate)}</td>
                                        <td style={{ whiteSpace: 'nowrap',width: '10%' }}>
                                            <Link
                                                to={`/dataroom/edit/${item.id}`}
                                                style={{
                                                    
                                                    padding: '5px 10px',
                                                    backgroundColor: 'transparent',
                                                    color: 'blue',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    marginBottom: 10,
                                                    display: "block"
                                                }}
                                            >수정</Link>
                                            <button
                                                onClick={async () => {
                                                    if (window.confirm("정말 삭제하시겠습니까?")) {
                                                        try {
                                                            await deleteDataroom(item.id);
                                                            alert("삭제 완료");
                                                            setItems(items.filter(i => i.id !== item.id));
                                                            setFiltered(filtered.filter(i => i.id !== item.id));
                                                        } catch (err) {
                                                            alert("삭제 실패");
                                                        }
                                                    }
                                                }}
                                                style={{
                                                    padding: '5px 10px',
                                                    backgroundColor: 'transparent',
                                                    color: 'red',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                삭제
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 20, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px' }}>
                            <button
                                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
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

                            {[...Array(totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setPage(pageNum)}
                                        style={{
                                            padding: '6px 12px',
                                            border: 'none',
                                            borderRadius: '50%',
                                            backgroundColor: page === pageNum ? '#000' : 'white',
                                            color: page === pageNum ? 'white' : '#000',
                                            fontWeight: page === pageNum ? 'bold' : 'normal',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={page === totalPages}
                                style={{
                                    padding: '6px 12px',
                                    background: 'none',
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
