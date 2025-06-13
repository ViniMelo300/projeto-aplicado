document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const messageError = document.getElementById('message-error');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        if(email.trim() === '' || senha.trim() === '') {
            messageError.textContent = 'Por favor, preencha todos os campos!';
        }
        else {
            messageError.textContent = '';
            console.log("Formulário enviado com sucesso!");
            console.log("Email: ", email);
            console.log("Senha: ", senha);

            alert('Login realizado com sucesso!');
        }
    })
});

function entrar() {
    let usuario = document.getElementById('email');
    let senha = document.getElementById('senha');
    const messageError = document.getElementById('message-error');

    let listaUser = []

    let userValid = {
        nome: null,
        user: null,
        senha: null
    }

    listaUser = JSON.parse(localStorage.getItem('listaUser'))

    listaUser?.forEach((item) => {
        if(usuario.value == item.userCad && senha.value == item.senhaCad){
            userValid = {
                nome: item.nomeCad,
                user: item.userCad,
                senha: item.senhaCad
            }
        }
    });

    if(usuario.value == userValid.user && senha.value == userValid.senha){

        setTimeout(() => {
            window.location.href = '../../index.html'
        }, 2500)

        let mathRandom = Math.random().toString(16).substring(2)
        let token = mathRandom + mathRandom

        localStorage.setItem('token', token)
        localStorage.setItem('userLogado', JSON.stringify(userValid));
    }
    else {
        usuario.setAttribute('style', 'border-color: red')
        senha.setAttribute('style', 'border-color: red')
        messageError.setAttribute('style', 'display: block')
        messageError.innerHTML = 'Usuário ou senha incorretos!'
        usuario.focus()
    }
}

