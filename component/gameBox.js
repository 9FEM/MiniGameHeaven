import firstGame from "./games/firstGame.js";
import secondGame from "./games/secondGame.js";
import thirdGame from "./games/thirdGame.js";
import snakeGame from "./games/snakeGame.js";
class GameBox {
  constructor(gameId) {
    this.gameId = gameId;
  }
  onGame() {
    switch (parseInt(this.gameId)) {
      case 1:
        const snakeGamePlay = new snakeGame();
        snakeGamePlay.init();
        break;
      case 2:
        const paintGame = new thirdGame();
        paintGame.init();
        break;
      case 3:
        break;
      case 4:
        break;
      default:
        break;
    }
  }
}
export default GameBox;
