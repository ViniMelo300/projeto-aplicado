function mostrarmensagem(){
    alert("Você clicou no botão");
}

document.addEventListener('DOMContentLoaded', function(){
    const btnCarrinho = document.getElementById('btn-acao');

    if(btnCarrinho) {
        btnCarrinho.addEventListener('click', function() {
            alert('O botão do carrinho foi clicado!');
            console.log("botão clicado", this.id);
        })
    }
})