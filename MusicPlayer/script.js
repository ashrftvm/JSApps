const playPauseButton = document.getElementById('playPauseButton');
const repeatButton = document.getElementById('repeatButton');
const shuffleButton = document.getElementById('shuffleButton');
const progressBarInner = document.querySelector('.progress-bar-inner');

// Define your music directory and song list
const musicDirectory = 'music/';
const songList = ["Atlantis Rage.mp3", "Devil's Organ.mp3", "Floating Home.mp3"]; // Add more songs if needed

let isPlaying = false;
let currentTime = 0;
let totalTime = 180; // Total time in seconds
let currentIndex = 0;
let isShuffleMode = false;
let isRepeatMode = false;

const audio = new Audio();
const backBtn = document.getElementById('backBtn');
const playBtn = document.getElementById('playPauseButton');
const forwardBtn = document.getElementById('forwardBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const remainingTimeEl = document.querySelector('span.remaining-duration');
const elapsedTimeEl = document.querySelector('span.elapsed-time');
const timeBar = document.getElementById("time-range");

audio.addEventListener('loadedmetadata', function() {
    const totalDuration = audio.duration;
    const formattedDuration = formatTime(totalDuration);
    remainingTimeEl.textContent = formattedDuration;
    timeBar.max = totalDuration;

    setInterval(() => {
      const currentTime = audio.currentTime;
      const formattedTimeElapsed = formatTime(currentTime);
      elapsedTimeEl.textContent = formattedTimeElapsed;
      timeBar.value = currentTime;

      const remainingTime = totalDuration - currentTime;
      const formattedTimeRemaining = formatTime(remainingTime);
      remainingTimeEl.textContent = formattedTimeRemaining;
    }, 1000);
});

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
    return number.toString().padStart(2, '0');
}


function playSong() {
    const songUrl = musicDirectory+songList[currentIndex];
    console.log("hello", songUrl)
    audio.src = songUrl;
    audio.play();
    playBtn.innerHTML = `<i data-feather="pause"></i>`
    feather.replace()
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = `<i data-feather="pause"></i>`
    } else {
        audio.pause();
        playBtn.innerHTML = `<i data-feather="play"></i>`
    }
    feather.replace();
}

function playNextSong() {
    if (isShuffleMode) {
        currentIndex = getRandomIndex();
    } else {
        currentIndex = (currentIndex + 1) % songList.length;
    }
    playSong();
}

function playPreviousSong() {
    currentIndex = (currentIndex - 1 + songList.length) % songList.length;
    playSong();
}

function toggleShuffleMode() {
    isShuffleMode = !isShuffleMode;
    shuffleBtn.classList.toggle('active', isShuffleMode);
}

function toggleRepeatMode() {
    isRepeatMode = !isRepeatMode;
    repeatBtn.classList.toggle('active', isRepeatMode);
}

function getRandomIndex() {
    let randomIndex = currentIndex;
    while (randomIndex === currentIndex) {
        randomIndex = Math.floor(Math.random() * songList.length);
    }
    return randomIndex;
}

audio.addEventListener('ended', function () {
    if (isRepeatMode) {
        playSong();
    } else {
        playNextSong();
    }
});

backBtn.addEventListener('click', function () {
    playPreviousSong();
});

playBtn.addEventListener('click', function () {
    if(audio.src){
        togglePlayPause();
    }else{
        playSong()
    }
});

forwardBtn.addEventListener('click', function () {
    playNextSong();
});

shuffleBtn.addEventListener('click', function () {
    toggleShuffleMode();
});

repeatBtn.addEventListener('click', function () {
    toggleRepeatMode();
});

audio.addEventListener('play', function () {
    playBtn.innerHTML = `<i data-feather="pause"></i>`
    forwardBtn.disabled = false;
    backBtn.disabled = false;
});

audio.addEventListener('pause', function () {
    playBtn.innerHTML = `<i data-feather="play"></i>`
});

audio.addEventListener('loadedmetadata', function () {
    if (audio.duration) {
        forwardBtn.disabled = false;
        backBtn.disabled = false;
    }
});

audio.addEventListener('error', function (e) {
    console.error('Error occurred:', e);
});
