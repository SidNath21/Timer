
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

let inSession = true;
let minutes = 25;
let seconds = minutesToSeconds(minutes);

let timerCountdown;
let paused = true;
let timerSessionColor = getComputedStyle(document.documentElement).getPropertyValue('--timer-color-1');
let timerBreakColor = "red";

document.title = "Time - " + minutes + ":00";


sessionPlus.addEventListener("click", function(){
    
    if(!paused) return;
    let currentTime = parseInt(sessionDisplay.textContent) + 1;
    sessionDisplay.textContent = currentTime;
    seconds = minutesToSeconds(sessionDisplay.textContent);
    setTimer();

    
});

sessionMinus.addEventListener("click", function(){
    
    if(!paused) return;
    let currentTime = parseInt(sessionDisplay.textContent);
    if(currentTime > 1) currentTime--;
    sessionDisplay.textContent = currentTime;
    seconds = minutesToSeconds(sessionDisplay.textContent);
    setTimer();
    
});

breakPlus.addEventListener("click", function(){
   
    if(!paused) return;
    let currentTime = parseInt(breakDisplay.textContent) + 1;
    breakDisplay.textContent = currentTime;
    seconds = minutesToSeconds(sessionDisplay.textContent);
    setTimer();
   
});

breakMinus.addEventListener("click", function(){
    
    if(!paused) return;
    let currentTime = parseInt(breakDisplay.textContent);
    if(currentTime > 1) currentTime--;
    breakDisplay.textContent = currentTime;
    seconds = minutesToSeconds(sessionDisplay.textContent);
    setTimer();
   
});

stopButton.addEventListener("click", function(){
   
    reset();
    seconds = minutesToSeconds(sessionDisplay.textContent);
    paused = true;
    setTimer();
        
    
});

play_pause_Button.addEventListener("click", function(){

    if(paused){
        paused = false;
        startTime();
    }

    else{
        paused = true;
        clearTimeout(timerCountdown);
    }

});

resetButton.addEventListener("click", function(){
    reset();
    sessionDisplay.textContent = 25;
    breakDisplay.textContent = 5;
    seconds = minutesToSeconds(sessionDisplay.textContent);
    paused = true;
    setTimer();
});


function reset() {
  
    clearTimeout(timerCountdown);
    inSession = true;
    
  }

function changeTimer() {
    if (inSession) {
        inSession = false;
        seconds = minutesToSeconds(breakDisplay.textContent);
    } 
    else {
        inSession = true;
        seconds = minutesToSeconds(sessionDisplay.textContent);
    }

    if(timerDisplay.style.color == timerBreakColor) timerDisplay.style.color == timerSessionColor;
    else timerDisplay.style.color == timerBreakColor;

}


function minutesToSeconds(minutes){
    return minutes * 60;
}

function setTimer() {
    timerDisplay.style.color = getComputedStyle(document.documentElement).getPropertyValue('--timer-border-color');
    let minutes = Math.floor(seconds/60);
    let remainingSeconds = seconds % 60;
    let timeString = getTime(minutes) + ":" + getTime(remainingSeconds);

    document.title = "Time - " + timeString
    timerDisplay.textContent = timeString
}

function getTime(time) {
    time = time.toString();
    
    if(time.length < 2){
        return "0" + time;
    }
    return time;
    
}

function startTime() {
    if (seconds < 0) changeTimer();

    setTimer();
    seconds--;
    timerCountdown = setTimeout(startTime, 1000); // 100

    if(inSession) timerDisplay.style.color = timerSessionColor;
    else timerDisplay.style.color = timerBreakColor;
    
}


const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }    
    timerSessionColor = getComputedStyle(document.documentElement).getPropertyValue('--timer-color-1');
    timerDisplay.style.color = getComputedStyle(document.documentElement).getPropertyValue('--timer-border-color');
}

toggleSwitch.addEventListener('change', switchTheme, false);