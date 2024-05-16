const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const imagemContexto = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const botaoIniciarOuPausar = document.querySelector("#start-pause");
const musicaToggle = document.querySelector("#alternar-musica");
const musica = new Audio("sons/luna-rise-part-one.mp3");
musica.loop = true;

let tempoDecorridoEmSegundos = 5;
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
    zerar();
    alert("Tempo finalizado!");
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  console.log(
    "🚀 ~ contagemRegressiva ~ tempoDecorridoEmSegundos:",
    tempoDecorridoEmSegundos
  );
};

botaoIniciarOuPausar.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervalId) {
    zerar();
    return;
  }
  intervalId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
  clearInterval(intervalId);
  intervalId = null;
}
