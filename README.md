# IOTPLEX 4GUARD MOBILE

**프로젝트 셋팅**

-   project setting : CRA 사용

-   mock data : msw사용 (service worker사용) [https://mswjs.io/](https://mswjs.io/)

-   msw를 사용못하는 환경일 경우(서비스워커 사용불가 브라우저) : mock api server(express)도 같이 넣어두었습니다.

    1.  index.js에서 msw관련 import 및 source코드 주석후
    2.  package.json에 "proxy": "http://localhost:5000" 추가후
    3.  back폴더내부에서 npm start로 mock api 서버도 같이 실행

---

**사용한 플러그인 리스트 & docs**

1. Bottom sheat : [https://react-spring.bottom-sheet.dev/](https://react-spring.bottom-sheet.dev/)

2. Scroll Picker: [https://github.com/dsmalicsi/react-mobile-picker-scroll](https://github.com/dsmalicsi/react-mobile-picker-scroll)

3. Input Mask : [https://github.com/sanniassin/react-input-mask](https://github.com/sanniassin/react-input-mask)

4. Datepicker : [https://mymth.github.io/vanillajs-datepicker/](https://mymth.github.io/vanillajs-datepicker/)

5. SWR : [https://swr.vercel.app/ko](https://swr.vercel.app/ko)

6. Swiper React : [https://swiperjs.com/react](https://swiperjs.com/react)

---

npm start : 테스트 서버 실행
