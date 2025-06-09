import { getNotice } from "../api"; // 기존 함수
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function NoticeDetail() {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [adjacent, setAdjacent] = useState({ prev: null, next: null });

  useEffect(() => {
    async function fetchData() {
      const res = await getNotice(id);
      setNotice(res);

      // 🔥 이전/다음 글 가져오기
      const adjRes = await fetch(`http://localhost:8000/api/notices/${id}/adjacent/`);
      const adjData = await adjRes.json();
      setAdjacent(adjData);
    }
    fetchData();
  }, [id]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  if (!notice) return <div>로딩 중...</div>;

  return (
    <div style={{ maxWidth: 1448, margin: '0 auto', paddingTop:100 }}>
      <div style={{ display: "flex", marginBottom: 100 }}>
        <div style={{ width: '15%', borderRight: '1px solid #dadbdc' }}>
          <Link style={{ color: '#000', display:'flex' }} to="/notice" className="notice_list-go"><img src="/img/icon_arrow_right_type.svg"></img><span className="see_list" style={{ marginLeft: 10, fontWeight: 'bold' }}>목록보기</span></Link>
        </div>
        <div style={{ width: '85%', paddingLeft: '8%' }}>
          <div style={{ fontWeight: 'bold', width: 70, padding: '7px 0', fontSize: 13, textAlign: 'center', color: '#fff', borderRadius: 20, backgroundColor: 'black' }}>공지사항</div>
          <h2 style={{ marginTop: 15, fontSize: 24, fontWeight: 'bold' }}>{notice.title}</h2>
          <p style={{ color: '#697278', fontSize: 14, marginTop: 20, marginBottom: 70 }}>
            {formatDate(notice.resdate)} | 조회수: {notice.hits}
          </p>
          <p style={{ color: '#37434b', fontSize: 14, whiteSpace: 'pre-wrap', paddingBottom:30 }}>{notice.content}</p>

          {/* 🔽 이전/다음 링크 추가 */}
          <div style={{ marginTop: 60, borderTop: '1px solid #ddd', paddingTop: 20 }}>
            <div style={{ borderBottom: '1px solid #ddd', paddingBottom: 20 }}>
              {adjacent.prev ? (
                <Link to={`/notice/detail/${adjacent.prev.id}`}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0'
                  }}>
                    <div>
                      <div style={{ color: '#000', fontWeight: 'bold' }}>{adjacent.prev.title}</div>
                      <div style={{ fontSize: 14, color: '#697278', marginTop: 10 }}>{formatDate(adjacent.prev.resdate)}</div>
                    </div>
                    <img
                      src="/img/icon_board_arrow_right.svg"
                      alt="이전"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                </Link>
              ) : (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0'
                }}>
                  <span style={{ fontWeight: 'bold', color: '#697278' }}>이전 글이 없습니다.</span>
                  <img
                    src="/img/icon_board_arrow_right.svg"
                    alt="이전 없음"
                    style={{ width: 20, height: 20 }}
                  />
                </div>

              )}
            </div>
            <div style={{ borderBottom: '1px solid #ddd',padding: '30px 0' }}>
              {adjacent.next ? (
                <Link to={`/notice/detail/${adjacent.next.id}`}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0'
                  }}>
                    <div>
                      <div style={{ color: '#000', fontWeight: 'bold' }}>{adjacent.next.title}</div>
                      <div style={{ fontSize: 14, color: '#697278', marginTop: 10 }}>{formatDate(adjacent.next.resdate)}</div>
                    </div>
                    <img
                      src="/img/icon_board_arrow_left.svg"
                      alt="다음"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                </Link>

              ) : (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ fontWeight: 'bold', color: '#697278' }}>다음 글이 없습니다.</span>
                  <img
                    src="/img/icon_board_arrow_left.svg"
                    alt="다음 없음"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default NoticeDetail;
