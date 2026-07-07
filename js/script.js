
// FILTROS DE CATEGORIA
// ==========================================
function filtrar(categoria) {

    // Actualiza o botão activo
    const botoes = document.querySelectorAll('.filtro');
    botoes.forEach(btn => btn.classList.remove('ativo'));
    event.target.classList.add('ativo');

    // Mostra ou esconde os cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (categoria === 'todos' || card.dataset.categoria === categoria) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}


// ==========================================
// CARRINHO DE COMPRAS
// ==========================================
function adicionarCarrinho(nome, preco) {

    // Busca o carrinho guardado ou cria um vazio
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verifica se o produto já está no carrinho
    const index = carrinho.findIndex(item => item.nome === nome);

    if (index !== -1) {
        // Se já existe, aumenta a quantidade
        carrinho[index].quantidade += 1;
    } else {
        // Se não existe, adiciona o produto
        carrinho.push({ nome: nome, preco: preco, quantidade: 1 });
    }

    // Guarda o carrinho actualizado
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert(`✅ "${nome}" adicionado ao carrinho!`);
}

// MOSTRAR CARRINHO
// ==========================================
function mostrarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const lista = document.getElementById('lista-carrinho');
    const totalEl = document.getElementById('total');

    if (!lista) return;

    if (carrinho.length === 0) {
        lista.innerHTML = '<p class="carrinho-vazio">🛒 O teu carrinho está vazio.</p>';
        totalEl.textContent = 'Kz 0';
        return;
    }

    let total = 0;
    lista.innerHTML = '';

    carrinho.forEach((item, index) => {
        total += item.preco * item.quantidade;

        lista.innerHTML += `
            <div class="carrinho-item">
                <span>${item.nome}</span>
                <span>Qty: ${item.quantidade}</span>
                <span>Kz ${(item.preco * item.quantidade).toLocaleString()}</span>
                <button onclick="removerItem(${index})">Remover</button>
            </div>
        `;
    });

    totalEl.textContent = 'Kz ' + total.toLocaleString();
}

// ==========================================
// REMOVER ITEM
// ==========================================
function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    mostrarCarrinho();
}

// ==========================================
// LIMPAR CARRINHO
// ==========================================
function limparCarrinho() {
    localStorage.removeItem('carrinho');
    mostrarCarrinho();
}

// ==========================================
// FINALIZAR COMPRA
// ==========================================
function finalizarCompra() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length === 0) {
        alert('⚠️ O teu carrinho está vazio!');
        return;
    }

    alert('✅ Compra finalizada com sucesso! Obrigado pela sua compra!');
    limparCarrinho();
}

// Carrega o carrinho ao abrir a página
mostrarCarrinho();
