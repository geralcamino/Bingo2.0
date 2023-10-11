
window.addEventListener("DOMContentLoaded", () => {
    const audio = document.createElement("audio");
    audio.preload = "auto";
    audio.src = "img/cancion.mp3";
    audio.play();
    document.body.appendChild(audio);
    muted="muted"
});