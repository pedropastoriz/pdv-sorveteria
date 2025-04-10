document.addEventListener("DOMContentLoaded", () => {
  console.log('Script carrinho.js carregado com sucesso!');

  const valorTotalDiv = document.getElementById('valor-total');
  const overlay = document.getElementById("overlay");
  const painelPagamento = document.getElementById("painel-pagamento");

  // Função para calcular o total com base nos produtos
  function calcularTotal() {
    let total = 0;
    document.querySelectorAll('.produto').forEach(produto => {
      const preco = parseFloat(produto.querySelector('.item-preco').textContent.replace('R$', '').replace(',', '.'));
      const quantidade = parseInt(produto.querySelector('.quantidade').textContent);
      total += preco * quantidade;
    });
    valorTotalDiv.textContent = `Valor total: R$ ${total.toFixed(2).replace('.', ',')}`;
    return total;
  }

  // Configura os botões de adicionar e remover itens
  document.querySelectorAll('.produto').forEach(produto => {
    const btnMais = produto.querySelector('.adicionar');
    const btnMenos = produto.querySelector('.diminuir');
    const quantidadeEl = produto.querySelector('.quantidade');
    let quantidade = 0;

    btnMais.addEventListener('click', () => {
      quantidade++;
      quantidadeEl.textContent = quantidade;
      calcularTotal();
    });

    btnMenos.addEventListener('click', () => {
      if (quantidade > 0) {
        quantidade--;
        quantidadeEl.textContent = quantidade;
        calcularTotal();
      }
    });
  });

  // Atualizar o total no carregamento inicial
  calcularTotal();

  // Exibir painel de pagamento
  document.getElementById('comprar').addEventListener('click', () => {
    overlay.style.display = "block";
    painelPagamento.style.display = "block";
  });

  // Fechar painel de pagamento
  document.getElementById("fechar-painel").addEventListener("click", () => {
    overlay.style.display = "none";
    painelPagamento.style.display = "none";
  });

  // Função para finalizar compra e gerar o arquivo XML
  document.getElementById("realizar-pagamento").addEventListener("click", () => {
    const formaPagamento = document.getElementById("forma-pagamento").value;
    const carrinho = [];

    // Construção do carrinho
    document.querySelectorAll('.produto').forEach(produto => {
      const nome = produto.querySelector('.item-nome').textContent;
      const preco = produto.querySelector('.item-preco').textContent;
      const quantidade = parseInt(produto.querySelector('.quantidade').textContent);

      if (quantidade > 0) {
        carrinho.push({ nome, preco, quantidade });
      }
    });

    // Verificação de carrinho vazio
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio. Não há itens para comprar.');
      return;
    }

    // Geração do conteúdo XML
    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<compra>\n`;
    xmlContent += `<formaPagamento>${formaPagamento}</formaPagamento>\n`;
    xmlContent += `<produtos>\n`;
    carrinho.forEach(item => {
      xmlContent += `  <produto>\n`;
      xmlContent += `    <nome>${item.nome}</nome>\n`;
      xmlContent += `    <preco>${item.preco}</preco>\n`;
      xmlContent += `    <quantidade>${item.quantidade}</quantidade>\n`;
      xmlContent += `  </produto>\n`;
    });
    xmlContent += `</produtos>\n`;
    xmlContent += `<valorTotal>${valorTotalDiv.textContent.replace('Valor total: ', '')}</valorTotal>\n`;
    xmlContent += `</compra>`;

    // Download do arquivo XML
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'comprovante_compra.xml';
    link.click();

    // Fechar painel após compra
    overlay.style.display = "none";
    painelPagamento.style.display = "none";

    // Confirmar sucesso
    alert('Compra finalizada! O comprovante foi baixado como arquivo XML.');
  });
});