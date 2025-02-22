const songs = [
  {
    title: "Song1",
    src: "songs/song1.mp3",
    artist: "Artist 1"
  },
  {
    title: "Song2",
    src: "songs/song2.mp3",
    artist: "Artist 2"
  },
  {
    title: "Song3",
    src: "songs/song3.mp3",
    artist: "Artist 3"
  },
  {
    title: "Song4",
    src: "songs/song4.mp3",
    artist: "Artist 4"
  },
  {
    title: "Song5",
    src: "songs/song5.mp3",
    artist: "Artist 5"
  },
  {
    title: "Song6",
    src: "songs/song6.mp3",
    artist: "Artist 6"
  },
];

let currentIndex = 0;
let autoPlayTimeout;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progress = document.getElementById("progress");
const songList = document.getElementById("song-list");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");
const volumeControl = document.getElementById("volume");

// Populate song list
function populateSongList() {
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.dataset.index = index;

    li.addEventListener("click", () => {
      currentIndex = index;
      loadSong(currentIndex);
      playSong();
    });

    songList.appendChild(li);
  });
}

// Highlight active song in the library
function highlightActiveSong() {
  const items = document.querySelectorAll("#song-list li");
  items.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Load song details
function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  highlightActiveSong(); // Highlight the clicked song in the playlist

  // Update the duration display
  audio.addEventListener('loadedmetadata', () => {
    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    durationDisplay.textContent = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
  });
}

// Play song
function playSong() {
  audio.play();
  playButton.style.display = "none";
  pauseButton.style.display = "inline-block";
}

// Pause song
function pauseSong() {
  audio.pause();
  playButton.style.display = "inline-block";
  pauseButton.style.display = "none";
}

// Previous song
function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  playSong();
}

// Next song
function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  playSong();
}

// Update progress bar and time display
audio.addEventListener("timeupdate", () => {
  // Update progress
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;

  // Update current time display
  const currentMinutes = Math.floor(audio.currentTime / 60);
  const currentSeconds = Math.floor(audio.currentTime % 60);
  currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
});

// Handle volume change
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value / 100;
});

// Handle progress bar input
progress.addEventListener("input", () => {
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// When the song ends, go to next song automatically
audio.addEventListener("ended", nextSong);

populateSongList();
loadSong(currentIndex);

// Add event listeners to prev and next buttons
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

// Add event listeners to play and pause buttons
playButton.addEventListener('click', () => {
  playSong();
});

pauseButton.addEventListener('click', () => {
  pauseSong();
});
