class thirdGame {
  init() {
    const testDiv = document.createElement("div");
    testDiv.classList.add("canvas-container");
    const gameScreen = document.querySelector("#app");
    console.log(testDiv);
    gameScreen.appendChild(testDiv);

    testDiv.innerHTML = ` <h3>그림 메모도 해보세요!</h3>
    
      <canvas id="jsCanvas" class="canvas"></canvas>
      <button class="btn-close">닫기</button>

  `;
    document.querySelector(".btn-close").addEventListener("click", closeModal);

    const canvas = document.getElementById("jsCanvas");
    const ctx = canvas.getContext("2d");

    const INITIAL_COLOR = "#000000";
    const CANVAS_SIZE_X = 1000;
    const CANVAS_SIZE_Y = 600;

    ctx.strokeStyle = "#2c2c2c";

    canvas.width = CANVAS_SIZE_X;
    canvas.height = CANVAS_SIZE_Y;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);

    ctx.strokeStyle = INITIAL_COLOR;
    ctx.fillStyle = INITIAL_COLOR;
    ctx.lineWidth = 2.5; /* 라인 굵기 */

    let painting = false;
    let filling = false;

    function stopPainting() {
      painting = false;
    }

    function startPainting() {
      painting = true;
    }

    function onMouseMove(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }

    function handleColorClick(event) {
      const color = event.target.style.backgroundColor;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
    }

    function handleRangeChange(event) {
      const size = event.target.value;
      ctx.lineWidth = size;
    }

    function handleCanvasClick() {
      if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
      }
    }
    // 모달 닫기
    function closeModal() {
      testDiv.style.transition = "all 1s";
      testDiv.style.visibility = "hidden";
      testDiv.style.opacity = "0";
      testDiv.innerHTML = "";
    }

    if (canvas) {
      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mousedown", startPainting);
      canvas.addEventListener("mouseup", stopPainting);
      canvas.addEventListener("mouseleave", stopPainting);
      canvas.addEventListener("click", handleCanvasClick);
      // canvas.addEventListener("contextmenu", handleCM);
    }
  }
}
export default thirdGame;
