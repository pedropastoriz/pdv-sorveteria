document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("produtos-container");
  
    try {
      const response = await fetch("/cadastro/sorvetes");
      const produtos = await response.json();
  
      produtos.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("produto-card");
  
        card.innerHTML = `
          <h3>${produto.nome}</h3>
          <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
          <p>Quantidade em estoque: ${produto.quantidade}</p>
          <div class="quantidade-controls">
            <button class="btn-menos" data-id="${produto._id}">−</button>
            <span id="quantidade-${produto._id}">0</span>
            <button class="btn-mais" data-id="${produto._id}">+</button>
          </div>
        `;
  
        container.appendChild(card);
      });
  
      // Inicializa carrinho
      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};
  
      // Atualiza o número visível ao usuário
      function atualizarDisplay(id) {
        document.getElementById(`quantidade-${id}`).textContent = carrinho[id]?.quantidade || 0;
      }
  
      // Botão +
      container.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-mais")) {
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
  
        // Botão -
        if (e.target.classList.contains("btn-menos")) {
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
  
      // Atualiza o display inicial
      Object.keys(carrinho).forEach(id => atualizarDisplay(id));
  
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  
    // Botão "Prosseguir"
    document.getElementById("prosseguir-btn").addEventListener("click", () => {
      window.location.href = "carrinho.html";
    });
  });
  