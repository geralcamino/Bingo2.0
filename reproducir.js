
function reproducirAudio(){
const miMusica = document.getElementById("miAudio");
const botonMusica = document.getElementById("my-button2");

botonMusica.addEventListener("click", function() {
  if (miMusica.paused) {
    miMusica.play();
    botonMusica.textContent = "Detener Música";
  } else {
    miMusica.pause();
    botonMusica.textContent = "Reproducir Música";
  }
});

}






