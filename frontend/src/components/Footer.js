import React from "react";
import { Link } from "react-router-dom";
import './common.css';

const Footer = () => (
    <footer>
        <div className="footer-inner">
            <div className="footer-top">
                <div style={{ float: 'left' }} className="footer-logo">
                    <Link to="/">
                        <img src="/img/logo_footer.png" alt="푸터로고"></img>
                    </Link>
                    <p className="logo-set" style={{ marginTop: 5, marginBottom: 0 }}>COPYRIGHT ⓒ HYUNDAI MOTOR COMPANY. ALL RIGHTS RESERVED.</p>
                </div>
                <div style={{ float: 'left', marginLeft: 80 }} className="footer-list">
                    <nav>
                        <Link style={{ color: '#999999', textDecoration: 'none', marginRight: 50, fontWeight:'bold' }} to="/products">모델</Link>
                        <Link style={{ color: '#999999', textDecoration: 'none', marginRight: 50, fontWeight:'bold' }} to="/notice">공지사항</Link>
                        <Link style={{ color: '#999999', textDecoration: 'none', marginRight: 50, fontWeight:'bold' }} to="/questions/create">1:1문의</Link>
                        <Link style={{ color: '#999999', textDecoration: 'none', marginRight: 50, fontWeight:'bold' }} to="/dataroom" >자료실</Link>
                    </nav>
                    <p className="footer-center" style={{ marginTop: 10, marginBottom: 0 }}>고객센터 : 010-9216-7038</p>
                    <p className="copyright" style={{ marginTop: 5, marginBottom: 0 }}>COPYRIGHT ⓒ HYUNDAI MOTOR COMPANY. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
            <div className="footer-bottom">
                <ul style={{ paddingLeft: 0 }}>
                    <li><img src="/img/footer-mark-wa.png" alt=""></img><span>웹 접근성 품질인증</span></li>
                    <li><img src="/img/img_mark_design.png" alt=""></img><span>우수디자인 지식경제부선정</span></li>
                    <li><img src="/img/img_mark_family.png" alt=""></img><span>가족친화 우수기관</span></li>
                    <li><img src="/img/img_mark_kssqi.png" alt=""></img><span>2024년 한국서비스품질지수 (KS-SQI)<br />자동차 A/S 부문 10년 연속 1위 </span></li>
                    <li><img src="/img/footer-mark06.png" alt=""></img><span>2025년 국가고객만족도(NCSI)<br />조사대상 전 부문 1위 수상<br />(컴팩트승용, 중형, 준대형, 대형, 컴팩트RV,<br />대형RV, 전기차)</span></li>
                    <li><img src="/img/img_mark_ksci.png" alt=""></img><span>2024년 한국산업의 고객만족도(KCSI)<br />조사대상 전 부문 1위 수상<br />(일반승용차, RV승용차, 경형승용차, 전기차)</span></li>
                    <li><img src="/img/img_mark_ksqei.png" alt=""></img><span>2024년 한국품질만족지수 (KS-QEI) 조사<br />12개 부문 1위 (승용-준중형/중형/대형,<br />SUV-소형/준중형/대형, 전기차, 자동차AS,<br />럭셔리-D,E,F세단/대형SUV)</span></li>
                </ul>
            </div>
        </div>
    </footer>
);

export default Footer;
