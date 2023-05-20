const arrPic = [1, 2, 3, 4, 5, 6, 7, 8];
const $listItem = document.querySelector(".list-item");
const $cardList = document.querySelectorAll(".card-list");
const $btnLeft = document.querySelector(".btn-left");
const $btnRight = document.querySelector(".btn-right");

arrPic.forEach((item, idx) => {
  const elLi = document.createElement("li");
  elLi.classList.add("card-list");
  elLi.innerHTML = `<div>${item}</div>`;
  $listItem.appendChild(elLi);
});

const items = document.querySelectorAll(".card-list");

{
  const radius = (items[0].offsetWidth * items.length) / 3.14 / 2;

  items.forEach((item, index) => {
    item.style.transform = `rotateY(${
      (360 / items.length) * index
    }deg) translateZ(${radius}px)`;
  });
}
const angle = 360 / items.length;
let currAngle = 0;

const $btnAutoRotate = document.querySelector(".btn-auto-rotate");

const containerList = Array.from($listItem.children);
const carouselLength = $listItem.children.length;

let centerCell =
  carouselLength % 2 !== 0
    ? $listItem.children[parseInt(carouselLength / 2)]
    : $listItem.children[carouselLength / 2 - carouselLength / 2];
centerCellStyleChage(true);

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
        createPlayBtn(false, element);
      } else {
        return;
      }
    });
  });

  let toggleAutoRotate = false;

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
        getCenterCell(false);
        currAngle += angle;
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

//CenterCell 찾는 로직.
for (let i = 0; i < containerList.length; i++) {
  containerList[i].setAttribute("id", i);
}
let centerCount = 0;

function getCenterCell(selectedBtn) {
  createPlayBtn(true, centerCell);

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
function centerCellStyleChage(center, other) {
  if (center) {
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

function createPlayBtn(remove, center) {
  if (!remove) {
    if (center.getElementsByClassName("btn-play").length > 0) {
      return;
    }
    const $playBtn = document.createElement("button");
    $playBtn.classList.add("btn-play");
    $playBtn.setAttribute("id", `btn-${center.id}`);
    $playBtn.textContent = "Play!";
    $playBtn.addEventListener("click", () => {});
    return center.appendChild($playBtn);
  } else if (remove) {
    if (center.querySelector(".btn-play") === null) {
      return;
    }
    center.querySelector(".btn-play").remove();
  }
}
