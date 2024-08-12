//variable and constant 

let inputDir = {
    x: 0,
    y: 0
}
const foodsound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const music = new Audio('music.mp3');
let speed = 9;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 12 }
]
food = { x: 12, y: 5 }
let score = 0;
const totalScore = document.querySelector("#score");
const highest=document.querySelector("#highBox");
console.log()
// console.log(hiscorre);
const board = document.querySelector(".box");
let hiscore = 0;
// let hiscoreval;



//game function
function main(ctime) {
    music.play();
    
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;

    gameEngine();
}
function isCollide(snakeArr) {
    //if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            return true;
        }
    }
    //bump into the wall
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0){
        return true;
    }

        return false;
}
function gameEngine() {
    //updating the snake variable
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        music.pause();
        inputDir = {
            x: 0,
            y: 0
        }
        alert("GameOver.press any Key to play again");
        snakeArr = [
            { x: 13, y: 12 }
        ];
        music.play();
        score = 0;  
        totalScore.innerHTML=`Score:${score}`;
    }
    //if you have eaten the food , increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodsound.play();
        score+=1;
        // if(score>hiscoreval){
        //     hiscoreval = score;
        //     console.log(hiscoreval);
        //     localStorage.setItem('highscore',JSON.stringify(hiscoreval));
        //     hiscorre.innerHTML="HiScore:"+hiscoreval;
        //     console.log(hiscorre);
           
        // }
        
        totalScore.innerHTML=`Score:${score}`;
        if(hiscore<score){
            highest.innerHTML=`High Score :${score}`
        }
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        food = { x: Math.round(2 + (17 - 2) * Math.random()), y: Math.round(2 + (17 - 2) * Math.random()) }
    }
    //move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //display the snake 
    // console.log(board);
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



//main logic
// let hiscore = localStorage.getItem('highscore');
// console.log(hiscore);
// if(hiscore===null){
//     hiscoreval = 0;
//     localStorage.setItem('highscore',JSON.stringify(hiscoreval));
// }else{
//     hiscoreval= JSON.parse(hiscore);
//     hiscorre.innerHTML="HiScore:"+hiscoreval;
// }


window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // if any of the key clicked snake start to move in downward direction
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
});

