const clock = document.querySelector(".h1-clock");

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