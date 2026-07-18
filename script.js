let startTime = 0;
let elapsedTime = 0;
let timer;
let running = false;
let lapCounter = 1;

const display = document.getElementById("display");
const lapList = document.getElementById("lapList");

function updateTime() {

    const currentTime = Date.now() - startTime + elapsedTime;

    let milliseconds = Math.floor((currentTime % 1000) / 10);
    let seconds = Math.floor((currentTime / 1000) % 60);
    let minutes = Math.floor((currentTime / (1000 * 60)) % 60);
    let hours = Math.floor(currentTime / (1000 * 60 * 60));

    display.innerHTML =
        `${String(hours).padStart(2,'0')}:`+
        `${String(minutes).padStart(2,'0')}:`+
        `${String(seconds).padStart(2,'0')}.`+
        `${String(milliseconds).padStart(2,'0')}`;
}

document.getElementById("start").onclick = () => {

    if(!running){

        startTime = Date.now();

        timer = setInterval(updateTime,10);

        running = true;
    }
};

document.getElementById("pause").onclick = () => {

    if(running){

        clearInterval(timer);

        elapsedTime += Date.now() - startTime;

        running = false;
    }
};

document.getElementById("reset").onclick = () => {

    clearInterval(timer);

    running = false;

    startTime = 0;

    elapsedTime = 0;

    lapCounter = 1;

    display.innerHTML = "00:00:00.00";

    lapList.innerHTML = "";
};

document.getElementById("lap").onclick = () => {

    if(running){

        const lap = document.createElement("li");

        lap.innerHTML = `Lap ${lapCounter++} : ${display.innerHTML}`;

        lapList.prepend(lap);
    }
};