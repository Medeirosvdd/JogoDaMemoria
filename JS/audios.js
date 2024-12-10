let audio = document.getElementById("myAudio");
let icon = document.getElementById("audioIcon");
let trackIndex = 0;
const tracks = [
    "audio/Musica1.mp3",
    "audio/The Muffin Man ° fundo musical infantil sem direitos autorais (1).mp3"
];

function toggleAudio() {
    if (audio.paused) {
        audio.play();
        icon.src = "img/volume-xmark-solid.svg";
        icon.alt = "Pause";
    } else {
        audio.pause();
        icon.src = "img/volume-high-solid.svg";
        icon.alt = "Play";
    }
}

function nextTrack() {
    trackIndex = (trackIndex + 1) % tracks.length;
    audio.src = tracks[trackIndex];
    audio.play();
    icon.src = "img/volume-high-solid.svg";
    icon.alt = "Pause";
}

audio.addEventListener('ended', nextTrack);

// Salva o estado do áudio antes de navegar
window.addEventListener('beforeunload', () => {
    localStorage.setItem('audioTrackIndex', trackIndex);
    localStorage.setItem('audioCurrentTime', audio.currentTime);
    localStorage.setItem('audioPaused', audio.paused);
});

// Restaura o estado do áudio ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const savedTrackIndex = localStorage.getItem('audioTrackIndex');
    const savedCurrentTime = localStorage.getItem('audioCurrentTime');
    const savedPaused = localStorage.getItem('audioPaused');

    if (savedTrackIndex !== null) {
        trackIndex = parseInt(savedTrackIndex, 10);
        audio.src = tracks[trackIndex];
        if (savedCurrentTime !== null) {
            audio.currentTime = parseFloat(savedCurrentTime);
        }
        if (savedPaused === 'false') {
            audio.play();
            icon.src = "img/volume-xmark-solid.svg";
            icon.alt = "Pause";
        }
    } else {
        audio.src = tracks[trackIndex];
    }
});
