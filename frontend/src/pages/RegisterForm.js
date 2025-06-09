// src/pages/Register.js
import { useState, navigate } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register, checkUsername } from "../api";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    username: "", password: "", email: "",
    first_name: "", last_name: "",
  });
  const [valid, setValid] = useState(null);
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const handleUsername = async username => {
    setForm({ ...form, username });
    if (username.length >= 3) {
      const { exists } = await checkUsername(username);
      setValid(!exists);
    } else setValid(null);
  };

  const submit = async e => {
  e.preventDefault();
  if (valid === false) {
    setMessage("이미 사용 중인 아이디입니다.");
    return;
  }
  if (form.password !== confirmPassword) {
    setPasswordMessage("비밀번호가 일치하지 않습니다.");
    return;
  }
  await register(form);
  alert("회원가입 완료! 로그인 해주세요.");
  nav("/login");
};

  return (
    <>
      <div style={{ borderTop: '7px solid #012d5e' }}>
        <div className="register-logo">
          <div className="register-logo-inner">
            <div style={{ width: 128, padding: '20px 0' }}>
              <Link to="/">
                <img style={{ width: '100%' }} src="/img/register-logo.png" alt=""></img>
              </Link>
            </div>
          </div>
        </div>
        <div className="register-title">
          <h3 style={{ fontSize: 18, marginBottom: 0, fontWeight: 'bold' }}>가입 정보 입력</h3>
        </div>

        <form style={{ margin: '0 auto', marginTop: 50, border: 0 }} onSubmit={submit} className="card card-body">
          <table className="table" style={{ maxWidth: 640, margin: '0 auto' }}>
    <tbody>
      <tr>
  <th style={{ width: 180, verticalAlign: 'middle', border: 0, paddingBottom: 20 }}>
    <label className="form-label mb-0">아이디</label>
  </th>
  <td style={{ border: 0, paddingBottom: 20 }}>
  <div style={{ display: "flex", gap: "10px" }}>
    <input
      required
      className={`form-control ${valid === false ? "is-invalid" : ""}`}
      value={form.username}
      onChange={e => {
        setForm({ ...form, username: e.target.value });
        setValid(null); // 상태 초기화
        setMessage("");  // 메시지도 초기화
      }}
      style={{ borderRadius: 0 }}
    />
    <button
      type="button"
      style={{ minWidth: 100, borderRadius: 0 }}
      className="btn btn-outline-secondary"
      onClick={async () => {
        const trimmed = form.username.trim();
        if (trimmed.length < 3) {
          setValid(false);
          setMessage("아이디는 최소 3자 이상이어야 합니다.");
          return;
        }
        const { exists } = await checkUsername(trimmed);
        setValid(!exists);
        setMessage(exists ? "이미 사용 중인 아이디입니다." : "사용 가능한 아이디입니다.");
      }}
    >
      중복 확인
    </button>
  </div>
  {message && (
    <div style={{ marginTop: 6, fontSize: 14, color: valid ? "green" : "red" }}>
      {message}
    </div>
  )}
</td>

</tr>


      <tr>
        <th style={{ verticalAlign: 'middle', border: 0, paddingBottom: 20 }}>
          <label className="form-label mb-0">비밀번호</label>
        </th>
        <td style={{ border: 0, paddingBottom: 20 }}>
          <input
            type="password"
            required
            className="form-control"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            style={{ borderRadius: 0 }}
          />
        </td>
      </tr>
      <tr>
  <th style={{ verticalAlign: 'middle', border: 0, paddingBottom: 20 }}>
    <label className="form-label mb-0">비밀번호 확인</label>
  </th>
  <td style={{ border: 0, paddingBottom: 20 }}>
    <input
      type="password"
      required
      className="form-control"
      value={confirmPassword}
      onChange={e => {
        setConfirmPassword(e.target.value);
        if (form.password !== e.target.value) {
          setPasswordMessage("비밀번호가 일치하지 않습니다.");
        } else {
          setPasswordMessage("비밀번호가 일치합니다.");
        }
      }}
      style={{ borderRadius: 0 }}
    />
    {passwordMessage && (
      <div style={{ marginTop: 6, fontSize: 14, color: passwordMessage.includes("일치하지") ? "red" : "green" }}>
        {passwordMessage}
      </div>
    )}
  </td>
</tr>

      <tr>
        <th style={{ verticalAlign: 'middle', border: 0, paddingBottom: 20 }}>
          <label className="form-label mb-0">이름</label>
        </th>
        <td style={{ border: 0, paddingBottom: 20 }}>
          <input
            className="form-control"
            value={form.first_name}
            onChange={e => setForm({ ...form, first_name: e.target.value })}
            style={{ borderRadius: 0 }}
          />
        </td>
      </tr>

      <tr>
        <th style={{ verticalAlign: 'middle', border: 0, paddingBottom: 20 }}>
          <label className="form-label mb-0">성</label>
        </th>
        <td style={{ border: 0, paddingBottom: 20 }}>
          <input
            className="form-control"
            value={form.last_name}
            onChange={e => setForm({ ...form, last_name: e.target.value })}
            style={{ borderRadius: 0 }}
          />
        </td>
      </tr>

      <tr>
        <th style={{ verticalAlign: 'middle', border: 0, paddingBottom: 20 }}>
          <label className="form-label mb-0">이메일</label>
        </th>
        <td style={{ border: 0, paddingBottom: 20 }}>
          <input
            type="email"
            className="form-control"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={{ borderRadius: 0 }}
          />
        </td>
      </tr>
    </tbody>
  </table>
          <div style={{ width: '100%', borderTop: '1px solid #ddd', textAlign: 'center', marginTop:50 }}>
            <div style={{ margin: '0 auto', width: 400, padding: '25px 20px 0 20px' }}>
              <button style={{ backgroundColor: 'rgb(0, 108, 164)', border: 0, padding: '10px 0' }} className="btn btn-success w-100">가입하기</button>
              <p style={{ textDecoration: 'underline', color: '#006ca4', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 50 }} className="login-link" onClick={() => navigate('/login')}>로그인 페이지로 이동</p>
            </div>
            <p style={{ marginBottom: 0, fontSize: 11, color: '#666' }}>COPYRIGHT © HYUNDAI MOTOR COMPANY. ALL RIGHTS RESERVED.</p>
          </div>
        </form>
      </div>
    </>
  );
}
