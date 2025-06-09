import React, { useState } from 'react';
import { createQuestion } from '../api';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../auth';  // 토큰 디코딩 유틸 함수
import './sub.css';


const QuestionForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const user = getUserInfo();  // 예: { username: '홍길동', email: 'user@example.com' }
  const name = user?.username || '';  // 이름 또는 닉네임
  const email = user?.email || '';    // 이메일

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await createQuestion({ title, content }, token);
      alert("질문이 등록되었습니다.");
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("질문 등록 실패");
    }
  };

  return (
    <div className="container mb-5" style={{ maxWidth: 1448, width: '100%', paddingTop:100 }}>
      <h2 style={{textAlign:'center', fontSize:56, fontWeight:'bold', marginBottom:0}} className="mb-4 q-form">1:1문의</h2>
      <p className='sub-title' style={{marginTop:50, textAlign:'center', marginBottom:0}}>문의사항에 빠르고 친절하게 답변해 드리겠습니다.</p>
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:50, borderBottom:'1px solid #e5e5e5'}}>
        <p style={{fontWeight:'bold'}}>문의 사항을 상세히 작성해주세요.</p>
        <p style={{}} className="font_sm">
          <em style={{color:'red'}} className="text_warning">*</em> 입력 항목
        </p>
      </div>

      <form style={{ marginTop: 50 }} onSubmit={handleSubmit}>
  <table className="table q-form-t" style={{ maxWidth: 1448, margin: '0 auto' }}>
    <tbody>
      <tr style={{marginBottom:20}}>
        <th style={{ width: 180, verticalAlign: 'middle', border:0, paddingBottom:20 }}>이름</th>
        <td style={{border:0, paddingBottom:20 }}>{name}</td>
      </tr>
      <tr>
        <th style={{ width: 180, verticalAlign: 'top', border:0, paddingBottom:20 }}>이메일</th>
        <td style={{border:0, paddingBottom:20 }}>
          <p style={{marginBottom:5}}>{email}</p>
          <p style={{border:0, color:'red'}}>*문의에 대한 답변은 마이페이지에서 확인이 가능합니다.</p>
          </td>
      </tr>
      <tr>
        <th style={{ width: 180, verticalAlign: 'middle', border:0 }}>
          <label htmlFor="title" className="form-label mb-0">제목 <span style={{ color: 'red' }}>*</span></label>
        </th>
        <td style={{border:0 }}>
          <input
            style={{borderRadius:'0'}}
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </td>
      </tr>
      <tr>
        <th style={{ verticalAlign: 'middle' , border:0 }}>
          <label htmlFor="content" className="form-label mb-0">내용 <span style={{ color: 'red' }}>*</span></label>
        </th>
        <td style={{border:0 }}>
          <textarea style={{borderRadius:'0'}}
            className="form-control"
            id="content"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </td>
      </tr>
    </tbody>
  </table>

  <div style={{ textAlign: 'center', marginTop: 30 }}>
    <button type="submit" style={{backgroundColor:'#002c5f', borderRadius:0, marginBottom:50}} className="btn btn-dark px-5">등록</button>
  </div>
</form>

    </div>
  );
};

export default QuestionForm;
