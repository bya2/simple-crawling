# **소설 리뷰 & 플랫폼 정보 스크랩퍼**

## 설명
[**`Blog`**](https://bya2.github.io)


## 고려 사항

```
스코프 범위를 고려해서 코드 작성하기,

데이터 베이스 동작 최소화,

코드는 최대한 간결하게,

기능 별로 함수로 분리,
```

## 개발 계획
```
1. AWS, Docker를 이용해서 크롤링 자동화

2. Express 라우트 (최신 리뷰, 아이디 별 작품, 그에 대한 플랫폼정보)  

4. .hbs (product.hbs) 작성

(완료) MongoDB 중첩된 객체 스키마 사용 여부 결정  
```

## 진행 상황

### 화면

#### **`Browser`**
`localhost:3000/`  
![Screenshot (7)](https://user-images.githubusercontent.com/61080445/132278292-e8cb5c18-93cd-4265-8e9c-00140e05b65b.png)

`localhost:3000/`  
![ss1](https://user-images.githubusercontent.com/61080445/132324154-19805239-1ec1-4f31-aec4-3cded1998c85.png)

`localhost:3000/96275`  
![Screenshot (8)](https://user-images.githubusercontent.com/61080445/132278406-96b6fff9-bdfa-4f44-972b-aff7faf9cb4a.png)

`localhost:3000/96275`  
![Screenshot (10)](https://user-images.githubusercontent.com/61080445/132324363-a93733fd-2e3c-4321-9429-2065c3b1e360.png)

`localhost:3000/96275`  
![ss2-2](https://user-images.githubusercontent.com/61080445/132324298-39ef1c15-9243-4416-b5a6-f4570480d166.png)

`localhost:3000/bc/96275`  
![ss3](https://user-images.githubusercontent.com/61080445/132324220-dddb871b-e2a0-469e-914e-2141ea5b84b5.png)

#### **`MongoDB Compass`**

![image](https://user-images.githubusercontent.com/61080445/132224595-6ae78bb8-9005-4075-b8d2-63116ea2dc84.png)

![Comments](https://user-images.githubusercontent.com/61080445/132225757-c04e2927-e987-48c8-9832-173774884b23.PNG)

![Products](https://user-images.githubusercontent.com/61080445/132225723-05a3a483-43de-4181-943d-59ddcc0cd0bf.png)

### 실행 

#### **애플리케이션 실행**
`- Command`
```sh
$ npm run start
```

`- Files & Functions`
```
./public/
./views/
./db.js
./models/
./routes/
./app.js (main)
```

`- Result`
```
위 브라우저 화면
```


#### **모든 페이지 스크랩**

`- Command`
```sh
$ npm run scrap
```

`- Files & Functions`
```
./db.js
./models/
./controller/selectors.js
./controller/apiController.js
./scrap/index.js (main)
```

[`- Result1↓`](https://github.com/bya2/simple-crawling/tree/main/TEST/temp/tmpCobjs.json),
[`Result2↓`](https://github.com/bya2/simple-crawling/tree/main/TEST/temp/tmpPObjs.json)
```
./TEST/temp/tmpCObjs.json 
./TEST/temp/tmpPObjs.json
```


#### 최신 리뷰 페이지
`- Files & Function`
```
./controller/apiController.funcCommentsPage
./scrap/index.js (실행)
```

[`- Result1↓`](https://github.com/bya2/simple-crawling/tree/main/TEST/temp/each/cObjs.json),
[`Result2↓`](https://github.com/bya2/simple-crawling/tree/main/TEST/temp/each/pObjs.json)
```
1. ./TEST/temp/each/cObjs.json
2. ./TEST/temp/each/pObjs.json
```

#### 해당 작품 페이지
`- Files & Function`
```
./controller/apiController.funcProductPage
./scrap/index.js (실행)
```

[`- Result1↓`](https://github.com/bya2/simple-crawling/tree/main/TEST/temp/each/bcObjs.json),
[`Result2↓`](https://github.com/bya2/simple-crawling/tree/main/TEST/temp/each/pfArrs.json)
```
1. ./TEST/temp/each/bcObjs.json
2. ./TEST/temp/each/pfArrs.json
```

#### 각 플랫폼 페이지
`- Files & Function`
```
./controller/apiController.funcPlatformPage
./scrap/index.js (실행)
```
[`- Result↓`](https://github.com/bya2/simple-crawling/tree/main/TEST/temp/each/pfArrs1.json)
```
./TEST/temp/each/pfArrs1.json
```