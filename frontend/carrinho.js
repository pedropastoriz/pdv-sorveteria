document.addEventListener("DOMContentLoaded", () => {
    /* Teste que está funcionando o JS */
    console.log('Script carrinho.js carregado com sucesso!');

    /* Botões aumentar e diminuir produtos */
    document.querySelectorAll('.produto').forEach(produto => {
        const diminuirBtn = produto.querySelector('.diminuir');
        const adicionarBtn = produto.querySelector('.adicionar');
        const quantidadeEl = produto.querySelector('.quantidade');
        
        let quantidade = 0;

        diminuirBtn.addEventListener('click', () => {
            if (quantidade > 0) {
                quantidade--;
                quantidadeEl.textContent = quantidade;
                calcularTotal();
            }
        });

        adicionarBtn.addEventListener('click', () => {
            quantidade++;
            quantidadeEl.textContent = quantidade;
            calcularTotal();
        });
    });

    /* Atualiza o valor total na tela */
    const valorTotalDiv = document.getElementById('valor-total');

    function calcularTotal() {
        let total = 0;
        document.querySelectorAll('.produto').forEach(produto => {
            const preco = parseFloat(produto.querySelector('.item-preco').textContent.replace('R$', '').replace(',', '.'));
            const quantidade = parseInt(produto.querySelector('.quantidade').textContent);

            if (quantidade > 0) {
                total += preco * quantidade;
            }
        });

        valorTotalDiv.textContent = `Valor total: R$ ${total.toFixed(2).replace('.', ',')}`;
    }
    calcularTotal();

    /* Finalizar compra */
    document.getElementById('comprar').addEventListener('click', async function () {
        let carrinho = [];

        document.querySelectorAll('.produto').forEach(produto => {
            const nome = produto.querySelector('.item-nome').textContent;
            const preco = produto.querySelector('.item-preco').textContent;
            const quantidade = parseInt(produto.querySelector('.quantidade').textContent);

            if (quantidade > 0) {
                carrinho.push({ nome, preco, quantidade });
            }
        });

        console.log('Produtos no carrinho:', carrinho);

        if (carrinho.length > 0) {
            try {
                const response = await fetch('http://localhost:3000/atualizar-produtos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ carrinho })
                });

                if (!response.ok) throw new Error('Erro ao atualizar produtos no banco de dados');

                alert('Compra realizada com sucesso!');
                window.location.href = '/home/index.html';
            } catch (error) {
                console.error('Erro ao finalizar a compra:', error);
                alert('Ocorreu um erro ao realizar a compra.');
            }
        } else {
            alert('Seu carrinho está vazio. Não há itens para comprar.');
        }
    });
});
