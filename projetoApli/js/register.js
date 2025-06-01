let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmarSenha')

let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#label-nome')
let validNome = false

let usuario = document.querySelector('#nome-usuario')
let labelUsuario = document.querySelector('#label-usuario')
let validUsuario = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#label-senha')
let validSenha = false

let confirmarSenha = document.querySelector('#confirmar-senha')
let labelConfirmarSenha = document.querySelector('#label-confirmar')
let validConfirmarSenha = false

let msgError = document.querySelector('#msg-error')
let msgSuccess = document.querySelector('#msg-success')

nome.addEventListener('keyup', () => {
    if(nome.value.length <= 2) {
        labelNome.setAttribute('style', 'color: red')
        labelNome.innerHTML = 'Nome *Insira no minimo 3 caracteres'
        nome.setAttribute('style', 'border-color: red')
        validNome = false
    }
    else {
        labelNome.setAttribute('style', 'color: green')
        labelNome.innerHTML = 'Nome'
        nome.setAttribute('style', 'border-color: green')
        validNome = true
    }
})

usuario.addEventListener('keyup', () => {
    if(usuario.value.length <= 4) {
        labelUsuario.setAttribute('style', 'color: red')
        labelUsuario.innerHTML = 'Usuário *Insira no minimo 5 caracteres'
        usuario.setAttribute('style', 'border-color: red')
        validUsuario = false
    }
    else {
        labelUsuario.setAttribute('style', 'color: green')
        labelUsuario.innerHTML = 'Usuário'
        usuario.setAttribute('style', 'border-color: green')
        validUsuario = true
    }
})

senha.addEventListener('keyup', () => {
    if(senha.value.length <= 5) {
        labelSenha.setAttribute('style', 'color: red')
        labelSenha.innerHTML = 'Senha *Insira no minimo 6 caracteres'
        senha.setAttribute('style', 'border-color: red')
        validSenha = false
    }
    else {
        labelSenha.setAttribute('style', 'color: green')
        labelSenha.innerHTML = 'Senha'
        senha.setAttribute('style', 'border-color: green')
        validSenha = true
    }
})

confirmarSenha.addEventListener('keyup', () => {
    if(senha.value != confirmarSenha.value) {
        labelConfirmarSenha.setAttribute('style', 'color: red')
        labelConfirmarSenha.innerHTML = 'Confirmar Senha *As senhas não conferem'
        confirmarSenha.setAttribute('style', 'border-color: red')
        validConfirmarSenha = false
    }
    else {
        labelConfirmarSenha.setAttribute('style', 'color: green')
        labelConfirmarSenha.innerHTML = 'Confirmar Senha'
        confirmarSenha.setAttribute('style', 'border-color: green')
        validConfirmarSenha = true
    }
})


function cadastrar() {
    if(validNome && validUsuario && validSenha && validConfirmarSenha){
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')

        listaUser.push({
            nomeCad: nome.value,
            userCad: usuario.value,
            senhaCad: senha.value
        })

        localStorage.setItem('listaUser', JSON.stringify(listaUser))

        msgSuccess.setAttribute('style', 'display: block')
        msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>'
        msgError.setAttribute('style', 'display: none')
        msgError.innerHTML = ''

        setTimeout(() => {
            window.location.href = './login.html'
        }, 2000)
    }
    else {
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
        msgSuccess.innerHTML = ''
        msgSuccess.setAttribute('style', 'display: none')
    }
}

btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha')

    if(inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
    }
    else {
        inputSenha.setAttribute('type', 'password')
    }
})

btnConfirm.addEventListener('click', () => {
    let inputConfirmarSenha = document.querySelector('#confirmar-senha')

    if(inputConfirmarSenha.getAttribute('type') == 'password') {
        inputConfirmarSenha.setAttribute('type', 'text')
    }
    else {
        inputConfirmarSenha.setAttribute('type', 'password')
    }
})

