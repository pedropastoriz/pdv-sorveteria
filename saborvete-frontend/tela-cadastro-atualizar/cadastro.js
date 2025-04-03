// Alerta inicial para verificar se o JS está funcionando
alert("Bem-vindo à tela de cadastro!");

// Função para manipular o formulário de cadastro
document.addEventListener("DOMContentLoaded", function () {
    // Selecionando elementos do DOM
    const produtoSelect = document.getElementById("produto");
    const precoInput = document.getElementById("preco");
    const quantidadeInput = document.getElementById("quantidade");
    const atualizarBtn = document.querySelector(".att-button");

    // Quando o botão de atualizar for clicado
    atualizarBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Evitar recarregar a página

        const produtoSelecionado = produtoSelect.value;
        const preco = precoInput.value;
        const quantidade = quantidadeInput.value;

        if (!produtoSelecionado || !preco || !quantidade) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        // Exemplo de exibição dos dados no console (simulação de envio)
        console.log("Produto:", produtoSelecionado);
        console.log("Preço:", preco);
        console.log("Quantidade:", quantidade);

        alert("Cadastro atualizado com sucesso!");
        // Aqui você pode integrar com backend ou adicionar funcionalidade extra
    });
});
