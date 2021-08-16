# **크롤링**

## 0816

### **Today**
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