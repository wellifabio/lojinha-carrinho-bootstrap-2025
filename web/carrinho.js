const carrinho = JSON.parse(window.localStorage.getItem('carrinho')) || []
console.log(carrinho)
const modalCarrinho = document.getElementById('modalCarrinho');

modalCarrinho.innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="modalCarrinhoLabel">Carrinho de compras</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ${carrinho.map(item =>`
                    <div class='row g-0'>
                        <div class="col-md-2">
                            <img src='${item.img}' alt='${item.produto}' class="img-fluid rounded-start" style="width:150px">
                        </div>
                        <div class="col-md-10 d-flex justify-content-between align-content-center">
                                <h5 class="card-title">${item.produto}</h5>
                                <p class="card-text">Quantidade: ${item.quantidade}</p>
                                <p class="card-text">Preço: R$ ${item.preco.toFixed(2).replace('.',',')}</p>
                                <p class="card-text">Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2).replace('.',',')}</p>
                                <p><button type="button" class="btn btn-primary" onclick="remover(${item.id})">Remover</button></p>
                        </div>
                    </div>`).join('')}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Enviar pedido</button>
            </div>
        </div>
    </div>
`;

function remover(id){
    carrinho.splice(carrinho.findIndex(item => item.id == id),1);
    window.localStorage.setItem('carrinho', JSON.stringify(carrinho));
    window.location.reload();
}