const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
const formAdicionarTarefa = document.querySelector(".app__form-add-task");

let tarefas = [];

btnAdicionarTarefa.addEventListener("click", () => {
  formAdicionarTarefa.classList.toggle("hidden");
});

formAdicionarTarefa.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const textarea = document.querySelector(".app__form-textarea");
  const tarefa = {
    descricao: textarea.value,
  };
  tarefas.push(tarefa);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
});
