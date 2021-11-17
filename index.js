const colores = [
    "verde",
    "rojo",
    "amarillo",
    "azul"
];

let eleccionMaquina = [];
let eleccionJugador = [];
let nivel = 0;
let juegoEmpezado = false;
let puedeRepetir = true;

const botonVerde = document.getElementById("verde");
const botonRojo = document.getElementById("rojo");
const botonAmarillo = document.getElementById("amarillo");
const botonAzul = document.getElementById("azul");
const botonNuevoJuego = document.getElementById("nuevo-juego");
const botonRepetirSecuencia = document.getElementById("repetir-secuencia");
const subtitulo = document.getElementById("subtitulo");

botonNuevoJuego.addEventListener("click", empezarNuevoJuego);

botonRepetirSecuencia.addEventListener("click", repetirSecuencia);

botonVerde.addEventListener("click", () => {
    reproducirAudio("verde");
    eleccionJugador.push("verde");
    if (juegoEmpezado){
        chequearResultado(eleccionJugador.length - 1);
    }
    botonVerde.blur();
});

botonRojo.addEventListener("click", () => {
    reproducirAudio("rojo");
    eleccionJugador.push("rojo");
    if (juegoEmpezado){
        chequearResultado(eleccionJugador.length - 1);
    }
    botonRojo.blur();
});

botonAmarillo.addEventListener("click", () => {
    reproducirAudio("amarillo");
    eleccionJugador.push("amarillo");
    if (juegoEmpezado){
        chequearResultado(eleccionJugador.length - 1);
    }
    botonAmarillo.blur();
});

botonAzul.addEventListener("click", () => {
    reproducirAudio("azul");
    eleccionJugador.push("azul");
    if (juegoEmpezado){
        chequearResultado(eleccionJugador.length - 1);
    }
    botonAzul.blur();
});


// *******************************
// ********** FUNCIONES **********
// *******************************

function empezarNuevoJuego(){
    nivel = 0;
    eleccionMaquina = [];
    juegoEmpezado = true;
    botonNuevoJuego.disabled = true;
    proximaSecuencia();
}

function repetirSecuencia(){
    if (puedeRepetir){
        puedeRepetir = false;
        // for(let i = 0; i < eleccionMaquina.length; i++){
        //         animacionApretarBoton(eleccionMaquina[i]);
        //         reproducirAudio(eleccionMaquina[i]);
        // }
    }else{
        alert("No hay más repeticiones en este nivel.");
    }
}

function proximaSecuencia(){
    nivel++;
    puedeRepetir = true;
    subtitulo.innerText = "Nivel " + nivel;
    eleccionJugador = [];

    let numeroAleatorio = Math.floor(Math.random() * 4);
    let colorAleatorio = colores[numeroAleatorio];
    eleccionMaquina.push(colorAleatorio);
    animacionApretarBoton(colorAleatorio);
    reproducirAudio(colorAleatorio);
}

function chequearResultado(nivelActual){
    if(eleccionMaquina[nivelActual] === eleccionJugador[nivelActual]){
        if (eleccionJugador.length === eleccionMaquina.length){
            setTimeout(()=>{
                proximaSecuencia();
            },1000);
        }
    }else{
        reproducirAudio("incorrecto");
        animacionPartidaPerdida();
        subtitulo.innerText = "Perdiste! 😭"
        botonNuevoJuego.disabled = false;
    }
}

function reproducirAudio(color){
    const audio = new Audio("./audio/audio-" + color + ".mp3");
    audio.play();
}

function animacionApretarBoton(color){
    document.getElementById(color).classList.add("apretado");
    setTimeout(() => {
        document.getElementById(color).classList.remove("apretado");
    },200)
}

function animacionPartidaPerdida(){
    document.body.classList.add("equivocado");
    setTimeout(() => {
        document.body.classList.remove("equivocado");
    },200);
}

