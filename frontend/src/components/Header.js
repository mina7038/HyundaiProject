import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAccess, clearTokens, getUserInfo } from "../auth";
import './common.css';

export default function Header() {
  const access = getAccess();
  const user = getUserInfo();              // ★ 사용자 정보
  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!getAccess());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    clearTokens();
    setIsLoggedIn(false);  // 강제로 상태 변경
    nav("/login");
  };

  useEffect(() => {
    setIsLoggedIn(!!getAccess());
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev); // 토글
  };

  const location = useLocation();
  const isProductPage = location.pathname === "/products";


  return (
    <>
      <header className={`clearfix ${isMenuOpen ? "open-menu" : ""}`} style={{ fontSize:15, backgroundColor: isProductPage ? "#fff" : "#000", width: "100%", margin: '0 auto', display: 'flow-root' }}>
        <div className="clearfix" style={{ maxWidth: 1448, margin: '0 auto', paddingLeft: isMenuOpen ? 20:18 }}>
          <h1 className="logo-white" style={{ width: isProductPage ? 90:100, height: 50, float: "left", marginLeft: isProductPage ? 5:0 }}>
            <Link to="/">
              <img
                style={{ width: "100%", marginTop: 20 }}
                src={isProductPage ? "img/logo-product.svg":"/img/logo.jpeg"}
                alt="로고"
              />
            </Link>
          </h1>
          <h1 className="logo-black" style={{ width: isMenuOpen ? 35:38, float: "left" }}>
            <Link to="/">
              <img
                style={{ width: "100%", marginTop: isMenuOpen ? 10:8 }}
                src={isMenuOpen ? "/img/m_logo_white.png":"/img/logo-black.png"}
                alt="로고"
              />
            </Link>
          </h1>
          <nav className="header-nav" style={{ float: 'left', marginTop: 40, marginLeft: 100 }}>
            <Link className="link" style={{ color : isProductPage ? '#000':'#fff', textDecoration: 'none', marginRight: 50, fontWeight: 'bold' }} to="/products">모델</Link>
            <Link className="link" style={{ color : isProductPage ? '#000':'#fff', textDecoration: 'none', marginRight: 50, fontWeight: 'bold' }} to="/notice">공지사항</Link>
            <Link className="link" style={{ color : isProductPage ? '#000':'#fff', textDecoration: 'none', marginRight: 50, fontWeight: 'bold' }} to="/questions/create">1:1문의</Link>
            <Link className="link" style={{ color : isProductPage ? '#000':'#fff', textDecoration: 'none', marginRight: 50, fontWeight: 'bold' }} to="/dataroom" >자료실</Link>
          </nav>
          <button onClick={toggleMenu} style={{ float: "right", marginTop: 20, marginRight: 10 }} className="menu-btn">
            <span className={`menu-ico${isMenuOpen ? " is-active" : ""}`}>
              <span className="bar-center"></span>
            </span>
            <span className="blind">메뉴</span>
          </button>
          <nav style={{ float: 'right', marginTop: 40 }}>
            {access ? (
              <>
                {/* ⭐ 일반 사용자만 마이페이지 보기 */}
                {!user?.is_staff && (
                  <Link onClick={() => setIsMenuOpen(false)} to="/mypage" className="text me-3 link" style={{ fontWeight: 'bold', color : isProductPage ? '#000':'#fff', }}>마이페이지</Link>
                )}

                {/* ★ 관리자(is_staff)일 때만 회원목록 메뉴 표시 */}
                {user?.is_staff && (
                  <Link onClick={() => setIsMenuOpen(false)} to="/adminusers" className="text me-3 link" style={{ fontWeight: 'bold', color : isProductPage ? '#000':'#fff', }}>관리자</Link>
                )}

                <button className="link" style={{ color : isProductPage ? '#000':'#fff', background: 'none', padding: '0px 10px', cursor: 'pointer', fontWeight: 'bold' }} onClick={logout}>
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link className="link" onClick={() => setIsMenuOpen(false)} style={{ color: isProductPage ? '#000':'#fff', textDecoration: 'none', marginRight: 50, fontWeight: 'bold' }} to="/login">로그인</Link>
                <Link className="link" onClick={() => setIsMenuOpen(false)} style={{ color: isProductPage ? '#000':'#fff', textDecoration: 'none', fontWeight: 'bold' }} to="/register">회원가입</Link>
              </>
            )}
          </nav>

        </div>
      </header>
      {isMenuOpen && (
        <div className="sub-menu" style={{ width: '100%', margin: '0 auto' }}>
          <nav style={{ textAlign: 'center', padding: '10px 15px', backgroundColor: '#f6f3f2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {access ? (
              <>
                {!user?.is_staff && (
                  <Link onClick={() => setIsMenuOpen(false)} to="/mypage" className="item_util" style={{ fontWeight: 'bold', width: '50%', color: '#002c5f', textDecoration: 'none' }}>마이페이지</Link>
                )}
                {user?.is_staff && (
                  <Link onClick={() => setIsMenuOpen(false)} to="/adminusers" className="item_util" style={{ fontWeight: 'bold', width: '50%', textDecoration: 'none', color: '#002c5f' }}>관리자</Link>
                )}
                <button style={{ color: '#002c5f', width: '50%', background: 'none', cursor: 'pointer', fontWeight: 'bold' }} onClick={logout}>
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link onClick={() => setIsMenuOpen(false)} className="item_util" style={{ color: '#002c5f', width: '50%', textDecoration: 'none', fontWeight: 'bold' }} to="/register">회원가입</Link>
                <Link onClick={() => setIsMenuOpen(false)} style={{ color: '#002c5f', width: '50%', textDecoration: 'none', fontWeight: 'bold' }} to="/login">로그인</Link>
              </>
            )}
          </nav>

          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            <Link style={navLinkStyle} onClick={() => setIsMenuOpen(false)} to="/products">모델</Link>
            <Link style={navLinkStyle} onClick={() => setIsMenuOpen(false)} to="/notice">공지사항</Link>
            <Link style={navLinkStyle} onClick={() => setIsMenuOpen(false)} to="/questions/create">1:1문의</Link>
            <Link style={navLinkStyle} onClick={() => setIsMenuOpen(false)} to="/dataroom">자료실</Link>
          </nav>
        </div>
      )}
    </>
  );
};

const navLinkStyle = {
  color: '#000',
  textDecoration: 'none',
  fontWeight: 'bold',
  padding: '15px 15px',
  borderBottom: '1px solid #e5e5e5'
};