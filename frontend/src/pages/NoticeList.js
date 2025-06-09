import React, { useEffect, useState } from "react";
import { getNotices } from "../api";
import { Link } from "react-router-dom";
import { getUserInfo } from "../auth"; // ✅ 추가
import './sub.css';

function NoticeList() {
  const [notices, setNotices] = useState([]);
  const user = getUserInfo(); // ✅ 사용자 정보 가져오기
  const [search, setSearch] = useState('');
  const [filteredNotices, setFilteredNotices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getNotices();
      const list = Array.isArray(data) ? data : data.results || [];
      setNotices(list);
      setFilteredNotices(list);
    }
    fetchData();
  }, []);


  function formatDate(dateString) {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  const handleSearch = () => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) {
      setFilteredNotices(notices);
    } else {
      setFilteredNotices(
        notices.filter(notice =>
          notice.title.toLowerCase().includes(keyword) ||
          notice.content.toLowerCase().includes(keyword)
        )
      );
    }
  };


  return (
    <>
      <div className="notice" style={{ margin: '0 auto', height: 484, width: '100%'}}>
        <div className="notice-list_img">
          <div style={{ verticalAlign: 'middle' }} className="notice_img-text">
            <h1 className="n-list" style={{ fontSize: 56, fontWeight:'bold', marginBottom:20 }}>공지사항</h1>
            <p className="sub-title">현대자동차 웹사이트 및 브랜드 전반에 관한 소식을 전해 드립니다.</p>
          </div>
        </div>
      </div>

      <div style={{ margin: '0 auto', width: '100%', marginTop: 100, maxWidth: 1448, marginBottom: 100 }}>
        {/* 검색 영역 */}
        <div style={{ width: 200, height: 30, marginBottom: 20, marginTop: 100 }}>
          <div style={{ display: "flex", borderBottom: '1px solid #e5e5e5', width: '100%', borderRadius: 0 }}>
            <input
              type="text"
              className="form-control"
              placeholder="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ height: 30, borderRadius: 0, border: 0 }}
            />
            <button
              style={{
                backgroundColor: '#fff',
                border: 0,
                width: 18,
                height: 15,
                cursor: 'pointer',
                marginLeft: 10,
                marginRight: 10
              }}
              onClick={handleSearch}
            >
              <img style={{ width: '100%', height: '100%' }} src="/img/search_icon.png" alt="검색" />
            </button>
          </div>
        </div>


        <ul style={{ width: '100%', borderTop: '1px solid #000' }} className="list-group">
          {Array.isArray(notices) && filteredNotices.map(notice => (
            <li style={{ border: 0, borderRadius: 0, borderBottom: '1px solid #e6e6e6', padding: '40px 0' }} key={notice.id} className="list-group-item">
              <Link style={{ textDecoration: 'none' }} to={`/notice/detail/${notice.id}`}>
                <h4 style={{ color: '#05141f', margin: 0, fontWeight: 'bold' }}>{notice.title}</h4>
                <p style={{
                  whiteSpace: 'normal', margin: 0, fontSize: 18,
                  color: '#626262',
                  marginTop: 10,
                  fontWeight: 'bold',
                }}>
                  {notice.content.split('\n').slice(0, 2).map((line, i) => (
                    <React.Fragment key={i}>
                      {line}<br />
                    </React.Fragment>
                  ))}
                </p>


                <p style={{ fontSize: 12, color: '#626262', margin: 0, marginTop: 10, fontWeight: 'bold' }}>{formatDate(notice.resdate)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default NoticeList;
