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
const listItem = document.querySelector(".list-item");
const cardList = document.querySelectorAll(".card-list");

arrPic.forEach((item) => {
  const elLi = document.createElement("li");
  elLi.classList.add("card-list");
  elLi.innerHTML = `<img src="${item}" alt="">`;
  listItem.appendChild(elLi);
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

const btnAutoRotate = document.querySelector(".btn-auto-rotate");

const containerList = Array.from(listItem.children);
const carouselLength = listItem.children.length;

let centerCell =
  carouselLength % 2 !== 0
    ? listItem.children[parseInt(carouselLength / 2)]
    : listItem.children[carouselLength / 2 - carouselLength / 2];
centerCell.style.backgroundColor = "red";

//자동회전 마우스 호버처리.
let autoRotateMouseCheck = false;
containerList.forEach((element) => {
  console.log(autoRotateMouseCheck);

  element.addEventListener("mouseover", () => {
    console.log(autoRotateMouseCheck);
    autoRotateMouseCheck = false;
  });
  element.addEventListener("mouseout", () => {
    console.log(autoRotateMouseCheck);
    autoRotateMouseCheck = true;
  });
});

let toggleAutoRotate = false;

//자동회전 시작 버튼.
btnAutoRotate.addEventListener("click", () => {
  autoRotateMouseCheck = true;
  if (!toggleAutoRotate) {
    btnAutoRotate.textContent = "Stop!!";
    toggleAutoRotate = true;
    autoRotate();
  } else {
    btnAutoRotate.textContent = "Running!!";

    toggleAutoRotate = false;

    autoRotate();
  }
});

//자동회전함수
function autoRotate(start) {
  console.log("running");
  if (toggleAutoRotate) {
    if (autoRotateMouseCheck) {
      getCenterCell(false);
      currAngle += angle;
      listItem.style.transform = `rotateY(${currAngle}deg)`;
      listItem.style.transition = "1s";
      setTimeout(autoRotate, 2000);
    } else {
      setTimeout(autoRotate, 1000);
    }
  } else {
    return;
  }
}

//CenterCell 찾는 로직.
for (let i = 0; i < containerList.length; i++) {
  console.log("?");
  containerList[i].setAttribute("id", i);
}
// getCenterCell();
let centerCount = 0;
function getCenterCell(selectedBtn) {
  if (selectedBtn) {
    centerCell = listItem.children[++centerCount];

    if (centerCount > 7) {
      centerCount = -1;

      centerCell = listItem.children[++centerCount];
    }
    // console.log(centerCount);
    // console.log(centerCell);
  } else {
    centerCell = listItem.children[--centerCount];

    if (centerCount < 0) {
      centerCount = 8;
      centerCell = listItem.children[--centerCount];
    }
    // console.log(centerCount);
    // console.log(centerCell);
  }
  centerCell.style.backgroundColor = "red";

  containerList.forEach((el) => {
    console.log(el.id);
    console.log("centerCell" + centerCell.id);
    if (el.id !== centerCell.id) {
      el.style.backgroundColor = "white";
    }
  });
}

//버튼으로 처리하거나 card-list로 수정해줘야함.
document.addEventListener("click", function (event) {
  // 화면 오른쪽을 눌렀을 경우
  if (window.innerWidth / 2 < event.clientX) {
    currAngle += angle;
    getCenterCell(false);

    // 화면 왼쪽을 눌렀을 경우
  } else {
    currAngle -= angle;
    getCenterCell(true);
  }
  listItem.style.transform = `rotateY(${currAngle}deg)`;
  // center.style.left = "50%";
});
