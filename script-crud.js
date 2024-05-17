const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
const formAdicionarTarefa = document.querySelector(".app__form-add-task");
const ulTarefas = document.querySelector(".app__section-task-list");

const tarefasModule = function () {
  let tarefas = [];

  function carregarTarefas() {
    tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  }

  function obterTarefas() {
    return tarefas;
  }

  function mostrarTarefa(tarefa) {
    const liTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(liTarefa);
  }

  function listarTarefas() {
    tarefas.forEach((tarefa) => {
      mostrarTarefa(tarefa);
    });
  }

  return {
    carregarTarefas,
    obterTarefas,
    mostrarTarefa,
    listarTarefas,
  };
};

const tarefas = tarefasModule();
document.addEventListener("DOMContentLoaded", () => {
  tarefas.carregarTarefas();
  tarefas.listarTarefas();
});

btnAdicionarTarefa.addEventListener("click", () => {
  formAdicionarTarefa.classList.toggle("hidden");
});

formAdicionarTarefa.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const textarea = document.querySelector(".app__form-textarea");
  const tarefa = {
    descricao: textarea.value,
  };
  tarefas.obterTarefas().push(tarefa);
  localStorage.setItem("tarefas", JSON.stringify(tarefas.obterTarefas()));
  tarefas.mostrarTarefa(tarefa);
  textarea.value = "";
  formAdicionarTarefa.classList.add("hidden");
});

function criarElementoTarefa(tarefa) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svg = document.createElement("svg");
  svg.innerHTML = `
  <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
  </svg>
  `;

  const paragraph = document.createElement("p");
  paragraph.classList.add("app__section-task-list-item-description");
  paragraph.textContent = tarefa.descricao;

  const button = document.createElement("button");
  button.classList.add("app_button-edit");

  const img = document.createElement("img");
  img.setAttribute("src", "imagens/edit.png");

  button.append(img);
  li.append(svg);
  li.append(paragraph);
  li.append(button);
  return li;
}
