import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategoryCounts } from '../api';
import ProductDetail from './ProductDetail';
import './main.css';

export default function ProductList() {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [category, setCategory] = useState("수소/전기차");
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const detailRef = useRef(null);

const handleProductClick = (product) => {
  setSelectedProduct(product);
  setTimeout(() => {
    const offset = 55; // 위에 여백 주고 싶으면 여기에 조절
    const top = detailRef.current.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }, 0);
};


  const categories = [
    { code: 'ev', name: '수소/전기차' },
    { code: 'n', name: 'N' },
    { code: 'sedan', name: '승용' },
    { code: 'suv', name: 'SUV' },
    { code: 'mpv', name: 'MPV' },
    { code: 'small', name: '소형트럭&택시' },
    { code: 'truck', name: '트럭' },
    { code: 'bus', name: '버스' },
  ];

  useEffect(() => {
    const fetchAll = async () => {
      const results = {};
      for (const category of categories) {
        try {
          const res = await getProducts({ category: category.name });
          results[category.name] = res.results || [];
        } catch (err) {
          console.error(`❌ ${category.name} 불러오기 실패:`, err);
          results[category.name] = [];
        }
      }
      setProductsByCategory(results);
    };
    fetchAll();
  }, []);

  useEffect(() => {
    getCategoryCounts().then(setCategoryCounts);
  }, []);

  const countMap = useMemo(() => {
    return categoryCounts.reduce((acc, { category, count }) => {
      acc[category] = count;
      return acc;
    }, {});
  }, [categoryCounts]);


  const count = countMap[category] || 0;

const handleCategoryClick = (name) => {
  setSelectedProduct(null);        // ✅ 무조건 상세 보기 닫기
  setCategory(name);               // ✅ 카테고리 갱신
  window.scrollTo({ top: 0, behavior: 'smooth' });  // 스크롤도 포함
};

useEffect(() => {
  // 카테고리가 바뀌면 선택된 상품 초기화
  setSelectedProduct(null);
}, [category]);

  return (
    <div className="product">
      {/* ✅ 카테고리 버튼 */}
      <nav className="product-nav" style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#002c5f',
        color: '#fff',
        zIndex: 1000,
        padding: '15px 0'
      }}>
        <ul style={{ maxWidth: 1448, display: 'flex', gap: 50, paddingLeft: 20, margin: '0 auto' }}>
          {categories.map(cat => (
            <li
              key={cat.code}
              onClick={() => handleCategoryClick(cat.name)}
              style={{
                cursor: 'pointer',
                fontWeight: category === cat.name ? 'bold' : 'normal',
                color: 'white'
              }}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </nav>

      {/* ✅ 선택된 카테고리만 출력 */}
      <div style={{ maxWidth: 1448, margin: '0 auto', padding: '50px 20px' }}>
        <h2 style={{ width: 200, fontSize: 26, borderTop: '1px solid #000', paddingTop: 10, fontWeight: 'bold', marginBottom:50 }}>
          {category}({count})
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '20px', flexWrap: 'wrap', margin: 0 }}>
          {(productsByCategory[category] || []).map(product => (
            <li
              onClick={() => handleProductClick(product)}
              className="car-box"
              key={product.id}
              style={{ width: '25%', cursor: 'pointer', padding:20, backgroundColor: selectedProduct?.id === product.id ? 'rgb(246, 243, 242)' : 'transparent' }}
            >
              <img src={product.image} alt={product.name} style={{ width: '100%', height:'50%', objectFit: 'contain' }} />
              <div style={{ textAlign: 'center', padding: '25px 15px 0 15px' }}>
                <h4 style={{ fontWeight: 'bold', marginTop: 17 }}>{product.name}</h4>
                <p style={{ fontWeight: 'bold', color: '#666', margin:0 }}>
                  {Number(product.price).toLocaleString()} 만원 ~
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* 하단에 디테일 표시 */}
      
      {selectedProduct && (
        <div ref={detailRef} style={{ width: '100%', backgroundColor: '#f6f3f2', margin:'0 auto', padding:0, marginBottom:100}}>
          <div style={{maxWidth:1000, margin:'0 auto'}}>
            <button
  onClick={() => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
  style={{ float: 'right', marginTop: 20 }}
  className="product-x"
>
  <img src="img/x-btn.png" alt="닫기" />
</button>

          </div>
          <ProductDetail product={selectedProduct} />
          
        </div>
      )}
    </div>
  );
}
