if(localStorage.getItem("token") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "./projetoApli/html/login.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const userLogadoJSON = localStorage.getItem('userLogado');

    if(userLogadoJSON) {
        const dadoUsuario = JSON.parse(userLogadoJSON);
        const bemVindo = document.getElementById('nome-tela--inicial');
        bemVindo.innerHTML = `Bem-vindo, ${dadoUsuario.nome}!`
    }

    const token = localStorage.getItem('token');
    const logoutbotao = document.getElementById('logout-btn');

    if(token && logoutbotao) {

        logoutbotao.addEventListener('click', () => {
            event.preventDefault();

            localStorage.removeItem('token');
            localStorage.removeItem('userLogado');

            alert('Você saiu com sucesso!');
            window.location.href = './projetoApli/html/login.html';
        });
    }
    else if(logoutbotao) {
        logoutbotao.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {

    const cartIcon = document.getElementById('btn-carrinho');
    const cartSidebar = document.getElementById('carrinho-sidebar');
    const closeCartBtn = document.getElementById('close-carrinho-btn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsContainer = document.getElementById('carrinho-itens-container');
    const cartTotalElem = document.getElementById('carrinho-total');
    const cartCounterElem = document.getElementById('cart-counter');
    const cartOverlay = document.getElementById('carrinho-overlay');

    let carrinho = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    const abrirCarrinho = () => {
        cartSidebar.classList.add('open');
        cartOverlay.style.display = 'block';
    };

    const fecharCarrinho = () => {
        cartSidebar.classList.remove('open');
        cartOverlay.style.display = 'none';
    };

    const renderCarrinho = () => {
        cartItemsContainer.innerHTML = '';

        if (carrinho.length === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio</p>';
        }
        else {
            carrinho.forEach(item => {
                const carrinhoItem = document.createElement('div');
                carrinhoItem.classList.add('cart-item');
                carrinhoItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>R$${item.price.toFixed(2)}</p>
                    <p>Qquantidade: ${item.quantity}</p>
                </div>
                <button class="remove-item-btn" data-id="${item.id}">&times;</button>
                `;

                cartItemsContainer.appendChild(carrinhoItem);
            });
        }

        const total = carrinho.reduce((sum,item) => sum + (item.price * item.quantity), 0);
        cartTotalElem.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const totalItens = carrinho.reduce((sum,item) => sum + item.quantity, 0);
        cartCounterElem.textContent = totalItens;
    };

    const salvarCarrinho = () => {
        localStorage.setItem('shoppingCart', JSON.stringify(carrinho));
    };

    const addAoCarrinho = (id, name, price, image) => {

        const existingItem = carrinho.find(item => item.id === id);

        if(existingItem) {
            existingItem.quantity++;
        }
        else{
            carrinho.push({id, name, price, image, quantity: 1});  
        }

        salvarCarrinho();
        renderCarrinho();
        abrirCarrinho();
    };

    const removerDoCarrinho = (id) => {
        carrinho = carrinho.filter(item => item.id !== id);
        salvarCarrinho();
        renderCarrinho();
    };

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            
            const id = e.target.dataset.id;
            const name = e.target.dataset.name;
            const price = parseFloat(e.target.dataset.price);
            const image = e.target.dataset.image;
            addAoCarrinho(id,name,price,image);
        });
    });

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')){
            const id = e.target.dataset.id;
            removerDoCarrinho(id);
        }
    });

    cartIcon.addEventListener('click', () => {abrirCarrinho();});
    closeCartBtn.addEventListener('click', () => {fecharCarrinho()});
    cartOverlay.addEventListener('click', () => {fecharCarrinho()});

    renderCarrinho();

})