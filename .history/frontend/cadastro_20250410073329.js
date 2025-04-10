const backendURL = "http://localhost:3000"; // Centraliza a URL do backend

// Carregar produtos no dropdown
async function carregarProdutos() {
    const select = document.getElementById("produto");

    try {
        const resposta = await fetch(`${backendURL}/cadastro`);
        if (!resposta.ok) throw new Error("Erro ao buscar produtos");

        const produtos = await resposta.json();
        if (produtos.length === 0) {
            select.innerHTML = '<option value="">Nenhum produto disponível</option>';
        } else {
            select.innerHTML = produtos.map(p => `<option value="${p.nome}">${p.nome}</option>`).join("");
        }
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
        select.innerHTML = '<option value="">Erro ao carregar produtos</option>';
    }
}

// Atualizar produto no MongoDB
async function atualizarProduto() {
    const nome = document.getElementById("produto").value;
    const preco = document.getElementById("preco").value;
    const quantidade = document.getElementById("quantidade").value;
    const mensagem = document.getElementById("mensagem");
    const btnSalvar = document.getElementById("btn-salvar");

    if (!nome || preco === "" || quantidade === "") {
        mensagem.innerText = "Preencha todos os campos!";
        return;
    }

    const dados = { 
        nome, 
        preco: parseFloat(preco), 
        quantidade: parseInt(quantidade) 
    };

    try {
        btnSalvar.disabled = true; // Evita cliques repetidos

        const resposta = await fetch(`${backendURL}/atualizar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();
        mensagem.innerText = resultado.mensagem || resultado.erro;

    } catch (erro) {
        console.error("Erro ao atualizar produto:", erro);
        mensagem.innerText = "Erro ao atualizar produto. Tente novamente!";
    } finally {
        btnSalvar.disabled = false;
    }
}

// Chamar funções ao carregar a página
window.onload = carregarProdutos;
document.getElementById("btn-salvar").addEventListener("click", atualizarProduto);