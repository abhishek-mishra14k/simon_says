let game_sequence = [];
let user_sequence = [];

let btns = ['red' , 'blue' , 'green' , 'yellow'];

let start = false;
let level = 0;
let highscore = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function (event) {
    if (start == false && event.key === "Enter") {
        console.log("Game is started");
        start = true;
        levelup();
    }
});


function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 300);
}

function levelup() {
    user_sequence = [];   // when level up the user sequence should be empty to take new inputs from the user in  the correct order 
    level++;
    h2.innerText = `Level ${level}`;

    let randidx = Math.floor(Math.random() * 4);
    let randcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    game_sequence.push(randcolor);
    console.log(game_sequence);
    // randdom  button choose
    gameflash(randbtn);
}

function checkans(idx){
    if (user_sequence[idx] === game_sequence[idx]){
        if (user_sequence.length === game_sequence.length){
            setTimeout(levelup, 700);     // this will push to the level up function only when the user has entered the complete sequence correctly
        }
    }
    else{
        if(level > highscore){
        highscore = level;
    }
        h2.innerHTML = `Game Over! Your Score is <b>${level}</b>.<br/> Press Enter to Restart the Game`;
        h3.innerHTML = `High Score is <b>${highscore}</b>`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },300);
        reset();  //calling rest to restart the game after game over
    }
}

function btnpressed(){
    let btn = this;
    userflash(btn);        //remember one thing all the btn in this whole code are diffrent from each othernot same they are inside the diffrent function so they are diffrent

    usercolor = btn.getAttribute("id");
    user_sequence.push(usercolor);

    checkans(user_sequence.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns){
    btn.addEventListener("click",btnpressed);
}

function reset(){
    start = false;
    game_sequence = [];
    user_sequence = [];
    level = 0;
}