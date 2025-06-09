// src/pages/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { getUserInfo } from "../auth";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const currentUser = getUserInfo();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);




    useEffect(() => {
        getProducts(page)
            .then(data => {
                setProducts(data.results); // 상품 리스트 설정
                setTotalPages(Math.ceil(data.count / 10)); // 전체 페이지 수 계산
            })
            .catch(err => {
                console.error("❌ 상품 목록 불러오기 실패:", err);
            });
    }, [page]); // ✅ page가 바뀔 때마다 실행


    const handleDelete = async (id) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                await deleteProduct(id, localStorage.getItem("token"));
                alert("삭제 완료");
                setProducts(products.filter(p => p.id !== id)); // 화면에서 제거
            } catch (err) {
                console.error("삭제 실패:", err);
                alert("삭제에 실패했습니다.");
            }
        }
    };



    return (
        <>
            <div style={{ width: '100%', maxWidth: 1448, margin: '0 auto', padding: '20px', paddingTop: 100 }}>
                <h2 style={{ fontWeight: 'bold', marginTop: 30 }}>관리자</h2>
                <p style={{ color: 'rgba(33, 37, 41, 0.75)', marginTop: 30, marginBottom: 0 }}>{currentUser?.username}</p>
                <p style={{ color: 'rgba(33, 37, 41, 0.75)' }}>{currentUser?.email}</p>

                <div style={{ marginTop: 30, display: 'flex' }}>
                    <nav style={{ padding: '10px 0', width: '20%' }}>
                        <Link style={{ whiteSpace: 'nowrap',display: 'block', color: 'rgba(33, 37, 41, 0.75)', marginBottom: 5 }} to="/adminusers">회원관리</Link>
                        <Link style={{ display: 'block', color: 'rgba(33, 37, 41, 0.75)', marginBottom: 5 }} to="/adminqna">문의관리</Link>
                        <Link style={{ display: 'block', color: '#000', fontWeight: 'bold', marginBottom: 5 }} to="/adminproducts">상품관리</Link>
                        <Link style={{ display: 'block', color: 'rgba(33, 37, 41, 0.75)', marginBottom: 5 }} to="/adminnotice">공지사항</Link>
                        <Link style={{ display: 'block', color: 'rgba(33, 37, 41, 0.75)' }} to="/admindataroom">자료실</Link>
                    </nav>

                    <div style={{ width: '100%', padding: '10px 0', borderLeft: '1px solid #e5e5e5' }}>
                        <p style={{ paddingLeft: 20, paddingBottom: 10, marginBottom: 0, width: '100%', borderBottom: '1px solid #e5e5e5', fontWeight: 'bold' }}>상품관리</p>
                        <Link to="/products/add" style={{ textAlign: 'center', fontSize: 13, margin: 20, maxWidth: 65, display: "block", backgroundColor: '#000', padding: 5, color: '#fff' }}>상품등록</Link>
                        <div style={{ padding: 20 }}>
                            <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th style={{whiteSpace: 'nowrap',}}>이미지</th>
                                        <th>상품명</th>
                                        <th>가격</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td style={{ width: '10%', verticalAlign: 'middle' }}>{product.id}</td>
                                            <td style={{ width: '20%', padding: '20px 0', paddingRight: 20, verticalAlign:'middle' }}><img
                                                src={`${product.image}`}
                                                alt={product.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            /></td>
                                            <td style={{ width: '40%', verticalAlign: 'middle' }}>{product.name}</td>
                                            <td style={{ whiteSpace: 'nowrap',width: '20%', verticalAlign: 'middle' }}>{Number(product.price).toLocaleString()} 만원 ~</td>
                                            <td style={{width: '10%', verticalAlign: 'middle' }}>
                                                <button
                                                    style={{
                                                        padding: '5px 10px',
                                                        backgroundColor: 'transparent',
                                                        color: 'blue',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        marginBottom: 10,
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                    onClick={() => navigate(`/product/edit/${product.id}`)} // ✏️ 수정 이동
                                                >
                                                    수정
                                                </button>
                                                <button
                                                    style={{
                                                        padding: '5px 10px',
                                                        backgroundColor: 'transparent',
                                                        color: 'red',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => handleDelete(product.id)} // ❌ 삭제
                                                >
                                                    삭제
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                            {/* ✅ 페이지네이션 버튼 영역 */}
                            <div style={{ textAlign: 'center', marginTop: 20, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: 50 }}>
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
        </>
    );
}
