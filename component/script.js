const arrPic = [
  "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/ev.png?raw=true",
  "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/ev.png?raw=true",
  "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/ev.png?raw=true",
  "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/ev.png?raw=true",
  "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/ev.png?raw=true",
  "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/ev.png?raw=true",
  "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/ev.png?raw=true",
  "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/ev.png?raw=true",
];
const center = document.querySelector(".list-item");
const btnAutoRotate = document.querySelector(".btn-auto-rotate");

arrPic.forEach((item) => {
  const elLi = document.createElement("li");
  elLi.classList.add("card-list");
  elLi.innerHTML = `<img src="${item}" alt="">`;
  center.appendChild(elLi);
});

const items = document.querySelectorAll(".card-list");

const radius = (items[0].offsetWidth * items.length) / 3.14 / 2;

items.forEach((item, index) => {
  item.style.transform = `rotateY(${
    (360 / items.length) * index
  }deg) translateZ(${radius}px)`;
});

const angle = 360 / items.length;
let currAngle = 0;

const cardList = document.querySelectorAll(".card-list");

let autoRotateMouseCheck = false;
cardList.forEach((element) => {
  element.addEventListener("mouseover", () => {
    console.log(autoRotateMouseCheck);
    autoRotateMouseCheck = false;
  });
  element.addEventListener("mouseout", () => {
    console.log(autoRotateMouseCheck);
    autoRotateMouseCheck = true;
  });
});

btnAutoRotate.addEventListener("click", () => {
  autoRotateMouseCheck = true;
  autoRotate();
});

function autoRotate() {
  console.log("running");
  if (autoRotateMouseCheck) {
    currAngle += angle;
    center.style.transform = `rotateY(${currAngle}deg)`;
    center.style.transition = "1s";
    setTimeout(autoRotate, 2000);
  } else {
    setTimeout(autoRotate, 1000);
  }
}

document.addEventListener("click", function (event) {
  // 화면 오른쪽을 눌렀을 경우
  if (window.innerWidth / 2 < event.clientX) {
    currAngle += angle;

    // 화면 왼쪽을 눌렀을 경우
  } else {
    currAngle -= angle;
  }
  center.style.transform = `rotateY(${currAngle}deg)`;
  // center.style.left = "50%";
});
