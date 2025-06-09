import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api";
import { setTokens } from "../auth";
import "./sub.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    const data = await login(form);   // data = { access, refresh, user }

    if (data.access) {
      setTokens(data);  // access, refresh 저장
      console.log("data:" + data);
      console.log("data.user:" + data.user);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      alert("로그인에 성공하였습니다.");
      nav("/");  // 메인 페이지로 이동
    } else {
      alert("아이디 혹은 비밀번호를 확인해 주세요.");
    }
  };

  return (

    <div style={{ fontSize: 14, margin: '0 auto', width: '100%', height: '100vh', backgroundColor: '#EEEFF1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#fff', maxWidth: 508, width: '100%', height: 'auto', padding: 48, borderRadius: 4, textAlign: 'center' }}>
        <h2 style={{ width: '100%' }}><Link to="/"><img src="/img/login-logo.svg" alt=""></img></Link></h2>
        <form onSubmit={submit} style={{ marginTop: 40 }}>
          <div className="input-box" style={{ boxSizing: 'border-box', position: 'relative', display: 'flex', width: '100%', padding: '13px 16px', alignItems: 'center', borderRadius: 4, backgroundColor: '#fff' }}>
            <span className="input id-input"></span>
            <input style={{ border: 0, width: '100%', marginLeft: 6 }}
              required
              placeholder="아이디"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div className="input-box" style={{ marginTop: 10, boxSizing: 'border-box', position: 'relative', display: 'flex', width: '100%', padding: '13px 16px', alignItems: 'center', borderRadius: 4, backgroundColor: '#fff' }}>
            <span className="input pw-input"></span>
            <input style={{ border: 0, width: '100%', marginLeft: 6 }}
              type="password"
              required
              placeholder="비밀번호"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="settings" style={{ marginTop: 12, width: '100%', textAlign: 'right' }}>
            <p>아이디 or 비밀번호 재설정</p>
          </div>
          <div style={{ width: '100%', marginTop: 48, }}>
            <button style={{ padding: '13px 16px', color: '#787F8C', borderRadius: 4, width: '100%', backgroundColor: '#E9EAEC', border: 0 }} type="submit">로그인</button>
          </div>
          <div className="btn-register" style={{ width: '100%', marginTop: 10, }}>
            <Link style={{ display: "block", textDecoration: 'none', fontWeight: 700, padding: '13px 16px', color: '#000', borderRadius: 4, width: '100%', backgroundColor: '#fff', border: '1px solid #CDD0D5' }} to="/register">계정 만들기</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
