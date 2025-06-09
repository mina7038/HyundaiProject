import { HiChevronRight } from 'react-icons/hi';
import "./main.css";

export default function ProductDetail({ product }) {

    if (!product) return <div style={{ padding: 20 }}>로딩 중...</div>;

    return (
        <div className="cardetail" style={{ maxWidth: 1000, width:'100%', padding: '62px 30px', margin: '0 auto' }}>
            <div className="detail-box" style={{display: 'flex', gap:'40px' }}>
                <div>
                    <p className="detail-desc" style={{ fontSize: 25, fontWeight:'bold', marginBottom:5 }}>{product.description}</p>
                    <h1 className="detail-name" style={{fontSize:40, fontWeight:'bold'}}>{product.name}</h1>
                    <p className="detail-hide" style={{color:'#002c5f', marginTop:20}}>자세히보기<HiChevronRight style={{ fontSize: 16, marginLeft: 4 }} /></p>
                    <div className="detail-none" style={{width:'100%'}}>
                        {product.image && (
                        <img
                            src={product.detail}
                            alt={product.name}
                            style={{ maxWidth: '100%', height:'100%'}}
                        />

                    )}
                    </div>
                    <p style={{marginBottom:5, color:'#666',}}>세제 혜택 후 가격</p>
                    <p style={{ fontWeight: 'bold', fontSize:20 }}>{Number(product.price).toLocaleString()} 만원 ~</p>
                </div>
                <div className="detail-image" style={{maxWidth:550, width:'100%', height:'100%'}}>
                    {product.image && (
                        <img
                            src={product.detail}
                            alt={product.name}
                            style={{ maxWidth: '100%', height:'100%'}}
                        />

                    )}
                </div>
            </div>
            <div className="" style={{marginTop:20}}>
                    <button className="btn detail-btn" style={{backgroundColor:'#002c5f', color:'white', borderRadius:0, textAlign:'center', width: 'calc(33.33333% - 26.66667px)', marginRight:40, height: 50}}>구매 상담 신청</button>
                    <button className="btn detail-btn btn2" style={{backgroundColor:'#002c5f', color:'white', borderRadius:0, textAlign:'center', width: 'calc(33.33333% - 26.66667px)', height: 50}}>내 차 만들기</button>
                </div>
        </div>
    );
}
