# 업비트 Open Api 이용 가격표 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## 실행

- yarn install -> yarn start



## 사용 api

- https://api.upbit.com/v1/market/all
- https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH





## 구현 기능리스트

- [x] 각 마켓별 시세 표시

- [x] 테이블 헤더부분 영문/한글명 전환 
- [x] 현재가, 전일대비, 거래대금 정렬
- [x] 현재가와 이전 가격 비교해서 상승,하락 색상 애니메이션 효과
- [x] 거래대금 백만 단위로 표시
- [ ] 코인명 왼쪽 미니 봉차트 구현x





## 데이터 흐름도

![paint](https://user-images.githubusercontent.com/62460298/148898220-f4e506a5-dc6e-4373-9d19-ce92a13604eb.png)





## 폴더 구조

```bash
├── src/
│   ├── api/
│   │   ├── api.ts        			- price / ticker 호출
│   │
│   ├── component/               - view component 폴더
│   │   ├── LodingSpinner.tsx    	 - 로딩 스피너 파일
│   │   ├── MarketView.tsx         - 시세표 테이블

│   ├── container/               - logic 폴더
│   │   ├── MarketContainer.tsx    - view 폴더 보내기전 로직처리 파일

│   ├── hook/
│   │   ├── useInterval.ts     		- 5초 간격 가격 api 호출
│ 	│   ├── usePrevious.ts				- 이전 데이터 값 저장 및 비교 (현재가 효과)

│   ├──  model/            				- api 응답 값 타입
│   │   ├── MarketPrice.ts     			- price api response 타입
│   │		├── MarketTicker.ts					- ticker api response 타입

│   ├──  service/            			- 데이터 가공 폴더
│   │   ├── requestMarketPrice.ts   - price 응답값 가공
│ 	│		├── requestMarketTicker.ts	- ticker 응답값 가공

│   ├──  type/            				- 타입 폴더
│   │    ├── type.ts     						- 각 필요 타입 선언

│   ├── index.tsx            			- 진입점
```
