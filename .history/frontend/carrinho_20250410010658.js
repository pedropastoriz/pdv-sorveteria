document.addEventListener("DOMContentLoaded", () => {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const container = document.querySelector("#carrinho-container");

  if (carrinho.length === 0) {
    container.innerHTML = "<p>Carrinho vazio.</p>";
    return;
  }

  carrinho.forEach(produto => {
    const item = document.createElement("div");
    item.classList.add("item-carrinho");
    item.innerHTML = `
      <h3>${produto.nome}</h3>
      <p>Quantidade: ${produto.quantidade}</p>
      <p>Preço total: R$ ${(produto.quantidade * produto.preco).toFixed(2)}</p>
    `;
    container.appendChild(item);
  });

  document.getElementById("btn-comprar").addEventListener("click", () => {
    alert("Compra realizada com sucesso!\nForma de pagamento: Pix, Cartão ou Dinheiro.");
    localStorage.removeItem("carrinho");
    window.location.href = "home.html";
  });
});
