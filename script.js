const words = [
  'californication',
  'plataforma5',
  'black',
  'summer',
  'flea',
  'aeroplane',
  'peppers',
  'unlimited',
  'arcadium',
  'love',
  'getaway',
  'stadium',
  'quixoticelixer',
  'quarter',
  'snow',
  'dylan',
  'zephyr',
  'funky',
  'chili',
  'skyfall', 
  'skyrim', 
  'ghost',
  'darkness'

];

// Referencias DOM
const randomWord = document.getElementById("randomWord");
const text = document.getElementById("text");
const timeSpan = document.getElementById("timeSpan");
const scoreSpan = document.getElementById("score");
const endGameContainer = document.getElementById("end-game-container");
const main = document.querySelector(".main");

let time = 10;
let score = 0;
let palabraAleatoria;

// Generar palabra random
function randomWords() {
  const indice = Math.floor(Math.random() * words.length);
  return words[indice];
}

// Mostrar palabra
function addToDOM() {
  palabraAleatoria = randomWords();
  randomWord.textContent = palabraAleatoria;
}

// Actualizar tiempo
function actualizarTiempo() {
  time--;
  timeSpan.textContent = time + "s";

  if (time <= 0) {
    clearInterval(intervalo);
    gameOver();
  }
}

// Actualizar score
function updateScore() {
  score++;
  scoreSpan.textContent = score;

  // Activamos animación
  scoreSpan.classList.add("pop");

  // La removemos para poder repetirla
  setTimeout(() => {
    scoreSpan.classList.remove("pop");
  }, 300);
}

// Game Over
function gameOver() {
  text.disabled = true; // más limpio que eliminar todo
  main.style.display = "none";

  endGameContainer.innerHTML = `
    <h2>⏰ Te quedaste sin tiempo</h2>
    <p>Tu puntaje final fue: ${score}</p>
    <button onclick="location.reload()">Volvé a empezar</button>
  `;
}

text.addEventListener("input", function (e) {
  const palabraIngresada = e.target.value;

  // Si coincide
  if (palabraIngresada.toLowerCase() === palabraAleatoria.toLowerCase()) {
    updateScore();
    time += 3;
    text.value = "";
    addToDOM();
  } 
  // Si está mal y ya escribió la longitud completa
  else if (palabraIngresada.length >= palabraAleatoria.length) {
    
    text.classList.add("shake");

    // Removemos la clase después de la animación
    setTimeout(() => {
      text.classList.remove("shake");
    }, 300);
  }
});

const themeToggle = document.getElementById("themeToggle");

// Estado inicial
document.body.classList.add("dark");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

  // Cambiar ícono
  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "🌙";
  } else {
    themeToggle.textContent = "☀️";
  }
});

// Inicializar juego
addToDOM();
const intervalo = setInterval(actualizarTiempo, 1000);
