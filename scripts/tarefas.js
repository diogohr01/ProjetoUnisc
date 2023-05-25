//os recursos são acionados no final do carregamento da pag 
window.onload = function () { 

//Área usada para chamar dados necessários da sessão do usuário
  const nomeUsuario = document.getElementById('nomeUsuario');
  const botaoFinalizarSessao = document.getElementById('closeApp');
  botaoFinalizarSessao.addEventListener('click', finalizarSessao);

  const logado = localStorage.getItem('logado'); //Pegando o email do último usuário que realizou login
  const dadosUsuario = JSON.parse(localStorage.getItem(logado)); //Copiando dados do usuário logado
  nomeUsuario.innerHTML =  `${dadosUsuario.nome} ${dadosUsuario.sobrenome}` //aparcer o nome do usuário

//Função usada para encerrar sessão do usuário
  function finalizarSessao(){
    localStorage.removeItem("logado");
   //window.location.href = "./index.html"; //redirecionando para pag inicial

   Swal.fire({ // Usando a biblioteca sweetalert2
    icon: 'success',
    title: 'Sessão finalizada',
    showConfirmButton: false,
    timer: 1500
  })
.then((result) => { //Redirecinando para tela inicial apois apresentar o alerta
    if(result.dismiss=== Swal.DismissReason.timer){
        window.document.location.href = "./index.html";
    }
  });
  }

//Área usada para chamar dados necessários Criar tarefas pendentes
  const botao = document.getElementById('adicionar');
  botao.addEventListener('click', salvarDados);
  //const areaTarefa = document.getElementById('areaTarefas');
  const tituloTarefa = document.getElementById('novaTarefa'); // Atribuindo a tituloTarefa dados nome da nova tarefa

  function salvarDados(event) {

    if (tituloTarefa.value != "" ){

        let dadosDigitados = {
          titulo: tituloTarefa.value,
        }

      criarTarefaPendente(dadosDigitados.titulo);
      limparCampo();

    }
    event.preventDefault();
  }

  function criarTarefaPendente(titulo) {

      let now = new Date; //now recebe data atual
      dataFormatada = now.toLocaleDateString('pt-BR', {timeZone: 'UTC'}); //formatando a data para o padrão brasileiro
      const criarLi = document.createElement("li");
      criarLi.setAttribute('class', 'tarefa');
      criarLi.innerHTML = 
        `
        <div class="not-done"></div>
        <div class="descricao">
          <p class="nome">${titulo}</p>
          <p class="timestamp">Criada em: ${dataFormatada}</p>
        </div>
        `
        document.getElementById('areaTarefas').appendChild(criarLi);
        
  }

  function limparCampo(){
    tituloTarefa.value="";
  }

}