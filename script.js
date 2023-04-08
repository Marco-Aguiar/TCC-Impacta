const form = document.querySelector('form');
const listaProjetos = document.querySelector('#lista-projetos');

let projetos = [];

const progresso = document.querySelector('#customRange1');
progresso.addEventListener('click', () => {
  var valor = document.querySelector("#customRange1").value + "%"
  console.log(valor)
  const p = document.querySelector("#valor");
  p.textContent = valor;
  document.getElementById("valor").style.display = "block"; document.getElementById("valor").style.color = "green";
  document.getElementById("valor").style.fontSize = "20px"; document.getElementById("valor").style.fontWeight = "700";
  });

function adicionarProjeto(event) {
  event.preventDefault();
  document.getElementById("valor").style.display = "none";

  const projeto = {
    nome: form.nome.value,
    descricao: form.descricao.value,
    dataInicio: form.dataInicio.value,
    dataFim: form.dataFim.value,
    progresso: form.progresso.value
  };

  projetos.push(projeto);
  exibirProjetos();

  form.reset();
  form.nome.focus();
}

function exibirProjetos() {
  listaProjetos.innerHTML = '';

  for (const [index, projeto] of projetos.entries()) {
    const li = document.createElement('li');

    const h3 = document.createElement('h3');
    h3.textContent = projeto.nome;

    const pDescricao = document.createElement('p');
    pDescricao.textContent = projeto.descricao;

    const pDataInicio = document.createElement('p');
    pDataInicio.textContent = `Data de Início: ${projeto.dataInicio}`;

    const pDataFim = document.createElement('p');
    pDataFim.textContent = `Data Fim: ${projeto.dataFim}`;

    const progress = document.createElement('progress');
    progress.value = projeto.progresso;
    progress.max = 100;

    const buttonEditar = document.createElement('button');
    buttonEditar.type = 'button';
    buttonEditar.style.marginLeft = "2rem";
    buttonEditar.style.borderRadius = "3px";
    buttonEditar.textContent = 'Editar';
    buttonEditar.addEventListener('click', () => {
      editarFormulario(index);
    });

    const buttonExcluir = document.createElement('button');
    buttonExcluir.type = 'button';
    buttonExcluir.style.marginLeft = "2rem";
    buttonExcluir.style.borderRadius = "3px";
    buttonExcluir.textContent = 'Excluir';
    buttonExcluir.addEventListener('click', () => {
      excluirProjeto(index);
    });

    li.appendChild(h3);
    li.appendChild(pDescricao);
    li.appendChild(pDataInicio);
    li.appendChild(pDataFim);
    li.appendChild(progress);
    li.appendChild(buttonEditar);
    li.appendChild(buttonExcluir);

    listaProjetos.appendChild(li);
  }
}

function editarFormulario(index) {
  const projeto = projetos[index];

  form.nome.value = projeto.nome;
  form.descricao.value = projeto.descricao;
  form.data.value = projeto.data;
  form.progresso.value = projeto.progresso;

  const buttonSalvar = document.createElement('button');
  buttonSalvar.type = 'submit';
  buttonSalvar.style.marginLeft = "2rem";
  buttonSalvar.style.borderRadius = "3px";
  buttonSalvar.textContent = 'Salvar';
  buttonSalvar.addEventListener('click', (event) => {
    event.preventDefault();

    projeto.nome = form.nome.value;
    projeto.descricao = form.descricao.value;
    projeto.data = form.data.value;
    projeto.progresso = form.progresso.value;
    console.log(form.progresso.value)

    exibirProjetos();

    form.reset();
    form.nome.focus();
  });

  form.querySelector('button[type=submit]').replaceWith(buttonSalvar);
}

function excluirProjeto(index) {
  projetos.splice(index, 1);
  exibirProjetos();
}

form.addEventListener('submit', adicionarProjeto);

const botaoExcluir = document.querySelectorAll('.excluir');

botaoExcluir.forEach(botao => {
  botao.addEventListener('click', () => {
    const id = botao.dataset.id;
    const projeto = document.querySelector(`#projeto-${id}`);
    
    // Exibir modal de confirmação
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="modal">
        <p>Deseja excluir este projeto?</p>
        <button class="btn-confirmar">Confirmar</button>
        <button class="btn-cancelar">Cancelar</button>
      </div>
      <div class="overlay"></div>
    `;
    document.body.appendChild(modal);

    const btnConfirmar = modal.querySelector('.btn-confirmar');
    const btnCancel = modal.querySelector('.btn-cancelar');

    // Remover projeto se o usuário confirmar
    btnConfirmar.addEventListener('click', () => {
      projeto.remove();
      modal.remove();
    });
  });
});