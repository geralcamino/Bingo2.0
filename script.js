// Congruencia lineal 
let semilla = 56789; 
const modulo = 32768;
const multiplicador = 16645;
const incremento = 1013904223;
const bingoImages = [...Array(76).keys()].map(numero => `https://github.com/geralcamino/Bingo/raw/main/Img/${numero}.png`);
const bingoAudios = [...Array(75).keys()].map(numero => `https://github.com/geralcamino/Bingo2.0/raw/main/audios/${numero}.mp3`);
const numerosEnTablero = [...Array(75).keys()].map(numero => numero + 1);


function generarNumeroAleatorio() 
{
    semilla = (multiplicador * semilla + incremento) % modulo;
    return semilla / modulo;
}


function mostrarImagenAleatoria() 
{
    if (bingoImages.length > 0) {
        
        const randomNumberIndex = Math.floor(generarNumeroAleatorio() * bingoImages.length);
        const selectedImage = bingoImages[randomNumberIndex];
       
        const bingoImageElement = document.getElementById("bingo-image");
        bingoImageElement.src = selectedImage;
        bingoImageElement.style.display = "block"; // Muestra la imagen

        const numeroEnImagen = parseInt(selectedImage.match(/\d+/)[0]); // Extrae el número de la URL de la imagen
        colorearNumeroEnTablero(numeroEnImagen);

       
        // Crear un elemento de imagen para la imagen seleccionada
        const imageElement = document.createElement("img");
        imageElement.src = selectedImage;

        // Agregar la imagen al contenedor de imágenes
        const imagesContainer = document.getElementById("bingo-images-container");
        imagesContainer.appendChild(imageElement);

        reproducirSonido(numeroEnImagen);

        
    } else {
        alert("Todas las imágenes han sido mostradas.");
    }
}

function colorearNumeroEnTablero(numero) {
    const numeroEnTablero = document.querySelector(`.bingo-number[data-number="${numero}"]`);

    if (numeroEnTablero) {
        // Se aplica lo que definimos en el css 
        numeroEnTablero.classList.add("coloreado");
    }
}

// Función para reproducir el sonido correspondiente al número
function reproducirSonido(numero) 
{
    const audioElement = document.getElementById("miAudio");
    audioElement.src = `https://github.com/geralcamino/Bingo2.0/raw/cambios_angie/audios/${numero}.mp3`;
    audioElement.play();
}


function generarNumerosTablero() {
    let numerosHTML = "";

    for (let i = 0; i < numerosEnTablero.length; i++) {
        numerosHTML += `<div class="bingo-number" data-number="${numerosEnTablero[i]}">${numerosEnTablero[i]}</div>`;
    }

    return numerosHTML;
}


window.addEventListener("DOMContentLoaded", () => {
    const bingoBoard = document.querySelector(".bingo-board");
    bingoBoard.innerHTML = generarNumerosTablero();
});

// Metodo para reiniciar el juego si el jugador desea empezar desde cero. 

function reiniciarJuego() {
  
    const bingoImageElement = document.getElementById("bingo-image");
    bingoImageElement.style.display = "none";

    const numerosEnTablero = document.querySelectorAll(".bingo-number");
    numerosEnTablero.forEach(numero => {
        numero.classList.remove("coloreado");
    });

    bingoImages.length = 76;

    const imagesContainer = document.getElementById("bingo-images-container");
    imagesContainer.innerHTML = ""; // Elimina todas las imágenes del contenedorS


}










