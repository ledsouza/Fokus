const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const imagemContexto = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const botaoIniciarOuPausar = document.querySelector("#start-pause");
const textoIniciarOuPausar = document.querySelector("#start-pause span");
const iconeIniciarOuPausar = document.querySelector(
  ".app__card-primary-butto-icon"
);
const tempoNaTela = document.querySelector("#timer");
const musicaToggle = document.querySelector("#alternar-musica");
const musica = new Audio("sons/luna-rise-part-one.mp3");
const audioIniciar = new Audio("sons/play.wav");
const audioPausar = new Audio("sons/pause.mp3");
const audioAlert = new Audio("sons/beep.mp3");
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervalId = null;

// Contextos
focoContexto = "foco";
curtoContexto = "descanso-curto";
longoContexto = "descanso-longo";

// Estilização de ativo
botaoAtivo = "active";

focoBt.addEventListener("click", () => {
  alterarContexto(focoContexto);
  focoBt.classList.add(botaoAtivo);
});

curtoBt.addEventListener("click", () => {
  alterarContexto(curtoContexto);
  curtoBt.classList.add(botaoAtivo);
});

longoBt.addEventListener("click", () => {
  alterarContexto(longoContexto);
  longoBt.classList.add(botaoAtivo);
});

function alterarContexto(contexto) {
  html.setAttribute("data-contexto", contexto);
  imagemContexto.setAttribute("src", `imagens/${contexto}.png`);
  botoes.forEach(function (botao) {
    botao.classList.remove(botaoAtivo);
  });

  switch (contexto) {
    case focoContexto:
      titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
      break;
    case curtoContexto:
      titulo.innerHTML = `
            Que tal dar uma respirada?<br> 
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
      break;
    case longoContexto:
      titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
      break;
    default:
      break;
  }
}

musicaToggle.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    audioAlert.play();
    alert("Tempo finalizado!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

botaoIniciarOuPausar.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervalId) {
    textoIniciarOuPausar.textContent = "Começar";
    iconeIniciarOuPausar.setAttribute("src", "imagens/play_arrow.png");
    audioPausar.play();
    zerar();
    return;
  }
  textoIniciarOuPausar.textContent = "Pausar";
  iconeIniciarOuPausar.setAttribute("src", "imagens/pause.png");
  audioIniciar.play();
  intervalId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
  clearInterval(intervalId);
  intervalId = null;
}

function mostrarTempo() {
  tempo = tempoDecorridoEmSegundos;
  tempoNaTela.innerHTML = `${tempo}`;
}

mostrarTempo();
