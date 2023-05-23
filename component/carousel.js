import GameBox from "./gameBox.js";
import Modal from "./modal.js";
const arrGame = ["SnakeGame", 2, "Drawing!", "number Up&Down", 5, 6, 7, 8];
const $listItem = document.querySelector(".list-item");
const $btnLeft = document.querySelector(".btn-left");
const $btnRight = document.querySelector(".btn-right");
const $btnAutoRotate = document.querySelector(".btn-auto-rotate");

let angle, containerList, carouselLength, centerCell;

let currAngle = 0;
let centerCount = 0;

let toggleAutoRotate = false;

initialize();

// init함수.
function initialize() {
  // Game list생성
  arrGame.forEach((item) => {
    const elLi = document.createElement("li");
    elLi.classList.add("card-list");
    elLi.innerHTML = `<div>${item}</div>`;
    $listItem.appendChild(elLi);
  });

  // 초기 centercell설정.
  containerList = Array.from($listItem.children);
  carouselLength = $listItem.children.length;
  for (let i = 0; i < containerList.length; i++) {
    containerList[i].setAttribute("id", i);
  }
  centerCell =
    carouselLength % 2 !== 0
      ? $listItem.children[parseInt(carouselLength / 2)]
      : $listItem.children[0];

  centerCellStyleChage(true);

  const cardItems = document.querySelectorAll(".card-list");

  const radius = (cardItems[0].offsetWidth * cardItems.length) / 3.14 / 2;

  cardItems.forEach((item, index) => {
    item.style.transform = `rotateY(${
      (360 / cardItems.length) * index
    }deg) translateZ(${radius}px)`;
  });
  angle = 360 / cardItems.length;
}

{
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
    // 가운데 클릭 시 play버튼 처리.
    element.addEventListener("click", () => {
      if (element === centerCell) {
        playBtnHadler(false, element);
      } else {
        return;
      }
    });
  });

  //자동회전 시작 버튼.
  $btnAutoRotate.addEventListener("click", () => {
    autoRotateMouseCheck = true;
    if (!toggleAutoRotate) {
      $btnAutoRotate.textContent = "Stop!!";
      toggleAutoRotate = true;
      autoRotate();
    } else {
      $btnAutoRotate.textContent = "Run!!";
      toggleAutoRotate = false;
      autoRotate();
    }
  });
  //자동회전함수
  function autoRotate() {
    console.log("running");
    if (toggleAutoRotate) {
      if (autoRotateMouseCheck) {
        getCenterCell(true);
        currAngle -= angle;
        $listItem.style.transform = `rotateY(${currAngle}deg)`;
        $listItem.style.transition = "2s";
        setTimeout(autoRotate, 2000);
      } else {
        setTimeout(autoRotate, 1000);
      }
    } else {
      return;
    }
  }
}

// 회전시 centerCell 처리 함수.
function getCenterCell(selectedBtn) {
  playBtnHadler(true, centerCell);

  if (selectedBtn) {
    centerCell = $listItem.children[++centerCount];

    if (centerCount > containerList.length - 1) {
      centerCount = -1;
      centerCell = $listItem.children[++centerCount];
    }
  } else {
    centerCell = $listItem.children[--centerCount];

    if (centerCount < 0) {
      centerCount = containerList.length;
      centerCell = $listItem.children[--centerCount];
    }
  }
  centerCellStyleChage(true);
  containerList.forEach((el) => {
    if (el.id !== centerCell.id) {
      centerCellStyleChage(false, el);
    }
  });
}

//centercell 색상 변경함수.
function centerCellStyleChage(centercheck, other) {
  if (centercheck) {
    return (centerCell.style.border = "5px solid #5dc8cd");
  } else {
    return (other.style.border = "1px solid #bdbdbd");
  }
}

//좌우이동로직
function clickRotateEvent(direction) {
  if (direction === "right") {
    currAngle -= angle;
    getCenterCell(true);
  } else if (direction === "left") {
    currAngle += angle;
    getCenterCell(false);
  }
  $listItem.style.transform = `rotateY(${currAngle}deg)`;
  $listItem.style.transition = "2s";
}

$btnLeft.addEventListener("click", () => {
  clickRotateEvent("left");
});
$btnRight.addEventListener("click", () => {
  clickRotateEvent("right");
});

// 플레이 버튼 생성,삭제 함수.
function playBtnHadler(remove, center) {
  if (!remove) {
    if (center.getElementsByClassName("btn-play").length > 0) {
      return;
    }
    const $playBtn = document.createElement("button");
    $playBtn.classList.add("btn-play");
    $playBtn.style.transition = "all 0.3s";
    $playBtn.setAttribute("id", `btn-${center.id}`);
    $playBtn.textContent = "Play!";
    $playBtn.addEventListener("click", () => {
      clickPlayBtn(center.id);
    });
    return center.appendChild($playBtn);
  } else if (remove) {
    if (center.querySelector(".btn-play") === null) {
      return;
    }
    center.querySelector(".btn-play").remove();
  }
}
function clickPlayBtn(centerId) {
  const modal = new Modal(1000, 640, centerId);
  modal.showModal();
  // const playGame = new GameBox(centerId);
  // playGame.onGame();
}
