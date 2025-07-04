// --- CONFIGURAÇÃO ---
// IMPORTANTE: Altere este número para o WhatsApp da sua loja.
// Formato: 55 (código do país) + DDD + número (sem espaços ou traços)
const numeroWhatsApp = '5541999998888';

// --- DADOS DOS PRODUTOS ---
const produtos = [
    {
        id: 1,
        nome: 'Hamburguer Smash',
        descricao: 'Pão levinho de fermentação natural, burguer 160g, queijo prato e maionese da casa.',
        preco: 19.90,
        imagem: 'https://placehold.co/600x400/000000/FFFFFF?text=Smash'
    },
    {
        id: 2,
        nome: 'Duplo Bacon',
        descricao: 'Pão brioche, 2x burguer 120g, dobro de queijo cheddar, fatias de bacon crocante e molho especial.',
        preco: 28.50,
        imagem: 'https://placehold.co/600x400/000000/FFFFFF?text=Bacon'
    },
    {
        id: 3,
        nome: 'Frango Crispy',
        descricao: 'Pão australiano, filé de frango empanado super crocante, alface, tomate e maionese de ervas.',
        preco: 24.00,
        imagem: 'https://placehold.co/600x400/000000/FFFFFF?text=Frango'
    },
    {
        id: 4,
        nome: 'Veggie do Chef',
        descricao: 'Pão integral, burguer de grão de bico com cogumelos, queijo muçarela, rúcula e tomate seco.',
        preco: 26.50,
        imagem: 'https://placehold.co/600x400/000000/FFFFFF?text=Veggie'
    }
];

// --- LÓGICA DO CARRINHO ---
let carrinho = [];

// Garante que o script rode apenas depois que o HTML for completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-items');
    if (menuContainer) {
        renderizarProdutos(menuContainer);
    }
    
    const sendButton = document.getElementById('send-whatsapp-order');
    if (sendButton) {
        sendButton.addEventListener('click', enviarPedidoWhatsApp);
    }
});

/**
 * Renderiza os cartões de produtos na página.
 * @param {HTMLElement} container O elemento onde os produtos serão inseridos.
 */
function renderizarProdutos(container) {
    container.innerHTML = '';
    produtos.forEach(produto => {
        const cardHtml = `
            <div class="col-lg-4 col-md-6">
                <div class="card card-produto">
                    <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/CCCCCC/FFFFFF?text=Imagem+Indisponível';">
                    <div class="card-body p-4">
                        <div>
                            <h5 class="card-title">${produto.nome}</h5>
                            <p class="card-text">${produto.descricao}</p>
                        </div>
                        <div class="price-add-to-cart mt-3">
                            <span class="price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
                            <button class="btn btn-add-cart" onclick="adicionarAoCarrinho(${produto.id})">
                                <i class="fas fa-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHtml;
    });
}

/**
 * Adiciona um produto ao carrinho ou incrementa sua quantidade.
 * @param {number} produtoId O ID do produto a ser adicionado.
 */
function adicionarAoCarrinho(produtoId) {
    const produtoExistente = carrinho.find(item => item.id === produtoId);

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        const produto = produtos.find(p => p.id === produtoId);
        if (produto) {
            carrinho.push({ ...produto, quantidade: 1 });
        }
    }
    
    atualizarCarrinho();
    mostrarFeedbackAdicionado();
}

/**
 * Atualiza a exibição do modal do carrinho e o contador de itens.
 */
function atualizarCarrinho() {
    const cartBody = document.getElementById('cart-items-body');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartBody || !cartCount || !cartTotal) return;

    cartCount.textContent = carrinho.reduce((total, item) => total + item.quantidade, 0);

    if (carrinho.length === 0) {
        cartBody.innerHTML = '<p>Seu carrinho está vazio.</p>';
        cartTotal.textContent = 'R$ 0,00';
        return;
    }

    cartBody.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        const itemHtml = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <strong>${item.nome}</strong><br>
                    <small>R$ ${item.preco.toFixed(2).replace('.', ',')} x ${item.quantidade}</small>
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-secondary" onclick="mudarQuantidade(${item.id}, -1)">-</button>
                    <span class="mx-2">${item.quantidade}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="mudarQuantidade(${item.id}, 1)">+</button>
                    <button class="btn btn-sm btn-outline-danger ms-2" onclick="removerDoCarrinho(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartBody.innerHTML += itemHtml;
    });

    cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

/**
 * Altera a quantidade de um item no carrinho.
 * @param {number} produtoId O ID do produto.
 * @param {number} mudanca A quantidade a ser adicionada (1) ou removida (-1).
 */
function mudarQuantidade(produtoId, mudanca) {
    const item = carrinho.find(i => i.id === produtoId);
    if(item) {
        item.quantidade += mudanca;
        if (item.quantidade <= 0) {
            removerDoCarrinho(produtoId);
        } else {
            atualizarCarrinho();
        }
    }
}

/**
 * Remove completamente um item do carrinho.
 * @param {number} produtoId O ID do produto a ser removido.
 */
function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(item => item.id !== produtoId);
    atualizarCarrinho();
}

/**
 * Gera a mensagem do pedido e a envia para o WhatsApp.
 */
function enviarPedidoWhatsApp() {
    if (carrinho.length === 0) {
        // Usando um modal ou um feedback visual melhor no futuro
        alert('Seu carrinho está vazio!');
        return;
    }

    let mensagem = 'Olá, Red Burguer! Gostaria de fazer o seguinte pedido:\n\n';
    let total = 0;

    carrinho.forEach(item => {
        mensagem += `*${item.quantidade}x* - ${item.nome}\n`;
        total += item.preco * item.quantidade;
    });

    mensagem += `\n*Total:* R$ ${total.toFixed(2).replace('.', ',')}`;

    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;
    
    window.open(linkWhatsApp, '_blank');
}

/**
 * Mostra um feedback visual rápido no botão do carrinho ao adicionar um item.
 */
function mostrarFeedbackAdicionado() {
    const cartFab = document.querySelector('.cart-fab');
    if (cartFab) {
        cartFab.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartFab.style.transform = 'scale(1)';
        }, 200);
    }
}


