let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#new-btn");

let turnO = true;

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const winPatterns =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        if(turnO){
            box.innerText = "O";
            box.style.color = "#04395E";
            turnO = false;
        }
        else{
            box.innerText = "X";
            box.style.color = "#D5896F";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    })
})

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) =>{
    msg.innerText = `Player ${winner} is Winner !`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const showDraw = () =>{
    msg.innerText = "Game Draw !";
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner = () => {
    let winnerFound = false;
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                console.log("Winner", pos1);
                showWinner(pos1);
                winnerFound = true;
                break;
            }
        }   
    }
    if(!winnerFound){
        let filled = true;
        for(let box of boxes){
            if(box.innerText === ""){
                filled = false;
                break;
            }
        }
        if(filled){
            showDraw();
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);