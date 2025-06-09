import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import './main.css';

import { Pagination, Autoplay, Navigation } from 'swiper/modules';

const Home = () => {
  const imageRefs = useRef([]);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  const replayAnimation = () => {
    imageRefs.current.forEach((img) => {
      if (img) {
        img.classList.remove("image-slide-in");
        // 강제로 reflow 발생시켜 animation 재시작 가능하게 함
        void img.offsetWidth;
        img.classList.add("image-slide-in");
      }
    });
  };

  const eventList = [
    {
      img: "/img/event1.png",
      title: "현대인증중고차 트레이드-인 6월 혜택",
      desc: "신차 구매 시 특별한 할인 혜택을 받아보세요.",
      date: "2025-05-30 ~ 2025-06-30"
    },
    {
      img: "/img/event2.jpg",
      title: "현대닷컴 온라인 견적 이벤트",
      desc: "개별소비세 30% 인하 혜택의 마지막 기회!",
      date: "2025-06-02 ~ 2025-06-30"
    },
    {
      img: "/img/event3.jpg",
      title: "6월 전용카드 신차 구매 혜택",
      desc: "6월 전용카드의 특별한 시나 구매 혜택을 확인해 보세요.",
      date: "2025-05-30 ~ 2025-06-30"
    },
    {
      img: "/img/event4.jpg",
      title: "현대닷컴 6월 구매후기 이벤트",
      desc: "현대자동차를 구매했다면? 현대닷컴만의 이벤트 놓치지 마세요!",
      date: "2025-06-02 ~ 2025-06-30"
    },
    {
      img: "/img/event5.jpg",
      title: "2025 SUV SUMMER DRIVE",
      desc: "전국 전시장에 방문하면 3박4일 SUV 시승권과 푸짐한 경품이!",
      date: "2025-06-02 ~ 2025-06-15"
    },
    {
      img: "/img/event6.jpg",
      title: "Trip to Okinawa 프로모션",
      desc: "현대 EV 구매하고, 오키나와 여행 즐기기",
      date: "2025-05-13 ~ 2025-12-31"
    }
  ];

  // 유틸 함수: 배열을 사이즈별로 그룹화
  const chunkArray = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  // Viewport 기준에 따라 슬라이드 묶음 크기를 설정
  const getSlideGroupSize = () => {
    const width = window.innerWidth;
    if (width < 500) return 1;
    if (width < 768) return 2;
    return 3;
  };

  const [groupedSlides, setGroupedSlides] = useState(chunkArray(eventList, getSlideGroupSize()));

  // 반응형: 창 크기 바뀔 때 그룹 다시 생성
  useEffect(() => {
    const handleResize = () => {
      setGroupedSlides(chunkArray(eventList, getSlideGroupSize()));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);




  return (
    <div style={{ paddingBottom: 100, minWidth:390 }}>
      <div style={{ width: '100%' }} className="home-container">
        <Swiper
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper banner-swiper"
          onSlideChange={replayAnimation}
        >
          <SwiperSlide className="banner" style={{ backgroundColor: 'transparent' }}>
            <div className="banner-top" style={{ marginTop: 0, width: '100%' }}>
              <h2 style={{ paddingLeft: 200, textAlign: 'left', fontSize: 60 }}>GRANDEUR</h2>
              <p style={{ paddingLeft: 200, textAlign: 'left', fontSize: 37 }}>Outclass GRANDEUR</p>
            </div>
            <div className="car-img" style={{ width: '100%', marginBottom: 100, marginTop: '' }}>
              <img
                ref={(el) => (imageRefs.current[0] = el)}
                src="/img/banner2.png"
                className="image-slide-in"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="banner" style={{ backgroundColor: 'transparent' }}>
            <div className="banner-top" style={{ marginTop: 0, width: '100%' }}>
              <h2 style={{ paddingLeft: 200, textAlign: 'left', fontSize: 60 }}>IONIQ 5</h2>
              <p style={{ paddingLeft: 200, textAlign: 'left', fontSize: 37 }}>내가 선택한 단 하나의 전기차</p>
            </div>

            <div className="car-img" style={{ width: '100%', marginBottom: 100, marginTop: '' }}>
              <img
                ref={(el) => (imageRefs.current[1] = el)}
                src="/img/banner1.jpg"
                alt="IONIQ 5"
                className="image-slide-in"
                style={{ width: 'auto', maxWidth: '100%' }}
              />
            </div>
          </SwiperSlide>

          <SwiperSlide className="banner" style={{ backgroundColor: 'transparent' }}>
            <div className="banner-top" style={{ marginTop: 0, width: '100%' }}>
              <h2 style={{ paddingLeft: 200, textAlign: 'left', fontSize: 60 }}>KONA</h2>
              <p style={{ paddingLeft: 200, textAlign: 'left', fontSize: 37 }}>새로운 차원의 플레이</p>
            </div>
            <div className="car-img" style={{ width: '100%', marginBottom: 100, marginTop: '' }}>
              <img
                ref={(el) => (imageRefs.current[2] = el)} // ✅ 첫 번째 슬라이드 이미지 ref 등록
                src="/img/banner3.png"
                className="image-slide-in"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide className="banner" style={{ backgroundColor: 'transparent' }}>
            <div className="banner-top" style={{ marginTop: 0, width: '100%' }}>
              <h2 style={{ paddingLeft: 200, textAlign: 'left', fontSize: 60 }}>AVANTE</h2>
              <p style={{ paddingLeft: 200, textAlign: 'left', fontSize: 37 }}>지금, 더 매력적인</p>
            </div>
            <div className="car-img" style={{ width: '100%', marginBottom: 100, marginTop: '' }}>
              <img
                ref={(el) => (imageRefs.current[3] = el)} // ✅ 첫 번째 슬라이드 이미지 ref 등록
                src="/img/banner4.png"
                className="image-slide-in"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide className="banner" style={{ backgroundColor: 'transparent' }}>
            <div className="banner-top" style={{ marginTop: 0, width: '100%' }}>
              <h2 style={{ paddingLeft: 200, textAlign: 'left', fontSize: 60 }}>CASPER Electric</h2>
              <p style={{ paddingLeft: 200, textAlign: 'left', fontSize: 37 }}>전력을 다해, CASPER Electric</p>
            </div>
            <div className="car-img" style={{ width: '100%', marginBottom: 100, marginTop: '' }}>
              <img
                ref={(el) => (imageRefs.current[4] = el)} // ✅ 첫 번째 슬라이드 이미지 ref 등록
                src="/img/banner5.png"
                className="image-slide-in"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div style={{ maxWidth: 1448, width: '100%', margin: '0 auto', marginTop: 100 }}>
        <h2 style={{ textAlign: 'center', fontSize: 44, marginBottom: 20 }}>Events</h2>
        <p style={{ textAlign: 'center', fontSize: 16, color: '#666' }}>
          고객님을 위한 스페셜한 이벤트를 통해 즐거운 행운과 경품을 만나보세요.
        </p>

        <Swiper
          className="event-swiper"
          pagination={{ clickable: true }}
          loop={true}
          navigation={true}
          modules={[Pagination, Navigation]}
          spaceBetween={20}
        >
          {groupedSlides.map((group, idx) => (
            <SwiperSlide key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20 }}>
                {group.map((event, i) => (
                  <div key={i} style={{ flex: 1, background: '#fff', borderRadius: 10, padding: 15 }}>
                    <img src={event.img} alt={event.title} style={{ width: '100%' }} />
                    <h3 style={{ fontSize: 20, margin: '15px 0', fontWeight: 'bold', color: '#000' }}>{event.title}</h3>
                    <p style={{ fontSize: 16, color: '#666' }}>{event.desc}</p>
                    <p style={{ fontSize: 16, color: '#666', marginBottom: 50 }}>{event.date}</p>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>



      </div>

    </div>
  );
};

export default Home;
