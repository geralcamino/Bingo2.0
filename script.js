// Congruencia lineal
let semilla = Date.now();
const modulo = 32768;
const multiplicador = 16645;
const incremento = 1013904223;
const bingoImages = [...Array(75).keys()].map(numero => `https://github.com/geralcamino/Bingo/raw/main/Img/${numero + 1}.png`);
const numerosEnTablero = [...Array(75).keys()].map(numero => numero + 1);

// Array to keep track of displayed balls
const balotasMostradas = [];

function generarNumeroAleatorio() {
    semilla = (multiplicador * semilla + incremento) % modulo;
    return semilla / modulo;
}

function mostrarImagenAleatoria() {
    if (bingoImages.length > 0) {
        const imagenesNoMostradas = bingoImages.filter((imagen, index) => !balotasMostradas.includes(index));

        if (imagenesNoMostradas.length > 0) {
            const randomNumberIndex = Math.floor(generarNumeroAleatorio() * imagenesNoMostradas.length);
            const selectedImage = imagenesNoMostradas[randomNumberIndex];

            balotasMostradas.push(bingoImages.indexOf(selectedImage));

            if (balotasMostradas.length >= bingoImages.length) {
                Swal.fire({
                    icon: 'info',
                    title: 'Fin del juego',
                    text: 'Gracias por participar',
                    iconColor: '#FF69B4',
                    confirmButtonText: 'Ver juego',
                    customClass: {
                        popup: 'my-custom-modal-class',
                        title: 'my-custom-title-class',
                        content: 'my-custom-content-class',
                    },
                });
            }

            const bingoImageElement = document.getElementById("bingo-image");
            bingoImageElement.src = selectedImage;
            bingoImageElement.style.display = "block";

            const numeroEnImagen = parseInt(selectedImage.match(/\d+/)[0]);
            colorearNumeroEnTablero(numeroEnImagen);

            const imageElement = document.createElement("img");
            imageElement.src = selectedImage;

            const imagesContainer = document.getElementById("bingo-images-container");
            imagesContainer.appendChild(imageElement);

            reproducirSonido(numeroEnImagen);
        }
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Fin del juego',
            text: 'Gracias por participar'
        });
    }
}

function colorearNumeroEnTablero(numero) {
    const numeroEnTablero = document.querySelector(`.bingo-number[data-number="${numero}"]`);

    if (numeroEnTablero) {
        numeroEnTablero.classList.add("coloreado");
    }
}

function reproducirSonido(numero) {
    const audioElement = document.getElementById("miAudio");
    audioElement.src = `https://github.com/geralcamino/Bingo2.0/raw/cambios_angie/audios/${numero}.mp3`;
    audioElement.play();
}

function generarNumerosTablero() {
    let numerosHTML = "";

    const letras = ["B", "I", "N", "G", "O"];

    for (let i = 0; i < 5; i++) {
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

function reiniciarJuego() {
    Swal.fire({
        title: '¿Seguro deseas reiniciar el juego?',
        text: 'Todos los progresos se perderán',
        icon: 'warning',
        iconColor: '#FF69B4',
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
    const bingoImageElement = document.getElementById("bingo-image");
    bingoImageElement.style.display = "none";

    const numerosEnTablero = document.querySelectorAll(".bingo-number");
    numerosEnTablero.forEach(numero => {
        numero.classList.remove("coloreado");
    });

    balotasMostradas.length = 0;

    const imagesContainer = document.getElementById("bingo-images-container");
    imagesContainer.innerHTML = "";
}

function reproducirSonidosEnArray() {
    const audioElement = document.getElementById("miAudio");
    const delay = 2000; // Delay between playing each sound in milliseconds

    let index = 0;

    function playSoundWithDelay() {
        if (index < balotasMostradas.length) {
            const numero = balotasMostradas[index];
            audioElement.src = `https://github.com/geralcamino/Bingo2.0/raw/cambios_angie/audios/${numero+1}.mp3`;
            audioElement.play();

            index++;

            // Play the next sound after the delay
            setTimeout(playSoundWithDelay, delay);
        }
    }

    // Start playing the sounds from the beginning of balotasMostradas
    playSoundWithDelay();
}


