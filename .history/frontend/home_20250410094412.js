document.addEventListener("DOMContentLoaded", function () {
    const botoesAdicionar = document.querySelectorAll(".adicionar");
    const botoesDiminuir = document.querySelectorAll(".diminuir");
    const botaoProsseguir = document.getElementById("prosseguirCompra");

    // Função para atualizar o localStorage com os produtos e quantidades
    function atualizarCarrinho() {
        const produtos = document.querySelectorAll(".produto");
        const carrinho = [];

        produtos.forEach(produto => {
            const nome = produto.getAttribute("data-nome");
            const preco = parseFloat(produto.getAttribute("data-preco"));
            const quantidade = parseInt(produto.querySelector(".quantidade").textContent);

            if (quantidade > 0) {
                carrinho.push({ nome, preco, quantidade });
            }
        });

        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }

    // Botões de adicionar
    botoesAdicionar.forEach(botao => {
        botao.addEventListener("click", () => {
            const spanQuantidade = botao.parentElement.querySelector(".quantidade");
            let quantidade = parseInt(spanQuantidade.textContent);
            spanQuantidade.textContent = quantidade + 1;

            atualizarCarrinho();
        });
    });

    // Botões de diminuir
    botoesDiminuir.forEach(botao => {
        botao.addEventListener("click", () => {
            const spanQuantidade = botao.parentElement.querySelector(".quantidade");
            let quantidade = parseInt(spanQuantidade.textContent);

            if (quantidade > 0) {
                spanQuantidade.textContent = quantidade - 1;
                atualizarCarrinho();
            }
        });
    });

    // Botão Prosseguir
    botaoProsseguir.addEventListener("click", () => {
        atualizarCarrinho(); // garante que o carrinho está salvo
        window.location.href = "carrinho.html";
    });
});
