import React, { useEffect, useState } from "react";
import { getDataroom, deleteDataroom } from "../api";
import { useParams, Link, useNavigate } from "react-router-dom";
export default function DataroomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    getDataroom(id)
      .then(setData)
      .catch((err) => {
        console.error(err);
        setError("자료를 불러오는데 실패했습니다.");
      });
  }, [id]);
  const handleDelete = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await deleteDataroom(id);
        navigate("/dataroom");
      } catch (err) {
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  if (error) return <div className="container mt-4 text-danger">{error}</div>;
  if (!data) return <div className="container mt-4">로딩 중...</div>;
  return (
    <div style={{padding:'100px 0'}} className="container mt-4">
      <h3 style={{fontWeight:'bold', fontSize:56, marginBottom:50, textAlign:"center"}}>자료 상세보기</h3>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <p>
        <strong>작성일:</strong> {formatDate(data.resdate)}
      </p>
      {data.file && (
        <p>
          <a
            href={data.file.startsWith("http") ? data.file : `http://localhost:8000${data.file}`}
            download
            className="btn btn-outline-primary"
          >
            파일 다운로드
          </a>
        </p>
      )}
      <div>
        <Link to={`/dataroom/edit/${data.id}`} className="btn btn-warning">
          수정
        </Link>
      </div>
    </div>
  );
}