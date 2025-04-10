document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("produtos-container");
  
    try {
      const response = await fetch("/cadastro/sorvetes");
      const produtos = await response.json();
  
      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};
  
      produtos.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("produto");
  
        card.innerHTML = `
          <img src="Imagens/${produto.nome.includes('Pote') ? 'poteSorvete.png' : 'saborMorango-Picole.png'}" alt="${produto.nome}">
          <h3>${produto.nome}</h3>
          <p class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
          <div class="botoes">
            <button class="diminuir" data-id="${produto._id}">-</button>
            <span class="quantidade" id="quantidade-${produto._id}">${carrinho[produto._id]?.quantidade || 0}</span>
            <button class="adicionar" data-id="${produto._id}">+</button>
          </div>
        `;
  
        container.appendChild(card);
      });
  
      // Lógica dos botões
      container.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        if (!id) return;
  
        const produto = produtos.find(p => p._id === id);
  
        // Adicionar
        if (e.target.classList.contains("adicionar")) {
          if (!carrinho[id]) {
            carrinho[id] = { ...produto, quantidade: 1 };
          } else {
            carrinho[id].quantidade += 1;
          }
        }
  
        // Diminuir
        if (e.target.classList.contains("diminuir")) {
          if (carrinho[id]) {
            carrinho[id].quantidade -= 1;
            if (carrinho[id].quantidade <= 0) {
              delete carrinho[id];
            }
          }
        }
  
        // Atualiza quantidade visível
        const span = document.getElementById(`quantidade-${id}`);
        span.textContent = carrinho[id]?.quantidade || 0;
  
        // Salva no localStorage
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
      });
  
      // Prosseguir
      document.getElementById("prosseguirCompra").addEventListener("click", () => {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        window.location.href = "/frontend/carrinho.html";
      });
  
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  });
  