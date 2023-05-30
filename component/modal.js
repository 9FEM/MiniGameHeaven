import GameBox from "./gameBox.js";

class Modal {
  #width;
  #height;
  #gameId;
  #modal;
  #splash;

  constructor(width, height, id) {
    this.#height = height;
    this.#width = width;
    this.#gameId = id;
    this.#modal = document.createElement("div");
    this.#splash = document.createElement("div");
  }

  showModal() {
    const $main = document.querySelector("#app");

    this.#modal.className = "modal-screen";
    this.#modal.style.width = this.#width + "px";
    this.#modal.style.height = this.#height + "px";
    this.#splash.className = "splash-screen";
    this.#splash.style.width = this.#width + "px";
    this.#splash.style.height = this.#height + "px";
    this.#splash.innerHTML = `
    <div class="loading-container">
		<div class="loading"></div>
		<div id="loading-text">loading</div>
	</div>`;
    this.#modal.appendChild(this.#splash);
    $main.appendChild(this.#modal);
    setTimeout(() => {
      this.#modal.style.opacity = 1;
      this.#splash.style.opacity = 1;
    }, 10);
    setTimeout(() => {
      this.showGame();
    }, 1500);
  }

  showGame() {
    const playGame = new GameBox(this.#gameId);
    playGame.onGame();
    setTimeout(() => {
      this.#splash.style.opacity = 0;
    }, 500);
    setTimeout(() => {
      this.#splash.remove();
    }, 2000);
  }
  closeGame() {
    const $closeModal = document.querySelector(".modal-screen");
    $closeModal.style.opacity = 0;
    $closeModal.remove();
  }
}

export default Modal;
