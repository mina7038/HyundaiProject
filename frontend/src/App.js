// src/App.js
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './index.css';

import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import UserList from "./pages/UserList";
import Home from "./pages/Home";
import Terms from './pages/Terms';
import RegisterForm from './pages/RegisterForm';

import NoticeList from "./pages/NoticeList";
import NoticeDetail from "./pages/NoticeDetail";
import NoticeForm from "./pages/NoticeForm";

import QuestionDetail from "./pages/QuestionDetail";
import QuestionForm from './pages/QuestionForm';

import AdminQna from "./pages/AdminQna";
import AdminUsers from "./pages/AdminUsers";
import AdminNotice from "./pages/AdminNotice";
import AdminProducts from './pages/AdminProducts';
import AdminDataroom from './pages/AdminDataroom';

import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import EditProduct from "./pages/EditProduct";

import DataroomList from "./pages/DataroomList";
import DataroomDetail from "./pages/DataroomDetail";
import DataroomForm from "./pages/DataroomForm";
import ChatBot from "./pages/ChatBot";

function AppContent() {
  const location = useLocation();
  const noLayoutRoutes = ["/login", "/terms", "/register-form"];

  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <div className="app-layout">
      {!hideLayout && <Header />}
      <main className="flex-grow-1">
        <Routes>
          {/* 공지사항 */}
          <Route path="/" element={<Home />} />
          <Route path="/notice" element={<NoticeList />} />
          <Route path="/notice/detail/:id" element={<NoticeDetail />} />
          <Route path="/notice/create" element={<NoticeForm />} />
          <Route path="/notice/edit/:id" element={<NoticeForm />} />

          {/* 회원 시스템 */}
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/register" element={<Navigate to="/terms" />} />
          <Route path="/register-form" element={<RegisterForm />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/members" element={<UserList />} />

          <Route path="/questions/:id" element={<QuestionDetail />} />
          <Route path="/questions/create" element={<QuestionForm />} />

          // App.js 또는 Routes.js
          <Route path="/adminqna" element={<AdminQna />} />
          <Route path="/adminusers" element={<AdminUsers />} />
          <Route path="/adminnotice" element={<AdminNotice />} />
          <Route path="/adminproducts" element={<AdminProducts />} />
          <Route path="/admindataroom" element={<AdminDataroom />} />

          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />

          <Route path="/dataroom" element={<DataroomList />} />
          <Route path="/dataroom/create" element={<DataroomForm />} />
          <Route path="/dataroom/edit/:id" element={<DataroomForm />} />
          <Route path="/dataroom/detail/:id" element={<DataroomDetail />} />


        </Routes>

      </main>
      <ChatBot />
      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
