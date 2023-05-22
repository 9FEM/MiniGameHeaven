class FirstGame {
  init() {
    const myModal = document.createElement("div");
    const modalOpen = document.createElement("button");
    const gameScreen = document.querySelector("#app");

    modalOpen.setAttribute("onclick", "openModal()");
    gameScreen.appendChild(myModal);
    myModal.id = "myModal";
    myModal.className = "modal";
    myModal.innerHTML = `
  <div class="modal-content">
        <h2>게임</h2>
        <p id="message"></p>
        <input type="number" id="guess" placeholder="숫자를 입력하세요" />
        <button class="btn-confirm">확인</button>
        <button class="btn-close">닫기</button>`;
    document
      .querySelector(".btn-confirm")
      .addEventListener("click", checkGuess);
    document.querySelector(".btn-close").addEventListener("click", closeModal);

    // 모달 닫기
    function closeModal() {
      myModal.style.transition = "all 2s";
      myModal.style.visibility = "hidden";
      myModal.style.opacity = "0";
      myModal.innerHTML = "";
      setTimeout(() => {
        myModal.remove();
      }, 1000);
    }

    // 게임 시작
    function checkGuess() {
      var randomNumber = Math.floor(Math.random() * 100) + 1; // 1에서 100까지의 무작위 숫자 생성

      console.log(randomNumber);
      var guess = parseInt(document.getElementById("guess").value);
      var message = document.getElementById("message");

      if (guess === randomNumber) {
        message.innerHTML = "축하합니다! 숫자를 맞추셨습니다!";
      } else if (guess < randomNumber) {
        message.innerHTML = "더 큰 숫자를 입력하세요.";
      } else {
        message.innerHTML = "더 작은 숫자를 입력하세요.";
      }
    }
  }
}
export default FirstGame;
