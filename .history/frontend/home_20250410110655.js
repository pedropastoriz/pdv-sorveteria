console.log("Script carregado com sucesso!");

/* Carrega os produtos do backend */
async function carregarProdutos() {
    try {
        console.log("Iniciando busca de produtos...");
        const resposta = await fetch('http://localhost:3000/api/produtos'); // Altere para a porta do seu servidor
        console.log("Resposta da API: ", resposta);

        if (!resposta.ok) throw new Error('Erro ao carregar os produtos');

        const produtos = await resposta.json();
        console.log("Produtos recebidos: ", produtos);

        renderizarProdutos(produtos);
    } catch (erro) {
        console.error("Erro ao buscar produtos:", erro);
    }
}

/* Renderiza os produtos na página */
function renderizarProdutos(produtos) {
    const container = document.getElementById('lista-produtos');
    if (!container) {
        console.error("Elemento 'lista-produtos' não encontrado.");
        return;
    }

    container.innerHTML = ''; // Limpa o conteúdo anterior
    produtos.forEach(produto => {
        const produtoEl = document.createElement('div');
        produtoEl.classList.add('produto');
        produtoEl.dataset.nome = produto.nome;
        produtoEl.dataset.preco = produto.preco;

        produtoEl.innerHTML = `
            <h3>${produto.nome}</h3>
            <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
            <div class="controle">
                <button class="diminuir">-</button>
                <span class="quantidade">0</span>
                <button class="adicionar">+</button>
            </div>
        `;
        container.appendChild(produtoEl);
    });

    adicionarEventosBotoes(); // Chamando aqui
}

/* Adiciona eventos de aumentar/diminuir */
function adicionarEventosBotoes() {
    document.querySelectorAll('.produto').forEach(produto => {
        const diminuirBtn = produto.querySelector('.diminuir');
        const adicionarBtn = produto.querySelector('.adicionar');
        const quantidadeEl = produto.querySelector('.quantidade');

        let quantidade = 0;

        diminuirBtn.addEventListener('click', () => {
            console.log("Botão diminuir clicado: ", produto.dataset.nome);
            if (quantidade > 0) {
                quantidade--;
                quantidadeEl.textContent = quantidade;
            }
        });

        adicionarBtn.addEventListener('click', () => {
            console.log("Botão adicionar clicado: ", produto.dataset.nome);
            quantidade++;
            quantidadeEl.textContent = quantidade;
        });
    });
}

/* Evento do botão "Prosseguir" */
document.getElementById('prosseguirCompra')?.addEventListener('click', () => {
    const produtosSelecionados = [];

    document.querySelectorAll('.produto').forEach(produtoEl => {
        const nome = produtoEl.dataset.nome;
        const preco = parseFloat(produtoEl.dataset.preco);
        const quantidade = parseInt(produtoEl.querySelector('.quantidade').textContent);

        if (quantidade > 0) {
            produtosSelecionados.push({ nome, preco, quantidade });
        }
    });

    console.log("Produtos salvos no carrinho: ", produtosSelecionados);
    localStorage.setItem('carrinho', JSON.stringify(produtosSelecionados));

    // Redireciona para a página do carrinho
    window.location.href = 'carrinho.html';
});

/* Quando a página for carregada */
document.addEventListener('DOMContentLoaded', () => {
    console.log("Página carregada com sucesso!");
    carregarProdutos(); // Carrega os produtos do backend
});
