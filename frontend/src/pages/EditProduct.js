import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../api';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [existingImage, setExistingImage] = useState('');
  const [detail, setDetail] = useState(null);
  const [existingDetail, setExistingDetail] = useState('');
  const [previewDetail, setPreviewDetail] = useState('');

  // ✅ useEffect로 감싸서 딱 1번만 실행
  useEffect(() => {
    getProduct(id)
      .then(res => {
        const product = res.data;
        setName(product.name);
        setPrice(product.price);
        setExistingImage(product.image);
        setExistingDetail(product.detail);
      })
      .catch(err => {
        console.error("❌ 상품 정보 불러오기 실패:", err);
        alert("상품 정보를 불러올 수 없습니다.");
      });
  }, [id]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const selectedFile = files[0];

    if (name === "image") {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else if (name === "detail") {
      setDetail(selectedFile);
      setPreviewDetail(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (file) formData.append("image", file);
    if (detail) formData.append("detail", detail);

    try {
      const res = await fetch(`http://localhost:8000/api/products/${id}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("❌ 서버 응답:", errorData);
        throw new Error("수정 실패");
      }

      alert("수정 완료");
      navigate("/adminproducts");
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정 실패: " + error.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 1448, margin: '0 auto', marginTop: 100, marginBottom: 100 }}>
      <h2 style={{ textAlign: 'center', fontSize: 56, fontWeight: 'bold', marginBottom: 0 }} className="n-list mb-4">상품 수정</h2>
      <form onSubmit={handleSubmit} style={{ margin: '0 auto', marginTop: 50 }}>
  <table className="table" style={{ maxWidth: 1200, margin: '0 auto' }}>
    <tbody>
      <tr>
        <th style={{ width: 180, verticalAlign: 'middle', border: 0, paddingBottom: 20 }}>
          <label className="form-label mb-0">상품명</label>
        </th>
        <td style={{ border: 0, paddingBottom: 20 }}>
          <input
            className="form-control"
            style={{ borderRadius: 0 }}
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </td>
      </tr>

      <tr>
        <th style={{ width: 180, verticalAlign: 'middle', border: 0, paddingBottom: 20 }}>
          <label className="form-label mb-0">가격</label>
        </th>
        <td style={{ border: 0, paddingBottom: 20 }}>
          <input
            type="text"
            className="form-control"
            style={{ borderRadius: 0 }}
            value={Number(price).toLocaleString()}
            onChange={e => setPrice(e.target.value)}
            required
          />
        </td>
      </tr>

      <tr>
        <th style={{ width: 180, verticalAlign: 'middle', border: 0, paddingBottom: 20 }}>
          <label className="form-label mb-0">기존 이미지</label>
        </th>
        <td style={{ border: 0, paddingBottom: 20 }}>
          {existingImage && !preview && <img src={existingImage} alt="기존" width={200} />}
          {preview && <img src={preview} alt="미리보기" width={200} />}
        </td>
      </tr>

      <tr>
        <th style={{ width: 180, verticalAlign: 'middle', border: 0, paddingBottom: 20 }}>
          <label className="form-label mb-0">이미지 변경</label>
        </th>
        <td style={{ border: 0 }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control"
            style={{ borderRadius: 0 }}
          />
        </td>
      </tr>
      <tr>
  <th style={{ width: 180, verticalAlign: 'middle', border: 0, paddingBottom: 20 }}>
    <label className="form-label mb-0">기존 디테일 이미지</label>
  </th>
  <td style={{ border: 0, paddingBottom: 20 }}>
    {existingDetail && !previewDetail && <img src={existingDetail} alt="기존 디테일" width={200} />}
    {previewDetail && <img src={previewDetail} alt="디테일 미리보기" width={200} />}
  </td>
</tr>

<tr>
  <th style={{ width: 180, verticalAlign: 'middle', border: 0, paddingBottom: 20 }}>
    <label className="form-label mb-0">디테일 이미지 변경</label>
  </th>
  <td style={{ border: 0 }}>
    <input
      type="file"
      name="detail"
      accept="image/*"
      onChange={handleFileChange}
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
      수정하기
    </button>
  </div>
</form>

    </div>
  );
}

export default EditProduct;
