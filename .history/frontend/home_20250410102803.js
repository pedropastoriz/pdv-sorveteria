document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("produtos-container");

    try {
        const response = await fetch("/cadastro/sorvetes");
        const produtos = await response.json();

        produtos.forEach(produto => {
            const card = document.createElement("div");
            card.classList.add("produto");

            card.innerHTML = `
                <img src="Imagens/${produto.nome.toLowerCase()}-Picole.png" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                <div class="botoes">
                    <button class="diminuir" data-id="${produto._id}">-</button>
                    <span id="quantidade-${produto._id}" class="quantidade">0</span>
                    <button class="adicionar" data-id="${produto._id}">+</button>
                </div>
            `;
            container.appendChild(card);
        });

        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};

        function atualizarDisplay(id) {
            const quantidadeSpan = document.getElementById(`quantidade-${id}`);
            quantidadeSpan.textContent = carrinho[id]?.quantidade || 0;
        }

        container.addEventListener("click", (e) => {
            if (e.target.classList.contains("adicionar")) {
                const id = e.target.dataset.id;
                const produto = produtos.find(p => p._id === id);

                if (!carrinho[id]) {
                    carrinho[id] = { ...produto, quantidade: 1 };
                } else {
                    carrinho[id].quantidade += 1;
                }

                localStorage.setItem("carrinho", JSON.stringify(carrinho));
                atualizarDisplay(id);
            }

            if (e.target.classList.contains("diminuir")) {
                const id = e.target.dataset.id;
                if (carrinho[id]) {
                    carrinho[id].quantidade -= 1;
                    if (carrinho[id].quantidade <= 0) {
                        delete carrinho[id];
                    }
                    localStorage.setItem("carrinho", JSON.stringify(carrinho));
                    atualizarDisplay(id);
                }
            }
        });

        Object.keys(carrinho).forEach(id => atualizarDisplay(id));
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }

    document.getElementById("prosseguirCompra").addEventListener("click", () => {
        window.location.href = "carrinho.html";
    });
});
