const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
const formAdicionarTarefa = document.querySelector(".app__form-add-task");
const textarea = document.querySelector(".app__form-textarea");
const ulTarefas = document.querySelector(".app__section-task-list");
const btnConfirmTarefa = document.querySelector(
  ".app__form-footer__button--confirm"
);
const btnCancelTarefa = document.querySelector(
  ".app__form-footer__button--cancel"
);
const btnRemoverTarefasConcluidas = document.querySelector(
  "#btn-remover-concluidas"
);
const btnRemoverTodasTarefas = document.querySelector("#btn-remover-todas");
const paragraphTarefaEmAndamento = document.querySelector(
  ".app__section-active-task-description"
);

const tarefasModule = function () {
  let tarefas = [];

  function carregarTarefas() {
    tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  }

  function obterTarefas() {
    return tarefas;
  }

  function atualizarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  function removerTarefasConcluidas() {
    tarefas = tarefas.filter((tarefa) => !tarefa.concluida);
    atualizarTarefas();
  }

  function removerTodasTarefas() {
    tarefas = [];
    atualizarTarefas();
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
    atualizarTarefas,
    removerTarefasConcluidas,
    removerTodasTarefas,
    mostrarTarefa,
    listarTarefas,
  };
};

const tarefas = tarefasModule();
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

document.addEventListener("DOMContentLoaded", () => {
  tarefas.carregarTarefas();
  tarefas.listarTarefas();
});

btnAdicionarTarefa.addEventListener("click", () => {
  toggleFormAdicionarTarefa();
});

btnConfirmTarefa.addEventListener("click", (evento) => {
  evento.preventDefault();
  const tarefa = {
    descricao: textarea.value,
  };
  tarefas.obterTarefas().push(tarefa);
  tarefas.atualizarTarefas();
  tarefas.mostrarTarefa(tarefa);
  textarea.value = "";
  formAdicionarTarefa.classList.add("hidden");
});

btnCancelTarefa.addEventListener("click", limparFormulario);

document.addEventListener("FocoFinalizado", () => {
  if (tarefaSelecionada && liTarefaSelecionada) {
    liTarefaSelecionada.classList.remove("app__section-task-list-item-active");
    liTarefaSelecionada.classList.add("app__section-task-list-item-complete");
    liTarefaSelecionada
      .querySelector(".app_button-edit")
      .setAttribute("disabled", "true");
    tarefaSelecionada.concluida = true;
    tarefas.atualizarTarefas();
    removerTarefaEmAndamento();
  }
});

const removerTarefas = (removerConcluidas) => {
  const seletor = removerConcluidas
    ? ".app__section-task-list-item-complete"
    : ".app__section-task-list-item";
  document.querySelectorAll(seletor).forEach((tarefa) => {
    tarefa.remove();
  });
  removerConcluidas
    ? tarefas.removerTarefasConcluidas()
    : tarefas.removerTodasTarefas();
};

btnRemoverTarefasConcluidas.addEventListener("click", () =>
  removerTarefas(true)
);
btnRemoverTodasTarefas.addEventListener("click", () => removerTarefas(false));

function removerTarefaEmAndamento() {
  paragraphTarefaEmAndamento.textContent = "";
  tarefaSelecionada = null;
  liTarefaSelecionada = null;
}

function limparFormulario() {
  textarea.value = "";
  toggleFormAdicionarTarefa();
}

function toggleFormAdicionarTarefa() {
  formAdicionarTarefa.classList.toggle("hidden");
}

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
  button.onclick = () => {
    const novaDescricao = prompt("Qual é a nova descrição da tarefa?");
    if (novaDescricao) {
      paragraph.textContent = novaDescricao;
      tarefa.descricao = novaDescricao;
      tarefas.atualizarTarefas();
    }
  };

  const img = document.createElement("img");
  img.setAttribute("src", "imagens/edit.png");

  button.append(img);
  li.append(svg);
  li.append(paragraph);
  li.append(button);

  if (tarefa.concluida) {
    li.classList.add("app__section-task-list-item-complete");
    button.setAttribute("disabled", "true");
  } else {
    li.onclick = () => {
      document
        .querySelectorAll(".app__section-task-list-item-active")
        .forEach((tarefaAtiva) => {
          tarefaAtiva.classList.remove("app__section-task-list-item-active");
        });

      if (tarefaSelecionada === tarefa) {
        removerTarefaEmAndamento();
        return;
      }

      tarefaSelecionada = tarefa;
      liTarefaSelecionada = li;
      paragraphTarefaEmAndamento.textContent = tarefa.descricao;
      li.classList.add("app__section-task-list-item-active");
    };
  }

  return li;
}
