const splashImg = document.querySelector(".img-splash");
const cardList = document.querySelector(".list-item");
const test = document.querySelector(".test");
// splashImg.addEventListener("click", () => {
//   splashImg.style.opacity = "0";

//   splashImg.style.transition = "2s";
//   cardList.style.animation = "fadeIn 3s";

//   // cardList.style.opacity = "1";
//   cardList.style.transition = "0.5s";
//   //   cardList.style.transform = `transLate(-50%, -50%)`;
//   // cardList.style.transform = `transLateY(0)`;
// });

test.addEventListener("click", () => {
  cardList.style.animation = "fadeIn 2s";
  // cardList.style.transition = "0.5s";
});
