// Congruencia lineal 
let semilla = Date.now();
const modulo = 32768;
const multiplicador = 16645;
const incremento = 1013904223;
const bingoImages = [...Array(76).keys()].map(numero => `https://github.com/geralcamino/Bingo/raw/main/Img/${numero}.png`);
const numerosEnTablero = [...Array(75).keys()].map(numero => numero + 1);


// Array para llevar un registro de las balotas mostradas
const balotasMostradas = [];

function generarNumeroAleatorio() 
{
    semilla = (multiplicador * semilla + incremento) % modulo;
    return semilla / modulo;
}

function mostrarImagenAleatoria() 
{
    if (bingoImages.length > 0) 
    {
        // Filtra las imágenes que aún no se han mostrado
        const imagenesNoMostradas = bingoImages.filter((imagen, index) => !balotasMostradas.includes(index));

        if (imagenesNoMostradas.length > 0) {
            const randomNumberIndex = Math.floor(generarNumeroAleatorio() * imagenesNoMostradas.length);
            const selectedImage = imagenesNoMostradas[randomNumberIndex];
            
            // Agrega el índice de la imagen mostrada al registro
            balotasMostradas.push(bingoImages.indexOf(selectedImage));
            
            // Restringe el número de balotas mostradas
            if (balotasMostradas.length >= bingoImages.length) {
                alert("Todas las imágenes han sido mostradas.");
            }

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
        }
    } 
    else 
    {
        Swal.fire
        ({
            icon: 'info',
            title: 'Fin del juego',
            text: 'Gracias por participar'
        });
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

    const letras = ["B", "I", "N", "G", "O"];

    for (let i = 0; i < 5; i++) 
    {
        numerosHTML += `<div class="bingo-number bingo-letter">${letras[i]}</div>`;
        for (let j = 1; j <= 15; j++) {
            numerosHTML += `<div class="bingo-number" data-number="${i * 15 + j}">${i * 15 + j}</div>`;
        }
    }

    return numerosHTML;
}

window.addEventListener("DOMContentLoaded", () => {
    const bingoBoard = document.querySelector(".bingo-board");
    bingoBoard.innerHTML = generarNumerosTablero();
});

// Metodo para reiniciar el juego si el jugador desea empezar desde cero. 
function reiniciarJuego() {
    Swal.fire({
        title: '¿Seguro deseas reiniciar el juego?',
        text: 'Todos los progresos se perderán',
        icon: 'warning',
        iconColor:'#FF69B4',
        showCancelButton: true,
        confirmButtonText: 'Sí, reiniciar',
        cancelButtonText: 'Cancelar',
        
        customClass: {
            popup: 'my-custom-modal-class', 
            title: 'my-custom-title-class', 
            content: 'my-custom-content-class', 
            
            
        },
       
    }).then((result) => {
        if (result.isConfirmed) {
            reiniciarJuegoConfirmado();
        }
    });
}

function reiniciarJuegoConfirmado() {
    // Coloca aquí el código para reiniciar el juego
    const bingoImageElement = document.getElementById("bingo-image");
    bingoImageElement.style.display = "none";

    const numerosEnTablero = document.querySelectorAll(".bingo-number");
    numerosEnTablero.forEach(numero => {
        numero.classList.remove("coloreado");
    });

    // Reiniciar el registro de balotas mostradas
    balotasMostradas.length = 0;

    const imagesContainer = document.getElementById("bingo-images-container");
    imagesContainer.innerHTML = ""; // Elimina todas las imágenes del contenedor
}

