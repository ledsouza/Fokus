const html = document.querySelector("html")
const focoBt = document.querySelector(".app__card-button--foco")
const curtoBt = document.querySelector(".app__card-button--curto")
const longoBt = document.querySelector(".app__card-button--longo")
const imagemContexto = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")

// Contextos
focoContexto = "foco"
curtoContexto = "descanso-curto"
longoContexto = "descanso-longo"

focoBt.addEventListener("click", () => {
    alterarContexto(focoContexto)
})

curtoBt.addEventListener("click", () => {
    alterarContexto(curtoContexto)
})

longoBt.addEventListener("click", () => {
    alterarContexto(longoContexto)
})

function alterarContexto(contexto) {
    html.setAttribute("data-contexto", contexto)
    imagemContexto.setAttribute("src", `imagens/${contexto}.png`)
    
    switch (contexto) {
        case focoContexto:
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case curtoContexto:
            titulo.innerHTML = `
            Que tal dar uma respirada?<br> 
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case longoContexto:
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }
}