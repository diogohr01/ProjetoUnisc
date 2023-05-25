window.onload = function () {

    let botao = document.getElementById("botaoAcessar");
    botao.addEventListener("click", function (event) {
        let emailDigitado = document.getElementById("inputEmail").value.trim();
        let senhaDigitada = document.getElementById("inputPassword").value.trim();
        let dados = {
            email: emailDigitado,
            password: senhaDigitada
        };
        if (emailDigitado != "" && senhaDigitada != "") {
            mostrarSpinner();
            console.log(dados);
            dados = JSON.stringify(dados);
            let request = {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: dados
            }
            fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/users/login', request)
                .then(function (resultado) {
                    ocultarSpinner();
                    if (resultado.status == 200 || resultado.status == 201) {
                        sweetalert2('success', 'Login realizado com sucesso', "./tarefas.html");
                        return resultado.json();
                    } else {
                        sweetalert2('error', 'Usuário e/ou senha inválidos', "./index.html")
                        throw resultado;
                    }
                })
                .then(function (data) {
                    //manipulamos a resposta
                    sessionStorage.setItem("jwt", JSON.stringify(data.jwt));
                    console.log(data)
                })
                .catch(function (error) {
                    sweetalert2('error', 'Erro ao conectar ao Servidor', "./index.html");
                    ocultarSpinner();
                    console.log(error)
                });
        }
        event.preventDefault();
    });
}