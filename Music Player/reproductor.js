
// Creacion de variables para cada elemento del reproductor

// ver cual de estas dos es la que cambia el cover del album
let albumCover = document.querySelector('.album-cover');
let currentPhoto = document.getElementById('current-photo');
//
let audioName = document.querySelector('.audio-name');
let audioArtist = document.querySelector('.audio-artist');

let back = document.getElementById('prev');
let play = document.getElementById('play');
let next = document.getElementById('next');

let currTime = document.querySelector('.current-time');
let seekSlider = document.querySelector('.seek_slider');
let totalTime = document.querySelector('.total-time');

let volume = document.querySelector('.volume_slider');

// variables globales
let track_index = 0;
let isPlaying = false;
let updateTimer;
volume.value = 50;
// Create the audio element for the player
let curr_track = document.createElement('audio');


// Creacion de la lista de canciones
let track_list = [
    {
        artistName: "Cosmos Sheldrake",
        trackName: "Lost in the city lights",
        albumCover: "./Resources/img-cover-1.png",
        path: "./Resources/audio_lost-in-city-lights-145038.mp3"
    },
    {
        artistName: "Lesfm",
        trackName: "Forest Lullaby",
        albumCover: "./Resources/img_cover-2.png",
        path: "./Resources/audio_forest-lullaby-110624.mp3"
    }
];

// Funcion para reiniciar los valores del reproductor
function resetValues() {
    currTime.textContent = "00:00";
    totalTime.textContent = "00:00";
    seekSlider.value = 0;
}

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();

    curr_track.src = track_list[track_index].path;
    curr_track.load();

    albumCover.style.backgroundImage = "url(" + track_list[track_index].albumCover + ")";
    currentPhoto.src = track_list[track_index].albumCover;
    audioName.textContent = track_list[track_index].trackName;
    audioArtist.textContent = track_list[track_index].artistName;

    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // por si track termina de reproducirse la termina
    curr_track.addEventListener('ended', nextTrack);
}
// Cambio de imagen en lugar de innerHTML
function playTrack() {
    curr_track.play();
    isPlaying = true;
    play.querySelector('img').src = "./Resources/svg_pause-button.svg"; // Cambia la imagen a pausa
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    play.querySelector('img').src = "./Resources/svg_Play_fill.svg"; // Cambia la imagen a play
}

// Nueva función para alternar entre play y pause
function togglePlayPause() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

function nextTrack() {
    if (track_index < track_list.length - 1) {
        track_index += 1;
    } else {
        track_index = 0;
    }

    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = track_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seekSlider.value / 100);
    curr_track.currentTime = seekto;
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        currTime.textContent = currentMinutes + ":" + currentSeconds;
        totalTime.textContent = durationMinutes + ":" + durationSeconds;
    }
}

function setVolume() {
    console.log(volume.value);
    curr_track.volume = (volume.value - 1) / 100;
}

back.addEventListener('click', prevTrack);
play.addEventListener('click', togglePlayPause);
next.addEventListener('click', nextTrack);
seekSlider.addEventListener('change', seekTo);
volume.addEventListener('change', setVolume);

loadTrack(track_index);

