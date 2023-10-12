
function reproducirAudio(){
const miMusica = document.getElementById("miAudio");
const botonMusica = document.getElementById("my-button2");


  if (miMusica.paused) {
    miMusica.play();
    botonMusica.innerHTML = '<img src="img/bocina.jpeg" alt="Detener música" />'; 
  } else {
    miMusica.pause();
    botonMusica.innerHTML = '<img src="img/bocina1.jpeg" alt="Detener música" />'; 
  }
;

}






