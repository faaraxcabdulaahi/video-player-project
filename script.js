const video = document.querySelector("#video");
const progressBar = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-bar");
const currentTimeEl = document.querySelector("#current-time");
const durationEl = document.querySelector("#duration");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const volumeSlider = document.querySelector("#volume");
const speedSelect = document.querySelector("#speed");

video.volume = volumeSlider.value;

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const togglePlayPause = () => {
  if (video.paused) {
    video.play();
    playBtn.querySelector("i").classList.remove("fa-play");
    playBtn.querySelector("i").classList.add("fa-pause");
  } else {
    video.pause();
    playBtn.querySelector("i").classList.remove("fa-pause");
    playBtn.querySelector("i").classList.add("fa-play");
  }
};

const updateProgress = () => {
  const progressPercent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  currentTimeEl.textContent = formatTime(video.currentTime);
  durationEl.textContent = formatTime(video.duration);
};

const prevVideo = () => {
  video.currentTime = Math.max(0, video.currentTime - 10);
};

const nextVideo = () => {
  video.currentTime = Math.min(video.duration, video.currentTime + 10);
};

volumeSlider.addEventListener("input", () => {
  video.volume = volumeSlider.value;
});

speedSelect.addEventListener("change", () => {
  video.playbackRate = speedSelect.value;
});

progressContainer.addEventListener("click", (e) => {
  const progressWidth = progressContainer.clientWidth;
  const offsetX = e.offsetX;
  const newTime = (offsetX / progressWidth) * video.duration;
  video.currentTime = newTime;
});

video.addEventListener("timeupdate", updateProgress);
video.addEventListener("ended", () => {
  playBtn.querySelector("i").classList.remove("fa-pause");
  playBtn.querySelector("i").classList.add("fa-play");
});

playBtn.addEventListener("click", togglePlayPause);
prevBtn.addEventListener("click", prevVideo);
nextBtn.addEventListener("click", nextVideo);
