# **소설 리뷰 & 플랫폼 정보 스크랩퍼**

## Blog
[**jh-L Blog**](bya2.github.io)


## 0. Consider

### Crawling API
1. Scope
2. DB 동작 최소화
{: .notice}

## 1. Plan
> 일정 시간마다 업데이트된 최신 리뷰 스크랩  
  MongoDB 중첩된 객체 스키마 사용 여부 결정  
  Express 라우트 (최신 리뷰, 아이디 별 작품, 그에 대한 플랫폼 정보)  
  Handlebars (index.hbs, product.hbs, platforms.hbs) 작성 및 수정

## 2. Progress

### 화면
**Browser**  
![Screenshot (1)](https://user-images.githubusercontent.com/61080445/131825028-21081fc4-dbe7-4fb8-89a4-2330367a932b.png)

**MongoDB Compass**  
![image](https://user-images.githubusercontent.com/61080445/132224595-6ae78bb8-9005-4075-b8d2-63116ea2dc84.png)

![Comments](https://user-images.githubusercontent.com/61080445/132225757-c04e2927-e987-48c8-9832-173774884b23.PNG)

![Products](https://user-images.githubusercontent.com/61080445/132225723-05a3a483-43de-4181-943d-59ddcc0cd0bf.png)

### 실행 
- Command
```sh
$ npm run scrap
```
- Files
```
./db.js
./models/
./controller/selectors.js
./controller/apiController.js
./scrap/index.js (main)
```
- Results
```
./TEST/temp/tmpCObjs.json 
./TEST/temp/tmpPObjs.json
```


#### 최신 리뷰 페이지
```
./controller/apiController.funcCommentsPage
./scrap/index.js (실행)
```
- [**링크1 ↓**](https://github.com/bya2/simple-crawling/tree/main/TEST/temp/each/cObjs.json)
- [**링크2 ↓**](https://github.com/bya2/simple-crawling/tree/main/TEST/temp/each/pObjs.json)
```js
1. ./TEST/temp/each/cObjs.json
2. ./TEST/temp/each/pObjs.json
```

#### 해당 작품 페이지
```
./controller/apiController.funcProductPage
./scrap/index.js (실행)
```
- [**링크1 ↓**](https://github.com/bya2/simple-crawling/tree/main/TEST/temp/each/bcObjs.json)
- [**링크2 ↓**](https://github.com/bya2/simple-crawling/tree/main/TEST/temp/each/pfArrs.json)
```js
1. ./TEST/temp/each/bcObjs.json
2. ./TEST/temp/each/pfArrs.json

```

#### 각 플랫폼 페이지
```
./controller/apiController.funcPlatformPage
./scrap/index.js (실행)
```
- [**링크 ↓**](https://github.com/bya2/simple-crawling/tree/main/TEST/temp/each/pfArrs1.json)
```js
./TEST/temp/each/pfArrs1.json
```