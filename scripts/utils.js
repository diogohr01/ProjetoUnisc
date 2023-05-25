//Função para usar Alertas do sweetalert2
function sweetalert2(icon, title, link) {
    Swal.fire({ // Usando a biblioteca sweetalert2
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 1000
    })
        .then((result) => { //Redirecinando para tela inicial apois apresentar o alerta
            if (result.dismiss === Swal.DismissReason.timer) {
                window.document.location.href = link;
            }
        });
}

//função para limpar uma variavel
function limparCampo(campo) {
    campo.value = "";
}

function excluirTarefa(id) {

    let request = {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            Authorization: JSON.parse(sessionStorage.getItem("jwt"))
        }
    }

    fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${id}`, request)
        .then(function (resultado) {
            if (resultado.status == 200 || resultado.status == 201) {
                sweetalert2('success', 'Excluído com sucesso', "./tarefas.html")
                return resultado.json();

            } else {

                //sweetalert2('error','Usuário e/ou senha inválidos',"./index.html")
                throw resultado;
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    event.preventDefault();
}


function marcarConcluida(id, completa) {

    let dadosTarefaConcluida = {
        completed: completa
    };

    dadosTarefaConcluida = JSON.stringify(dadosTarefaConcluida);

    let request = {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
            Authorization: JSON.parse(sessionStorage.getItem("jwt"))
        },
        body: dadosTarefaConcluida
    }

    fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${id}`, request)
        .then(function (resultado) {
            if (resultado.status == 200 || resultado.status == 201) {
                return resultado.json();
            } else {
                sweetalert2('error', 'Usuário e/ou senha inválidos', "./tarefas.html")
                throw resultado;
            }
        })
        .then(function (data) {
            if(data.completed === true){
                sweetalert2('success', 'Tarefa arquivada', "./tarefas.html")
            }
            else{
            sweetalert2('success', 'Tarefa desarquivada', "./tarefas.html")
            }
            //manipulamos a resposta
        })
        .catch(function (error) {
            console.log(error)
        });

    event.preventDefault();
}
