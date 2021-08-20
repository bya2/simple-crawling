// Hide (Header-Inner)
const headerInner = document.querySelector('.header-inner');

let isInner = false;
let displayInner = false;

document.addEventListener('click', () => {
  if (isInner) {
    if (displayInner) {
      headerInner.style.display = 'none';
    } else {
      headerInner.style.display = 'block';
    }
  }
})

document.addEventListener('scroll', () => {
  const currScroll = document.documentElement.scrollTop;

  console.log(currScroll);

  if (!isInner && currScroll > 120) {
    headerInner.style.position = 'fixed';
    isInner = true;
  }

  if (isInner && currScroll === 0) {
    headerInner.style.position = 'absolute';
    isInner = false;
  }
});


// Clock
const clock = document.querySelector('.h1-clock');

const putZero = num => {
  return num < 10 ? `0${num}` : num;
}

const getTime = () => {
  const time = new Date();
  
  const hour = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  clock.innerHTML = `${putZero(hour)}:${putZero(minutes)}:${putZero(seconds)}`;
}

(async () => {
  setInterval(getTime, 1000);
})();