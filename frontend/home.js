alert('Olá, mundo!');


/*Botões aumentar e diminuir produtos*/
document.querySelectorAll('.produto').forEach(produto => {
    const diminuirBtn = produto.querySelector('.diminuir');
    const adicionarBtn = produto.querySelector('.adicionar');
    const quantidadeEl = produto.querySelector('.quantidade');
    
    let quantidade = 0;

    diminuirBtn.addEventListener('click', () => {
        if (quantidade > 0) {
            quantidade--;
            quantidadeEl.textContent = quantidade;
        }
    });

    adicionarBtn.addEventListener('click', () => {
        quantidade++;
        quantidadeEl.textContent = quantidade;
    });
});

/*Botão prosseguir compra*/

document.getElementById('prosseguirCompra').addEventListener('click', function() {
    const produtos = document.querySelectorAll('.produto'); // Captura todos os produtos
    let carrinho = [];

    produtos.forEach(produto => {
        const nome = produto.querySelector('h3').textContent;
        const preco = produto.querySelector('.preco').textContent;
        const quantidade = produto.querySelector('.quantidade').textContent;

        // Adiciona ao carrinho apenas produtos com quantidade maior que 0
        if (parseInt(quantidade) > 0) {
            carrinho.push({ nome, preco, quantidade });
        }
    });

    console.log('Produtos no carrinho:', carrinho);
    alert('Itens adicionados ao carrinho com sucesso!');
    // Aqui você pode enviar os dados para o servidor ou manipular o carrinho
});