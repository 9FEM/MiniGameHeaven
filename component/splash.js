const splashImg = document.querySelector(".img-splash");
const cardList = document.querySelector(".list-item");

splashImg.addEventListener("click", () => {
  //   splashImg.style.zIndex = "-1";
  //   splashImg.style.display = "none";
  splashImg.style.opacity = "0";
  //   splashImg.style.transitionduration = "3s";
  splashImg.style.transition = "2s";
  cardList.style.animation = "fadeIn 2s linear 0s";
  //   cardList.style.transition = "5s";
  cardList.style.opacity = "1";
  //   cardList.style.transform = `transLate(-50%, -50%)`;
});

// cardList.addEventListener("click", () => {
//     cardList.style
// })
