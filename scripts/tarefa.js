//os recursos são acionados no final do carregamento da pag 
window.onload = function () {
  renderizarSkeletons(5, ".tarefas-pendentes");
  //testando se o usuário esta logado
  let semPermissao = this.sessionStorage.getItem("jwt");
  if (!semPermissao) {
    sweetalert2('error', 'Sessão Finalizada', "./index.html")
  }

  //Usando o botão finalizar tarefa
  document.getElementById('closeApp').addEventListener("click", function (event) {
    event.preventDefault();
    sessionStorage.removeItem('jwt');
    verificarLogin();
  });

  //Função verifica se a sessão expirou
  function verificarLogin() {
    let semPermissao = this.sessionStorage.getItem("jwt");
    if (!semPermissao) {
      sweetalert2('error', 'Sessão Finalizada', "./index.html")
    }
  }

  //Função para adicionar nome do usuário
  function adicionarNome() {
    let request = {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization: JSON.parse(this.sessionStorage.getItem("jwt"))
      }
    }
    fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/users/getMe', request)
      .then(function (resultado) {
        if (resultado.status == 200 || resultado.status == 201) {
          return resultado.json();
        }
        else {
          if (resultado.status == 400) {
            sweetalert2('error', 'Erro ao buscar infomação do Usuário', "./signup.html");
            return resultado.json();
          }
          throw resultado;
        }
      })
      .then(function (data) {
        document.getElementById("nomeUsuario").innerHTML = `${data.firstName} ${data.lastName}`;
      })
  }
  //chamando função
  adicionarNome()

  //Listando tarefas do usuário logado e salvas na API
  function buscarTarefasApi() {
    let request = {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization: JSON.parse(this.sessionStorage.getItem("jwt"))//pegando Token da local session
      },
    }
    fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/', request)
      .then(function (resultado) {
        removerSkeleton(".tarefas-pendentes");
        if (resultado.status == 200 || resultado.status == 201) {
          return resultado.json();
        }
        else {
          if (resultado.status == 400) {
            sweetalert2('error', 'Não foi possível carregar as tarefas', "./signup.html");
            return resultado.json();
          }
          throw resultado;
        }
      })
      .then(function (data) {
        removerSkeleton(".tarefas-pendentes");
        //manipulamos a resposta 
        data.forEach((tarefas) => {
          const criaLi = document.createElement("li");
          criaLi.setAttribute('class', 'tarefa');

          //criaLi.setAttribute('id', tarefas.id)
          let completa;
          if (tarefas.completed == false) {
            completa = true;
            criaLi.innerHTML =
            `
            <div class="not-done" onclick="marcarConcluida(${tarefas.id},${completa})" id="${tarefas.id}"></div>
              <div class="descricao">
                  <p class="nome">${tarefas.description}</p>
                  <p class="timestamp"><i class="far fa-calendar-alt"></i> ${dayjs(tarefas.createdAt).format('DD/MM/YY')}</p>
              </div>
            `
          }
          else {
            completa = false
            criaLi.innerHTML =
            `<div class="done"></div>
              <div class="descricao">
              <p class="nome">${tarefas.description}</p>
              <div>
                  <button><i id="${tarefas.id}" class="fas fa-undo-alt change" onclick="marcarConcluida(${tarefas.id},${completa})"></i></button>
                  <button><i id="${tarefas.id}" class="far fa-trash-alt" onclick="excluirTarefa(${tarefas.id})"></i></button>
              </div>
              </div>`

            
          }
          if (tarefas.completed == false) {
            document.getElementById("addTarefasPendentes").appendChild(criaLi)
          }
          else {
            document.getElementById("addTarefasTerminadas").appendChild(criaLi)
          }
        });
      })
  }

  buscarTarefasApi();

  document.getElementById('botaoNovaTarefa').addEventListener("click", function (event) {
    if (document.getElementById("novaTarefa").value.length > 5) {
      let dadosTarefa = {
        description: document.getElementById("novaTarefa").value,
        completed: "false"
      };
      dadosTarefa = JSON.stringify(dadosTarefa);
      let request = {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          Authorization: JSON.parse(sessionStorage.getItem("jwt"))
        },
        body: dadosTarefa
      }
      fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/`, request)
        .then(function (resultado) {
          if (resultado.status == 200 || resultado.status == 201) {
            return resultado.json();
          }
          else {
            sweetalert2('warning', 'Erro ao cadastrar a tarefa', "./tarefas.html")
            throw resultado;
          }
        })
        .then(function (data) {
          sweetalert2('success', 'Tarefa cadastrada', "./tarefas.html")
          //manipulamos a resposta
        })
        .catch(function (error) {
          console.log(error)
        });
    }else{
      sweetalert2('warning', 'Tarefa deseja 5 caracteres', "./tarefas.html")
    }
    event.preventDefault();
  })
}