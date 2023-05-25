window.onload = function () {
    function InserirImagem(url) {
        let img = document.createElement("img");
        img.src=url;
        }
    
    let botao = document.getElementById("criar");
   botao.style.backgroundColor = "gray"
   let imagemchave = document.getElementById("imagemb")
   document
    botao.addEventListener("click", function (event) {
        event.preventDefault();
        cadastrar();
    });

    function cadastrar() {
        //Salvando dados digitados pelo usuário
        let nomeDigitado = document.getElementById("nome").value.trim();
        let sobrenomeDigitado = document.getElementById("sobrenome").value.trim();
        let emailDigitado = document.getElementById("email").value.trim();
        let senhaDigitada = document.getElementById("senha").value.trim();
        let confimaSenhadigitada = document.getElementById("confirmaSenha").value.trim();

        
        

        //Salvando informações digitadas em um obejeto literal
        let dados = {
            firstName: nomeDigitado,
            lastName: sobrenomeDigitado,
            email: emailDigitado,
            password: senhaDigitada
        };

        // Convertendo de javascript para uma String JSON 
        dados = JSON.stringify(dados);
        //Criando um objeto com informações do cabeçario da API
        let request = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: dados
        }
        if (nomeDigitado != "" && sobrenomeDigitado != "" && emailDigitado != "" && senhaDigitada != "" && confimaSenhadigitada != "") {
            mostrarSpinner();
            if (senhaDigitada != confimaSenhadigitada) {
                sweetalert2('error', 'Senhas não conferem', "./signup.html")
            }else {//Enviando dados para a API
                fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/users', request)
                    .then(function (resultado) {
                        ocultarSpinner();
                        if (resultado.status == 200 || resultado.status == 201) {
                            sweetalert2('success', 'Cadastro realizado com sucesso', "./index.html");
                            return resultado.json();
                        }
                        else {
                            if (resultado.status == 400) {
                                sweetalert2('warning', 'Cadastro já existe', "./signup.html");
                                return resultado.json();
                            }
                            throw resultado;
                        }
                    })
                    .catch(function (error) {
                        ocultarSpinner();
                        sweetalert2('error', 'Erro ao conectar ao Servidor', "./signup.html");
                        console.log(error)
                    });
            }
        }
    }

    //Avisa que falta preeencher nome
     document.getElementById("nome").addEventListener('blur', function () {
        if (document.getElementById("nome").value === '') {
            document.getElementById("avisoNome").innerHTML = `Preencha este campo`
        }
        else {
            document.getElementById("avisoNome").innerHTML = ``
        }
    });

    //Avisa que falta preeencher sobrenome
    document.getElementById("sobrenome").addEventListener('blur', function () {
        if (document.getElementById("sobrenome").value === '') {
            document.getElementById("avisoSobrenome").innerHTML = `Preencha este campo`
        }
        else {
            document.getElementById("avisoSobrenome").innerHTML = ``
        }
    });

    //Avisa que falta preeencher email
    document.getElementById("email").addEventListener('blur', function () {
        if (document.getElementById("email").value === '') {
            document.getElementById("avisoEmail").innerHTML = `Preencha este campo`
        }
        else {
            document.getElementById("avisoEmail").innerHTML = ``
        }
    });
    //Dizer se o email é invalido
     document.getElementById("email").addEventListener('keyup', (event)=> {
     if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("email").value)){
     event.target.style.background = "green"
     
     
     }else{
        event.target.style.background = "pink"
        document.getElementById("avisoEmail").innerHTML = `Email inválido`
        
        
     }});
    document.getElementById("senha").addEventListener('blur', function () {
        if (document.getElementById("senha").value === '') {
            document.getElementById("avisoSenha").innerHTML = `Preencha este campo`
        }
        else {
            document.getElementById("avisoSenha").innerHTML = ``
        }
    });

    //Avisa que falta preeencher confirmação da senha
    document.getElementById("confirmaSenha").addEventListener('blur', function () {
        if (document.getElementById("confirmaSenha").value === '') {
            document.getElementById("avisoConfirmaSenha").innerHTML = `Preencha este campo`
        }
        else {
            document.getElementById("avisoConfirmaSenha").innerHTML = ``
        }});
    //avisa que precisa de mais caracteres na senha
     document.getElementById("senha").addEventListener('focus', (event) => {
        event.target.style.background = '';
      }, true);
      document.getElementById("senha").addEventListener('keyup', (event) => {
       if(document.getElementById("senha").value.length > 7){
       event.target.style.background = 'green';
       document.getElementById("avisoSenha").innerHTML = ``
       document.getElementById("criar").removeAttribute("disabled")
       document.getElementById("criar").removeChild(imagemchave)
       document.getElementById("criar").innerText = `Criar conta`
       botao.style.backgroundColor = "blue"
       
      }else{
        event.target.style.background = 'pink';
       document.getElementById("avisoSenha").innerHTML = `O campo deve possuir uma senha com 8 caracteres`
       document.getElementById("avisoSenha").style.color = "red"
       document.getElementById("criar").setAttribute("disabled", "true")
       botao.style.backgroundColor = "gray"
       document.getElementById("criar").appendChild(imagemchave)
       
        }
       }, true);
    }
   