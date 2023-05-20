import firstGame from "./games/firstGame.js";
import secondGame from "./games/secondGame.js";
class GameBox {
  constructor(gameId) {
    this.gameId = gameId;
  }
  onGame() {
    console.log(this.gameId);

    switch (parseInt(this.gameId)) {
      case 0:
        const game = new firstGame();
        game.init();
        console.log("first game");
        break;
      case 1:
        const game2 = new secondGame();
        game2.init();
      case 2:
        return "connect-four";
      default:
        return "tic-tac-toe";
    }
  }
}
export default GameBox;
