# **크롤링**

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