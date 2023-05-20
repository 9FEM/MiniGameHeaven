const splashImg = document.querySelector(".slpash-box");
const splashBtn = document.querySelector(".btn-splash");
const cardList = document.querySelector(".list-wrapper");
splashBtn.addEventListener("click", () => {
  splashImg.classList.add("act");
  splashImg.style.transition = "1s ease-in-out";
  setTimeout(() => {
    splashImg.remove();
  }, 1000);
  cardList.style.animation = "fadeIn 2s";
});
