# Django-React 개인 프로젝트 - 현대 자동차

## 목차

- [개요](https://github.com/mina7038/CPGN-project#-개요)
- [기술 스택](https://github.com/mina7038/CPGN-project#-기술-스택)
- [프로젝트 설계](https://github.com/mina7038/CPGN-project#-프로젝트-설계)
- [주요 기능](https://github.com/mina7038/CPGN-project#-주요-기능)
- [기능 구현](https://github.com/mina7038/CPGN-project#-기능-구현)

## **🚩 개요**

- **프로젝트 목표**
    - **Django + React** 기반의 풀스택 웹 애플리케이션 개발
    - 현대자동차 웹사이트를 참고하여 메인 페이지, 공지사항, 1:1 문의, 자료실, 챗봇, 차량 모델·상세, 관리자 페이지를 구현한 클론 프로젝트
- **진행 기간** : 2025.06.02 ~ 2025.06.09. (1주일)

## **🛠️ 기술 스택**

- Language: Python (3.10), JavaScript (ES6+)
- Framework: Django (5.x), Django REST Framework (DRF), React (19.x), Bootstrap (3.x)
- Database: MySQL (8.x)
- Server: Git, Node.js
- Tool: VS Code
- API: OpenAI API (챗봇)

## **📝 프로젝트 설계**

- 요구사항 명세서

    <img width="697" height="501" alt="image (11)" src="https://github.com/user-attachments/assets/ebc0f9b5-ed77-436c-a72f-97ba043043bd" />

- ERD

    <img width="1307" height="788" alt="erd" src="https://github.com/user-attachments/assets/e5072173-8b87-4b34-b36f-277eef492c18" />


## **✨ 주요 기능**
1. **메인 페이지**
   - 최신 차량 모델 배너, 이벤트 정보를 한눈에 볼 수 있는 랜딩 페이지 구현
   - 반응형 레이아웃 적용으로 다양한 기기 환경에 대응

<img width="1898" height="2294" alt="hyundai-full" src="https://github.com/user-attachments/assets/750cd110-acf4-4759-a0af-ee2e9ccace80" />
<img width="1920" alt="localhost_3000_(iPhone 6_7_8)" src="https://github.com/user-attachments/assets/fe19a148-fa38-4469-af72-ddbaf32ce3d2" />


2. **모델 페이지**
   - 모든 차량 모델을 카테고리별로 카드형 UI로 표시
   - 가격, 이미지, 모델명을 직관적으로 제공
   - 반응형 레이아웃 적용으로 PC·모바일 환경 지원

3. **모델 상세 페이지**
   - 선택한 차량의 이미지, 가격, 주요 정보를 상세히 제공
   - 직관적인 레이아웃과 시각 요소로 차량 특징을 강조
   - 반응형 디자인 적용으로 다양한 기기에서 최적의 UI 제공

4. **공지사항**
   - 최신 공지사항 목록 표시 및 상세 내용 확인 가능

5. **1:1 문의**
   - 사용자 문의 작성 및 제출 기능
   - 관리자 답변 실시간 반영 UI

6. **챗봇**
   - OpenAI API 기반 챗봇 구현
   - 실시간 응답과 상호작용을 통한 사용자 경험 강화

7. **관리자 페이지**
   - 회원, 모델, 공지사항, 문의, 자료실을 한 화면에서 관리할 수 있는 관리자 UI

## **🎬 기능 구현**

### ✔ 회원가입/로그인
- **약관 동의**
    - 약관 동의 후, 아이디 중복 확인 및 비밀번호 설정 단계 진행.
- **아이디 중복 체크**
    - 회원가입 시 입력한 아이디가 기존 사용자 데이터베이스에 존재하는지 확인.
    - 중복 시 경고 메시지를 보여주고, 다른 아이디 입력을 유도.
- **비밀번호 일치 확인**
    - 비밀번호와 비밀번호 확인(Confirm Password) 입력값을 비교.
    - 불일치 시 오류 메시지를 출력하여 재입력 요구.
 
![Adobe Express - hd-user](https://github.com/user-attachments/assets/388f2e72-eb94-4fe5-bc58-d9afee666ec0)
 
### ✔ 모델 등록/수정/삭제
- **등록**: 관리자 권한으로 새로운 모델 등록.

![Adobe Express - hd-car](https://github.com/user-attachments/assets/69835806-c684-45b2-9e1c-dcbc9e6911c8)

- **수정**: 기존 모델 내용 업데이트.
- **삭제**: 불필요한 모델 제거.

![Adobe Express - hd-car2](https://github.com/user-attachments/assets/9ad20d54-a400-4f4a-85d8-7717adcdcf79)


### ✔ 공지사항 등록/수정/삭제

- **등록**: 관리자 권한으로 새로운 공지 작성.
- **수정**: 기존 공지 내용 업데이트.
- **삭제**: 불필요한 공지 제거.

![Adobe Express - hd-notice](https://github.com/user-attachments/assets/e0e932c2-c90c-4b22-8b6a-00d0541c6e06)

### ✔ Q&A 등록

- **등록**: 사용자가 질문 작성.

![Adobe Express - hd-qna (1)](https://github.com/user-attachments/assets/6ef6ef0f-c5e4-4c2b-9c87-0ad6f19939e0)

### ✔ 관리자 **Q&A** 답변 등록 및 질문 삭제

- **답변 등록**: 관리자가 사용자 질문에 대한 답변 작성.
- **질문 삭제**: 불필요하거나 잘못된 질문 삭제.

![Adobe Express - hd-qna-ans](https://github.com/user-attachments/assets/3a25eeb1-f4ea-4299-b8a7-4b4643ae17b9)

### ✔ 자료실 자료 등록/수정/삭제

- **등록**: 관리자 권한으로 새로운 자료실 자료 등록.

![Adobe Express - hd-data1](https://github.com/user-attachments/assets/67c0f80d-35a7-43da-a48a-7483243a23f6)


- **수정**: 기존 자료실 내용 업데이트.
- **삭제**: 불필요한 공지 제거.

![Adobe Express - hd-data2](https://github.com/user-attachments/assets/19ee3ef2-eda5-4cef-8ca6-4ec2cdde3abb)


### ✔ **관리자 페이지**

- 좌측 사이드바로 공지사항, 회원, 상품, Q&A, 자료실 기능을 직관적으로 탐색 가능

![Adobe Express - hd-admin](https://github.com/user-attachments/assets/ecfd5639-1a29-415e-bb91-226b96c5588b)

  
