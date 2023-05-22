import firstGame from "./games/firstGame.js";
import secondGame from "./games/secondGame.js";
import thirdGame from "./games/thirdGame.js";
import snakeGame from "./games/snakeGame.js";
class GameBox {
  constructor(gameId) {
    this.gameId = gameId;
  }
  onGame() {
    console.log(this.gameId);

    switch (parseInt(this.gameId)) {
      case 0:
        const game = new snakeGame();
        game.init();
        break;
      case 1:
        console.log(this.gameId);
        const game2 = new secondGame();
        game2.init();
        break;
      case 2:
        console.log(this.gameId);
        const game3 = new thirdGame();
        game3.init();
        break;
      case 3:
        const game4 = new firstGame();
        game4.init();
        break;
      default:
        return "tic-tac-toe";
    }
  }
}
export default GameBox;
