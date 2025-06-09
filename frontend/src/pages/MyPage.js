import { useEffect, useState } from "react";
import { getProfile, getQuestions } from "../api";
import { Link } from "react-router-dom";

export default function MyPage() {
  const [me, setMe] = useState(null);
  const [myQuestions, setMyQuestions] = useState([]);

  useEffect(() => {
    getProfile().then(setMe);
    getQuestions().then(res => {
      setMyQuestions(res.results || []);
    });
  }, []);

  if (!me) return <p className="text-center mt-5">로딩 중...</p>;

  return (
    <div className="container" style={{ maxWidth: 960, paddingTop: 100, paddingBottom: 100 }}>
      <h2 style={{
        fontWeight: 700,
        fontSize: 48,
        textAlign: "center",
        marginBottom: 60,
      }}>
        마이페이지
      </h2>

      {/* 사용자 정보 */}
      <div className="card border-0 mb-5" style={{ }}>
        <div className="card-body" style={{padding:0}}>
          <h5 className="mb-4" style={{ fontSize: 20, fontWeight:'bold' }}>회원 정보</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 16 }}>
            <div><strong>아이디</strong> : {me.username}</div>
            <div><strong>이메일</strong> : {me.email}</div>
            <div><strong>이름</strong> : {me.last_name}{me.first_name}</div>
          </div>
        </div>
      </div>

      {/* 문의 목록 */}
      <div>
        <h5 className="fw-bold mb-4" style={{ fontSize: 20 }}>내 문의 목록</h5>

        {myQuestions.length === 0 ? (
          <div className="alert border text-center py-4" style={{ borderRadius: 0 }}>
            아직 작성한 문의가 없습니다.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {myQuestions.map(q => (
              <div
                key={q.id}
                className="border p-3"
                style={{
                  backgroundColor: '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <Link
                  to={`/questions/${q.id}`}
                  style={{
                    textDecoration: 'none',
                    color: '#212529',
                    fontWeight: 600,
                    flexGrow: 1
                  }}
                >
                 {q.title}
                </Link>
                <span className={`badge px-3 py-2 ${q.is_answered ? 'bg-success' : 'bg-secondary'}`}>
                  {q.is_answered ? '답변 완료' : '미답변'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
