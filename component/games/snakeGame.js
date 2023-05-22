class snakeGame {
  init() {
    const $snakeGameDiv = document.createElement("div");
    $snakeGameDiv.setAttribute("id", "snake-myModal");
    const $gameScreen = document.querySelector("#app");
    let gameScreenCloseCheck = false;
    let score = 0;

    $snakeGameDiv.innerHTML = ` 
    <div class="snake-modal-content">
        <div class="snake-modal-header">
          <h2>Snake Game</h2>
          <span class="snake-btn-close">&times;</span>
        </div>
        <!-- Snake game code goes here -->
        <canvas id="snakeCanvas" width="1000" height="600"></canvas>
      </div>`;
    $gameScreen.appendChild($snakeGameDiv);

    $snakeGameDiv.style.display = "block";

    startSnakeGame();

    function openModal() {
      // Display the modal
      document.getElementById("snake-myModal").style.display = "block";

      // Start the snake game
    }
    function closeModal() {
      $snakeGameDiv.style.transition = "all 2s";
      $snakeGameDiv.style.visibility = "hidden";
      $snakeGameDiv.style.opacity = "0";
      $snakeGameDiv.innerHTML = "";
      gameScreenCloseCheck = true;
      setTimeout(() => {
        $snakeGameDiv.remove();
      }, 1000);
    }

    function startSnakeGame() {
      document
        .querySelector(".snake-btn-close")
        .addEventListener("click", closeModal);

      const canvas = document.getElementById("snakeCanvas");
      const ctx = canvas.getContext("2d");

      // Define the size of each cell in the grid
      const cellSize = 20;

      // Calculate the number of rows and columns based on the canvas size and cell size
      const numRows = canvas.height / cellSize;
      const numCols = canvas.width / cellSize;

      // Initialize the snake's initial position and direction
      let snake = [{ x: Math.floor(numCols / 2), y: Math.floor(numRows / 2) }];
      let direction = "right";

      // Generate random coordinates for the food
      let food = generateFoodPosition();

      // Set the game speed (lower value means faster speed)
      const gameSpeed = 100;

      // Handle keyboard arrow key presses to change the snake's direction
      document.addEventListener("keydown", handleKeyPress);

      // Start the game loop
      setInterval(gameLoop, gameSpeed);

      function gameLoop() {
        if (gameScreenCloseCheck) {
          return;
        }
        // Update the snake's position based on the current direction
        const head = { x: snake[0].x, y: snake[0].y };

        switch (direction) {
          case "up":
            head.y--;
            break;
          case "down":
            head.y++;
            break;
          case "left":
            head.x--;
            break;
          case "right":
            head.x++;
            break;
        }

        // Check for collision with walls or the snake's body
        if (
          head.x < 0 ||
          head.y < 0 ||
          head.x >= numCols ||
          head.y >= numRows ||
          isCollision(head, snake)
        ) {
          // Game over
          alert(`Game over! \nYour score is ${score}`);
          resetGame();
          return;
        }

        // Check if the snake has eaten the food
        if (head.x === food.x && head.y === food.y) {
          // Increase the snake's length
          snake.push({});
          score++;
          // Generate new coordinates for the food
          food = generateFoodPosition();
        } else {
          // Remove the last segment of the snake
          snake.pop();
        }

        // Update the snake's position
        snake.unshift(head);

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the snake
        ctx.fillStyle = "green";
        snake.forEach((segment) => {
          ctx.fillRect(
            segment.x * cellSize,
            segment.y * cellSize,
            cellSize,
            cellSize
          );
        });

        // Draw the food
        ctx.fillStyle = "red";
        ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
      }

      function handleKeyPress(event) {
        // Change the snake's direction based on the arrow key pressed
        switch (event.key) {
          case "ArrowUp":
            if (direction !== "down") {
              direction = "up";
            }
            break;
          case "ArrowDown":
            if (direction !== "up") {
              direction = "down";
            }
            break;
          case "ArrowLeft":
            if (direction !== "right") {
              direction = "left";
            }
            break;
          case "ArrowRight":
            if (direction !== "left") {
              direction = "right";
            }
            break;
        }
      }

      function isCollision(position, snake) {
        // Check if the given position collides with the snake's body
        for (let i = 1; i < snake.length; i++) {
          if (position.x === snake[i].x && position.y === snake[i].y) {
            return true;
          }
        }
        return false;
      }

      function generateFoodPosition() {
        // Generate random coordinates for the food within the grid
        const position = {
          x: Math.floor(Math.random() * numCols),
          y: Math.floor(Math.random() * numRows),
        };
        // Make sure the food is not generated on the snake's body
        if (isCollision(position, snake)) {
          return generateFoodPosition();
        }
        return position;
      }

      function resetGame() {
        console.log("resetfuc");
        score = 0;
        // Reset the snake and generate new food position
        snake = [{ x: Math.floor(numCols / 2), y: Math.floor(numRows / 2) }];
        direction = "right";
        food = generateFoodPosition();
      }
    }
  }
}
export default snakeGame;
