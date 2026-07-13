const board = document.querySelector('.board');
const startButton = document.querySelector(".btn-start")
const modal = document.querySelector(".modal")
const startGameModal= document.querySelector(".modal-content")
const gameOverModal = document.querySelector(".display-none")
const restartButton = document.querySelector(".btn-restart")
const blockHeight = 45
const blockWidth = 45

const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)

let food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)} 
let intervalId = null

const blocks = []
const snake = [{
        x:1,y:3
}
] 

let direction = 'down'
   
for(let row=0; row < rows ; row++){
   for(let col=0; col < cols ; col++){
    const block =document.createElement('div');
    block.classList.add("block");
    board.appendChild(block);
    block.innerText=`${row}-${col}`
    blocks[`${row}-${col}`]=block
   }     
}           

function render(){

        let head = null

    blocks[`${food.x}-${food.y}`].classList.add("food")

    if(direction==="left"){
        head={ x: snake[0].x , y: snake[0].y-1}
    }else if(direction==="right"){
        head={ x: snake[0].x , y: snake[0].y+1}
    }else if(direction==="down"){
        head={ x: snake[0].x+1 , y: snake[0].y}
    }else if(direction==="up"){
        head={ x: snake[0].x-1 , y: snake[0].y}
    }

    if(head.x<0 || head.x>=rows || head.y<0 || head.y>=cols){
        clearInterval(intervalId)
        modal.style.display="flex"
        startGameModal.style.display="none"
        gameOverModal.style.display="flex"
        return;
    }

    if(head.x==food.x && head.y==food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        snake.unshift(head) 
    }

    snake.forEach(sagment =>{
        blocks[`${sagment.x}-${sagment.y}`].classList.remove("fill")
        })
        snake.unshift(head)
        snake.pop()

    snake.forEach(sagment =>{
        blocks[`${sagment.x}-${sagment.y}`].classList.add("fill")
    })
}

// intervalId=setInterval(()=>{
//         render()
    
// },300);

startButton.addEventListener("click",()=>{
    modal.style.display="none"
    intervalId=setInterval(()=>{render()},300)
})

restartButton.addEventListener("click",restartGame)

function restartGame(){
    blocks[`${food.x}-${food.y}`].classList.remove("food")

        snake.forEach(sagment =>{
        blocks[`${sagment.x}-${sagment.y}`].classList.remove("fill")
        })

    modal.style.display="none"
    direction = 'down'
    snake.length = 0;
    snake.push({x:1, y:3});
    food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)} 
    intervalId=setInterval(()=>{render()},300)
}

addEventListener("keydown", (event) => {
    if(event.key=="ArrowUp"){
        direction="up"
    }else if(event.key=="ArrowRight"){
        direction="right"
    }else if(event.key=="ArrowLeft"){
        direction="left"
    }else if(event.key=="ArrowDown"){
        direction="down"
    }
})