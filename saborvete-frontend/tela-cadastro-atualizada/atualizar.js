const backendURL = "http://localhost:3001"; // URL do backend

// Carregar produtos no dropdown
async function carregarProdutos() {
    try {
        const resposta = await fetch(`${backendURL}/produtos`); // Rota que lista os produtos
        const produtos = await resposta.json();

        const select = document.getElementById("produto");
        select.innerHTML = produtos.map(p => `<option value="${p.nome}">${p.nome}</option>`).join("");
    
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }
}

// Atualizar produto no MongoDB
async function atualizarProduto() {
    const nome = document.getElementById("produto").value;
    const preco = document.getElementById("preco").value;
    const quantidade = document.getElementById("quantidade").value;
    const mensagem = document.getElementById("mensagem");

    if (!nome || preco === "" || quantidade === "") {
        mensagem.innerText = "Preencha todos os campos!";
        return;
    }

    const dados = { nome, preco: parseFloat(preco), quantidade: parseInt(quantidade) };

    try {
        const resposta = await fetch(`${backendURL}/atualizar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();
        mensagem.innerText = resultado.mensagem || resultado.erro;
    
    } catch (erro) {
        console.error("Erro ao atualizar produto:", erro);
    }
}

// Chamar a função ao carregar a página
window.onload = carregarProdutos;
