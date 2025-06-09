import React, { useEffect, useState } from 'react';
import { getQuestion, createAnswer, getProfile } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [content, setContent] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    getProfile()
      .then(profile => setIsAdmin(profile.is_staff))
      .catch(() => setIsAdmin(false));

    getQuestion(id)
      .then(res => setQuestion(res.data))
      .catch(() => alert("질문 정보를 불러오지 못했습니다."));
  }, [id]);

  const handleAnswer = async () => {
    try {
      await createAnswer({ content, question: Number(id) }, token);
      setContent('');
      const updated = await getQuestion(id);
      setQuestion(updated.data);
      navigate("/adminqna");
    } catch {
      alert("답변 등록에 실패했습니다.");
    }
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  if (!question) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

  return (
    <div style={{paddingTop:100}}>
    <h2 style={{textAlign:'center', fontSize:56, fontWeight:'bold', marginBottom:50}}>1:1문의</h2>
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', color: '#333', marginBottom: 100 }}>
  <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
    <tbody>
      {/* 질문 상태 */}
      <tr>
        <td style={{ textAlign: 'left', border:'1px solid #dee2e6', width:100 }}>상태</td>
        <td style={{paddingBottom: 10, border:'1px solid #dee2e6',}}>
          <p style={{ color: question.is_answered ? 'green' : 'red', margin:0 }}>
            {question.is_answered ? '답변 완료' : '미답변'}
          </p>
        </td>
      </tr>

      {/* 질문 제목 */}
      <tr>
        <td style={{ textAlign: 'left', border:'1px solid #dee2e6', width:100 }}>제목</td>
        <td style={{border:'1px solid #dee2e6'}}>{question.title}</td>
      </tr>

      <tr>
  <td colSpan={2} style={{ border: '1px solid #dee2e6', padding: '12px' }}>
    <p style={{ color: '#999', fontSize: '12px', marginBottom: '10px', width:'100%', borderBottom:'1px solid #dee2e6', paddingBottom:10 }}>
      작성일: {formatDate(question.created_at)}
    </p>
    <p style={{ whiteSpace: 'pre-wrap', fontSize: '16px', lineHeight: 1.6, margin: 0, minHeight:100 }}>
      {question.content}
    </p>
  </td>
</tr>

      
    </tbody>
  </table>

  {/* 답변 영역 */}
  <div>
    <h3 style={{ fontSize: '18px', marginBottom: 10, marginTop:50 }}>답변</h3>
    {question.answers && question.answers.length > 0 ? (
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {question.answers.map(ans => (
            <tr key={ans.id}>
              <td style={{ paddingBottom: 20 }}>
                <p style={{ whiteSpace: 'pre-wrap', fontSize: '16px', lineHeight: 1.6 }}>{ans.content}</p>
                <p style={{ color: '#999', fontSize: '14px', marginTop: '5px' }}>{formatDate(ans.created_at)}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p style={{ color: '#777', fontSize: '15px' }}>아직 등록된 답변이 없습니다.</p>
    )}
  </div>

  {/* 관리자 전용: 답변 작성 */}
  {isAdmin && (
    <>
      <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid rgb(141, 141, 141)' }} />
      <div>
        <h3 style={{ marginBottom: '10px', fontSize: '18px' }}>답변 작성</h3>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          placeholder="내용을 입력하세요."
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '15px',
            border: '1px solid #dee2e6',
            fontFamily: 'inherit',
            resize: 'vertical'
          }}
        />
        <button
          onClick={handleAnswer}
          style={{
            marginTop: '12px',
            backgroundColor: '#000',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            fontSize: '15px',
            cursor: 'pointer'
          }}
        >
          답변 등록
        </button>
      </div>
    </>
  )}
</div>
    </div>
  );
}

export default QuestionDetail;
