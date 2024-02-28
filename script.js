let timer; 
let isRunning = false;
let startTime;
let lapTimes = [];

function startStop() {
  if (!isRunning) {
    startTime = Date.now();
    timer = setInterval(updateDisplay, 10); 
    document.getElementById('startStop').textContent = 'Stop';
    isRunning = true;
  } else {
    clearInterval(timer);
    document.getElementById('startStop').textContent = 'Start';
    isRunning = false;
  }
}

function updateDisplay() {
  let elapsedTime = Date.now() - startTime;
  let formattedTime = formatTime(elapsedTime);
  document.getElementById('display').textContent = formattedTime;
}

function formatTime(time) {
  let minutes = Math.floor(time / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = Math.floor((time % 1000) / 10);
  return (
    (minutes < 10 ? '0' : '') + minutes + ':' +
    (seconds < 10 ? '0' : '') + seconds + ':' +
    (milliseconds < 10 ? '0' : '') + milliseconds
  );
}

function recordLap() {
  if (isRunning) {
    let elapsedTime = Date.now() - startTime;
    let formattedTime = formatTime(elapsedTime);
    lapTimes.push(formattedTime);
    updateLapTimes();
  }
}

function updateLapTimes() {
  let lapTimesList = document.getElementById('lapTimes');
  lapTimesList.innerHTML = '';
  lapTimes.forEach((lapTime, index) => {
    let lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${index + 1}: ${lapTime}`;
    lapTimesList.appendChild(lapItem);
  });
}

function reset() {
  clearInterval(timer);
  document.getElementById('display').textContent = '00:00:00';
  document.getElementById('startStop').textContent = 'Start';
  isRunning = false;
  lapTimes = [];
  updateLapTimes();
}
