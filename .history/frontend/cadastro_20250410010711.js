document.addEventListener("DOMContentLoaded", async () => {
    const select = document.getElementById("lista-sorvetes");
  
    try {
      const resposta = await fetch("http://localhost:3000/api/cadastro/sorvetes");
      const produtos = await resposta.json();
  
      produtos.forEach(produto => {
        const option = document.createElement("option");
        option.value = produto.nome;
        option.textContent = produto.nome;
        select.appendChild(option);
      });
    } catch (erro) {
      console.error("Erro ao buscar produtos:", erro);
    }
  
    document.getElementById("btn-salvar").addEventListener("click", async (e) => {
      e.preventDefault();
      const nome = select.value;
      const preco = parseFloat(document.getElementById("preco").value);
      const quantidade = parseInt(document.getElementById("quantidade").value);
  
      if (!nome || isNaN(preco) || isNaN(quantidade)) {
        alert("Preencha todos os campos!");
        return;
      }
  
      try {
        const resposta = await fetch("http://localhost:3000/api/cadastro/atualizar", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, preco, quantidade })
        });
  
        const resultado = await resposta.json();
        alert(resultado.mensagem || resultado.erro);
      } catch (erro) {
        console.error("Erro ao atualizar:", erro);
        alert("Erro ao atualizar produto.");
      }
    });
  });
  