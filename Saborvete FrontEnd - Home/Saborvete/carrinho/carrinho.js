/* Teste que está funcionando o js*/ 

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
            calcularTotal(); // Atualiza o valor total
        }
    });

    adicionarBtn.addEventListener('click', () => {
        quantidade++;
        quantidadeEl.textContent = quantidade;
        calcularTotal(); // Atualiza o valor total
    });
});




/*Atualiza o valor total na tela*/
const produtos = document.querySelectorAll('.produto');
const valorTotalDiv = document.getElementById('valor-total');

// Calcula o total e atualiza na tela
function calcularTotal() {
    let total = 0;

    produtos.forEach(produto => {
        const preco = parseFloat(produto.querySelector('.item-preco').textContent.replace('R$', '').replace(',', '.'));
        const quantidade = parseInt(produto.querySelector('.quantidade').textContent);

        if (quantidade > 0) {
            total += preco * quantidade;
        }
    });

    // Atualiza o texto do valor total
    valorTotalDiv.textContent = `Valor total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Chamar a função ao carregar a página para inicializar o valor total
calcularTotal();





/*Botão que finaliza a compra*/

document.getElementById('comprar').addEventListener('click', async function () {
    const produtos = document.querySelectorAll('.produto'); // Captura todos os produtos
    let carrinho = [];

    produtos.forEach(produto => {
        const nome = produto.querySelector('.item-nome').textContent;
        const preco = produto.querySelector('.item-preco').textContent;
        const quantidade = produto.querySelector('.quantidade').textContent;

        // Adiciona ao carrinho apenas produtos com quantidade maior que 0
        if (parseInt(quantidade) > 0) {
            carrinho.push({ nome, preco, quantidade });
        }
    });

    console.log('Produtos no carrinho:', carrinho);

    if (carrinho.length > 0) {
        try {
            // Diminuir a quantidade no banco de dados MongoDB
            await fetch('/atualizar-produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ carrinho }), // Envia o carrinho para o servidor
            });

            // Aviso ao usuário que a compra foi efetuada
            alert('Compra realizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar o banco de dados:', error);
            alert('Ocorreu um erro ao realizar a compra.');
            return; // Interrompe caso haja erro
        }

        // Limpar carrinho (exemplo de limpeza na interface, ajustar conforme sua aplicação)
        carrinho = [];
        console.log('Carrinho limpo:', carrinho);

        // Redirecionar para a tela HOME
        window.location.href = '/home/index.html';
    } else {
        alert('Seu carrinho está vazio. Não há itens para comprar.');
    }
});

/* EM TESE ESSE É O CODIGO QUE FAZ A BAIXA DOS PRODUTOS NO BANCO DE DADOS, CONFIRA SE ESTÁ FUNCIONANDO PLSS 

app.post('/atualizar-produtos', async (req, res) => {
    const carrinho = req.body.carrinho;

    try {
        for (let produto of carrinho) {
            await Produto.updateOne(
                { nome: produto.nome },
                { $inc: { quantidade: -produto.quantidade } }
            );
        }
        res.status(200).send('Produtos atualizados com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar produtos:', error);
        res.status(500).send('Erro ao atualizar produtos.');
    }
});

*/