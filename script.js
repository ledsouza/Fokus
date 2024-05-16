const html = document.querySelector("html")
const focoBt = document.querySelector(".app__card-button--foco")
const curtoBt = document.querySelector(".app__card-button--curto")
const longoBt = document.querySelector(".app__card-button--longo")
const imagemContexto = document.querySelector(".app__image")

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
}