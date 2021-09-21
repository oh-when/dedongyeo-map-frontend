# 데동여지도 dedongyeo-map

연인들이 데이트 장소를 기록하고 코스를 저장할 수 있는 데동여지도의 웹 프론트엔드 레포입니다.


## 실행하기

### 패키지 설치

```bash
npm install --save
# or
yarn
```

### 개발 서버 실행
```bash
npm run dev
# or
yarn dev
```

### 빌드
```bash
npm run build
# or
yarn build
```

## 기술 스택

### Frameworks & Languages
- Next.js 10.X
- React.js 17.X
- TypeScript 4.X

### Libraries & Third Party
- GraphQL
- Apollo Client
- styled-components
- Mapbox

### Infra
- GCP
- Docker

## 주요 기능

### 홈 화면, 스팟 페이지 (/)
- 스팟 검색하기
- 검색한 스팟에 스티커 추가하기
- 커스텀 스팟 생성하기
- 당도 기반으로 필터링 하기
- 지역 기반 실시간 채팅

### 코스 화면, (/course)
- 날짜별로 코스 히스토리 조회하기
- 만들었던 스팟 기반으로 코스를 생성하기
- 생성한 코스 공유하기

### 마이페이지
- 로그인/회원가입
- 개인 정보 수정
