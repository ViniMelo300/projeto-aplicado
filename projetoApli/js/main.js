if(localStorage.getItem("token") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "./projetoApli/html/login.html";
}

let userLogin = JSON.parse(localStorage.getItem("userLogado"));

let login = document.querySelector('#logado');
login.innerHTML = `Bem-vindo ${userLogin.nome}`;

