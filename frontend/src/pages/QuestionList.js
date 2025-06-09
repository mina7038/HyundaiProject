// import React, { useEffect, useState } from 'react';
// import { getQuestions } from '../api';
// import { useNavigate } from 'react-router-dom';

// function QuestionList() {
//   const [questions, setQuestions] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getQuestions().then(setQuestions);
//   }, []);

//   const goToCreate = () => {
//     navigate('/questions/create'); // 질문 등록 페이지로 이동
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>질문 목록</h2>

//       {/* 등록 버튼 */}
//       <div style={{ textAlign: 'right', marginBottom: '10px' }}>
//         <button
//           onClick={goToCreate}
//           style={{
//             padding: '8px 16px',
//             backgroundColor: '#006ca4',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer'
//           }}
//         >
//           질문 등록
//         </button>
//       </div>

//       <ul>
//         {questions.map((q) => (
//           <li key={q.id}>
//             <a href={`/questions/${q.id}`}>{q.title}</a> - {q.author_username}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default QuestionList;
