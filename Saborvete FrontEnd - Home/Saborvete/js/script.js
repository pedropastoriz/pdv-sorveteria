alert('Olá, mundo!');


document.querySelectorAll('.produto').forEach(produto => {
    const diminuirBtn = produto.querySelector('.diminuir');
    const adicionarBtn = produto.querySelector('.adicionar');
    const quantidadeEl = produto.querySelector('.quantidade');
    
    let quantidade = 0;

    diminuirBtn.addEventListener('click', () => {
        if (quantidade > 0) {
            quantidade--;
            quantidadeEl.textContent = quantidade;
        }
    });

    adicionarBtn.addEventListener('click', () => {
        quantidade++;
        quantidadeEl.textContent = quantidade;
    });
});