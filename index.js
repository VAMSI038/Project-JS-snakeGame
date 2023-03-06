const gameBoard = document.querySelector("#canvasBorder");
const context = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
let running = false;
let foodX;
let foodY;
const unitSize = 25;
let xVelocity = unitSize;
let yVelocity = 0;
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
let score = 0;
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
startGame();

function createFood() {
    function randFood(min, max) {
        let randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randFood(0, gameWidth - unitSize);
    foodY = randFood(0, gameWidth - unitSize);
}

function drawFood() {
    context.fillStyle = foodColor;
    context.fillRect(foodX, foodY, unitSize, unitSize);
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;
    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch (true) {
        case (keyPressed == left && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == up && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case (keyPressed == right && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == down && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
}

function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    startGame();
}

function startGame() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
}

function nextTick() {

    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else {
        displayGameOver();
    }
}

function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for (let i = 1; i < snake.length; i += 1) {
        if ((snake[i].x == snake[0].x) && (snake[i].y == snake[0].y)) {
            running = false;
        }
    }

}

function clearBoard() {
    context.fillStyle = boardBackground;
    context.fillRect(0, 0, gameWidth, gameHeight);
}

function drawSnake() {
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorder;
    snake.forEach(piece => {
        context.fillRect(piece.x, piece.y, unitSize, unitSize);
        context.strokeRect(piece.x, piece.y, unitSize, unitSize);
    })
};

function moveSnake() {
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    };
    snake.unshift(head);

    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
    }
    else {
        snake.pop();
    }
}

function displayGameOver() {
    context.font = "50px MV Boli";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;
}
