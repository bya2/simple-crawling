# **소설 리뷰 & 플랫폼 정보 스크랩퍼**

## Plan
```
> 일정 시간마다 업데이트된 최신 리뷰 스크랩 (setInterval or new Date)
> MongoDB 중첩된 객체 스키마 사용 여부 결정
> Express 라우트 (최신 리뷰, 아이디 별 작품, 그에 대한 플랫폼 정보)
> Handlebars (index.hbs, product.hbs, platforms.hbs) 작성 및 수정
```

## Progress

### 최신 리뷰 페이지
```
./controller/apiController.funcCommentsPage
./scrap/index.js (실행)
```
- [**링크1 ↓**](https://github.com/bya2/simple-crawling/tree/main/TEST/temp/commentObjs.json)
- [**링크2 ↓**](https://github.com/bya2/simple-crawling/tree/main/TEST/temp/productObjs.json)
```js
// 결과
./TEST/temp/commentObjs.json
./TEST/temp/productObjs.json
```

### 해당 작품 페이지
```
./controller/apiController.funcProductPage
./scrap/index.js (실행)
```
- [**링크1 ↓**](https://github.com/bya2/simple-crawling/tree/main/TEST/temp/bestComments.json)
- [**링크2 ↓**](https://github.com/bya2/simple-crawling/tree/main/TEST/temp/platformsArr.json) (아직 구현 안된 링크)
```js
// 결과
./TEST/temp/bestComments.json
./TEST/temp/platformsArr.json (아래 이 정보와 플랫폼 내 정보가 통합된 정보가 있으므로 조금 나중에 만들 예정)

```

### 각 플랫폼 페이지
```
./controller/apiController.funcPlatformPage
./scrap/index.js (실행)
```
- [**링크 ↓**](https://github.com/bya2/simple-crawling/tree/main/TEST/temp/platformInfos.json)
```js
// 결과
./TEST/temp/platformInfos.json
```

## Test

### 페이지 다른 함수에서 생성
```
./TEST/singlePage/bestComment.js (코드 복사)
./TEST/singlePage/newPage.js
./TEST/index.js (실행)
```
```js
// 결과
// 정상적으로 실행, 종료
{
  commentId: 'comment-26232',
  nickname: 'hanaaa',
  content: '난 너무 재밌게 봤음<br>이거 보고 KEN작가님꺼 좋아 ...',
  rate: '5.0',
  updated: '2020년 7월 31일 02:29',
  good: '1',
  bad: '0'
}
```

### productPage: 플랫폼
```
./controller/apiController/productPage/index.js
./TEST/singlePage/getPlatforms.js
./TEST/index.js (실행)
```
```js
[
  {
    name: '카카오페이지',
    url: 'https://page.kakao.com/home?seriesId=52329538'
  },
  {
    name: '네이버시리즈',
    url: 'https://series.naver.com/novel/detail.nhn?productNo=3947957'
  }
]
```


### productPage: 베스트 코멘트
```
./TEST/singlePage/bestComment.js
./TEST/index.js (실행)
```
```js
{
  commentId: 'comment-26232',
  nickname: 'hanaaa',
  content: '난 너무 재밌게 봤음<br>이거 보고 KEN작가님꺼 좋아 ...',
  rate: '5.0',
  updated: '2020년 7월 31일 02:29',
  good: '1',
  bad: '0'
}
```

## 0901
**암시적 바인딩**  
모듈을 객체 안에 저장하고, 그 안에서 this를 통해서 활성화 객체 안에서 사용
```js
const module = require('module')
const obj = {
  module: module;
  func: function () {
    this.module.Method();
  }
}
```

**switch 문 대체**  
조건에 맞는 배열의 인덱스를 찾고, 인덱스에 해당하는 함수 호출
```js
const arr1 = ['a', 'b', 'c'];
const arr2 = [fn1, fn2, fn3];

... map(obj => {
  const idx = arr1.findIndex(el => el === obj.property);
  arr2[idx]();
})
```




```


## 0828

**Commit 취소**  
이전에 커밋하지 않았던 모든 파일이 날아가므로 주의 할 것
```sh
git reset --hard HEAD^
```



## 0819

### **To-Do**

**Contents and Design**
![화면](https://user-images.githubusercontent.com/61080445/130092549-d25c1a70-98d1-4868-bd77-b1a3e8532106.png)

**Test**
![image](https://user-images.githubusercontent.com/61080445/130008906-14b3aeb2-1c01-4b65-8b3f-f9d613b2e369.png)

### **Learn**
Handlebars
```hbs
<!-- 2차원 배열 -->
{{#each rows}}
  <tr>
    {{#each this as |row|}}
      <td>
        {{this}}
      </td>
    {{/each}}
  </tr>
{{/each}}
```

## 0817

### **Learn**
즉시 실행 함수 (Immediately-invoked function expression)
```js
// 비동기 즉시 실행 함수
(async () => {
  ...
})();
```

jQuery: this 처리
```js
$ul.each(async (i, e) => {
    const el = $(this);
    console.log(el); // undefined
}

// Arrow function에서 this는 Window 객체를 참조
```
```js
// 이벤트가 발생하는 경우
$ul.on('click', e => {
  const el = $(e.currentTarget);
  ...
})

// 이벤트가 발생하지 않는 경우
$ul.each('click', e => {
  const el = $(e);
  ...
})
```


### **Problem**
403 forbidden


## 0816

### **Learn**
Axios
```js
// Axios를 이용해서 비동기로 해당 URL의 HTML 문자열을 반환
const getHtml = async url => {
  try {
    return await axios.get(url);
  } catch (err) {
    console.error('Error in get method of axios:\n', err.message);
  }
}
```

Enumerable 속성 [key, value] 반환
```js
for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}

// Object.entries를 이용하여 key, value 값으로 for문 작성
```


### **Problem**
Promise
```js
getHtml(url).then(html => {
  ... // Promise 객체로 콜백함수 처리
      // 내부에서도 비동기적으로 처리됌
}
```

jQuery 메소드
```js
$ulList.each((i, el) => {
  ... // Arrow function 이용시 $(this)나 el 모두 null
})
```

내장 함수
```js
const url = encodeURI($(this).find('a').attr('href'));

// URL에 한글이나 띄어쓰기 등 적절치 않은 문자가 있을 경우
```