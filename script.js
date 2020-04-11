
const stopButton = document.querySelector("#stop");
const play_pause_Button = document.querySelector("#play_pause");
const resetButton = document.querySelector("#reset");
const timerDisplay = document.querySelector("#time");

const sessionPlus = document.querySelector("#sessionPlus");
const sessionMinus = document.querySelector("#sessionMinus");
const breakPlus = document.querySelector("#breakPlus");
const breakMinus = document.querySelector("#breakMinus");

const sessionDisplay = document.querySelector("#sessionDisplay");
const breakDisplay = document.querySelector("#breakDisplay");

let timerOn = false;
let paused = true;
let defaultSession = "25";
let defaultBreak = "5";
let currentSession = defaultSession;
let currentBreak = defaultBreak;
let inSession = true;

let minutes = 25;
let seconds = 0;




resetButton.addEventListener("click", resetTimer);
play_pause_Button.addEventListener("click", play_pause_Timer)
stopButton.addEventListener("click", stopTimer);

sessionPlus.addEventListener("click", function(){
    if(timerOn) return;
    currentSession = parseInt(currentSession) + 1;
    sessionDisplay.textContent = currentSession;
    updateTimer(currentSession);
});

sessionMinus.addEventListener("click", function(){
    if(timerOn) return;
    if(parseInt(currentSession) - 1 > 0) currentSession = parseInt(currentSession) - 1;

    sessionDisplay.textContent = currentSession;
    updateTimer(currentSession);
});

breakPlus.addEventListener("click", function(){
    if(!inSession) return;
    currentBreak = parseInt(currentBreak) + 1;
    breakDisplay.textContent = currentBreak;
});

breakMinus.addEventListener("click", function(){
    if(!inSession) return;
    if(parseInt(currentBreak) - 1 > 0) currentBreak = parseInt(currentBreak) - 1;
    breakDisplay.textContent = currentBreak;
    
});


function resetTimer(){
    currentBreak = defaultBreak;
    currentSession = defaultSession
    sessionDisplay.textContent = currentSession;
    breakDisplay.textContent = currentBreak;
    timerDisplay.textContent = defaultSession + ":00";
    timerOn = false;
    
}


function play_pause_Timer(){
    if(paused){
        paused = false;
        
    }
    else{
        paused = true;
    }
}

function updateTimer(){
    if(!timerOn) timerDisplay.textContent = currentSession + ":00";
}

function stopTimer(){
    if(timerOn){
        timerDisplay.textContent = currentSession + ":00";
        timerOn = false;
    }
}

function getTimeString(minutes, seconds){

}