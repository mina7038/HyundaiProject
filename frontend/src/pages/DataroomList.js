import React, { useEffect, useState } from "react";
import { getDatarooms } from "../api";
import { Link } from "react-router-dom";

export default function DataroomList() {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getDatarooms().then((data) => {
      const list = Array.isArray(data) ? data : data.results || [];
      setItems(list);
      setFiltered(list); // 처음엔 전체 표시
    });
  }, []);

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

  return (
    <div style={{ margin: '0 auto', maxWidth: 1448, width: '100%', paddingBottom:100, paddingTop:100 }} className="container">
      <h2 className="dataroom" style={{ fontSize: 56, fontWeight: 'bold', textAlign: 'center' }}>
        사용설명서 다운로드(자료실)
      </h2>
      <p className="sub-title" style={{ textAlign: 'center', paddingTop: 50 }}>
        차량 취급설명서 및 각종 매뉴얼/설명자료를 다운로드 할 수 있습니다.
      </p>

      {/* 🔍 검색 영역 */}
      <div style={{width:200, height:30, marginBottom:20, marginTop: 100 }}>
        <div style={{display:"flex", borderBottom:'1px solid #e5e5e5', Width: '100%', borderRadius:0 }}>
          <input
            type="text"
            className="form-control"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{height:30, borderRadius:0, border:0}}
          />
          <button style={{backgroundColor:'#fff', border:0, width:18, height:15, cursor:'pointer', marginLeft:10, marginRight:10}} onClick={handleSearchClick}>
            <img style={{width:'100%', height:'100%'}} src="/img/search_icon.png" alt=""></img>
          </button>
        </div>
      </div>

      

      <table className="table">
        <thead style={{backgroundColor:'#002c5f'}}>
          <tr style={{textAlign:'center', }}>
            <th style={{ borderLeft:'1px solid #e4dcd3',color:'#fff', width: '20%',backgroundColor:'#002c5f' }}>번호</th>
            <th style={{ borderLeft:'1px solid #e4dcd3',color:'#fff', width: '60%',backgroundColor:'#002c5f' }}>자료명</th>
            <th style={{ borderLeft:'1px solid #e4dcd3',borderRight:'1px solid #e4dcd3',color:'#fff', width: '20%',backgroundColor:'#002c5f' }}>다운로드</th>
          </tr>
        </thead>
        <tbody >
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">자료가 없습니다.</td>
            </tr>
          ) : (
            filtered.map((item) => (
              <tr key={item.id}>
                <td style={{ borderLeft:'1px solid #e4dcd3', textAlign: 'center', color:'#626262', fontWeight:'bold' }}>{item.id}</td>
                <td style={{ borderLeft:'1px solid #e4dcd3', color:'#626262', fontWeight:'bold'}}>{item.title}</td>
                <td style={{ borderLeft:'1px solid #e4dcd3', textAlign: 'center', borderRight:'1px solid #e4dcd3' }}>
                  {item.file ? (
                    <a style={{color:'#000', fontSize:13, fontWeight:'bold'}}
                      href={item.file.startsWith("http") ? item.file : `http://localhost:8000${item.file}`}
                      download
                    >
                      ⬇️ PDF
                    </a>
                  ) : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table> 
    </div>
  );
}
