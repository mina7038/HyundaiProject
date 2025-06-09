import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api';

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    detail: null,
    category: '수소/전기차' // 기본값 설정 가능
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('category', form.category);
    if (form.image) formData.append('image', form.image);
    if (form.detail) formData.append('detail', form.detail);

    try {
      const result = await createProduct(formData);
      alert("✅ 상품 등록 완료");
      navigate(`/products`);
    } catch (err) {
      console.error("❌ 상품 등록 실패:", err);
      alert("상품 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 1448, margin: '0 auto', marginTop: 100, marginBottom: 100 }}>
      <h2 style={{ textAlign: 'center', fontSize: 56, fontWeight: 'bold', marginBottom: 0 }} className="mb-4 n-list">상품 등록</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ marginTop: 50 }}>
        <table className="table" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <tbody>
            <tr>
              <th style={{ width: 180, verticalAlign: "middle", border: 0, paddingBottom: 20 }}>
                <label className="form-label mb-0">카테고리</label>
              </th>
              <td style={{ border: 0, paddingBottom: 20 }}>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="form-control"
                  style={{ borderRadius: 0 }}
                >
                  <option value="수소/전기차">수소/전기차</option>
                  <option value="N">N</option>
                  <option value="승용">승용</option>
                  <option value="SUV">SUV</option>
                  <option value="MPV">MPV</option>
                  <option value="소형트럭&택시">소형트럭&택시</option>
                  <option value="트럭">트럭</option>
                  <option value="버스">버스</option>
                </select>
              </td>
            </tr>

            <tr>
              <th style={{ verticalAlign: "middle", border: 0, paddingBottom: 20 }}>
                <label className="form-label mb-0">상품명</label>
              </th>
              <td style={{ border: 0, paddingBottom: 20 }}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="form-control"
                  style={{ borderRadius: 0 }}
                />
              </td>
            </tr>

            <tr>
              <th style={{ verticalAlign: "middle", border: 0, paddingBottom: 20 }}>
                <label className="form-label mb-0">설명</label>
              </th>
              <td style={{ border: 0, paddingBottom: 20 }}>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="form-control"
                  rows="4"
                  style={{ borderRadius: 0 }}
                />
              </td>
            </tr>

            <tr>
              <th style={{ verticalAlign: "middle", border: 0, paddingBottom: 20 }}>
                <label className="form-label mb-0">가격</label>
              </th>
              <td style={{ border: 0, paddingBottom: 20 }}>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="form-control"
                  style={{ borderRadius: 0 }}
                />
              </td>
            </tr>

            <tr>
              <th style={{ verticalAlign: "middle", border: 0, paddingBottom: 20 }}>
                <label className="form-label mb-0">이미지</label>
              </th>
              <td style={{ border: 0 }}>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="form-control"
                  style={{ borderRadius: 0 }}
                />
              </td>
            </tr>
            <tr>
              <th style={{ verticalAlign: "middle", border: 0, paddingBottom: 20 }}>
                <label className="form-label mb-0">디테일 이미지</label>
              </th>
              <td style={{ border: 0 }}>
                <input
                  type="file"
                  name="detail"
                  accept="image/*"
                  onChange={handleChange}
                  className="form-control"
                  style={{ borderRadius: 0 }}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ textAlign: "center", marginTop: 30 }}>
          <button
            type="submit"
            style={{ backgroundColor: "#002c5f", borderRadius: 0 }}
            className="btn btn-dark px-5"
          >
            등록
          </button>
        </div>
      </form>

    </div>
  );
}
