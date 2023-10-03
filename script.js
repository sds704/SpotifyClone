// Initialise the variable
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let playingGif = document.getElementById("playingGif");
let masterSongName = document.getElementById("masterSongName");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let totalTime = document.getElementById("totalTime");
let currentDuration = document.getElementById("currentTime");

let total_duration;
let min_duration;
let sec_duration;

let songs = [
  {
    songName: "Atma Rama",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Daku Number 1 Da",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Sanak",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Calm Down",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Let Me Love U",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "No Love",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Maan Meri Jaan",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Tumhari Kasam Salam-e-Ishq",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Na Janna Salam-e-Ishq",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Invincible",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

songItem.forEach((element, i) => {
  // console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime == 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    playingGif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    playingGif.style.opacity = 0;
  }
});

// handle progressBar

audioElement.addEventListener("timeupdate", (event) => {
  // console.log(event)
  // console.log("timeupdate");
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  // console.log(progress);
  console.log(audioElement.duration);
  progressBar.value = progress;

  // handle total duration

  min_duration = Math.floor(audioElement.duration / 60);
  sec_duration = Math.floor(audioElement.duration % 60);
  total_duration = `${min_duration}:${sec_duration}`;
  if (audioElement.duration) {
    totalTime.innerHTML = total_duration;
  }

  //handle current duration

  let min_current_duration = Math.floor(audioElement.currentTime / 60);
  let sec_current_duration = Math.floor(audioElement.currentTime % 60);

  if (sec_current_duration < 10) {
    sec_current_duration = `0${sec_current_duration}`;
  }
  let total_current_duration = `${min_current_duration}:${sec_current_duration}`;
  currentDuration.innerHTML = total_current_duration;
});

progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

// handle songName in container

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      masterSongName.innerText = songs[songIndex].songName;
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      element.classList.remove("fa-play-circle");
      element.classList.add("fa-pause-circle");
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      playingGif.style.opacity = 1;

    });
  }
);


// handle next and previous song
document.getElementById("next").addEventListener("click", () => {
  if (songIndex > 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  playingGif.style.opacity = 1;
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  playingGif.style.opacity = 1;
});
