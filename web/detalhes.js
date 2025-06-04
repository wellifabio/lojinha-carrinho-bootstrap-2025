import api from './api.js';
const carrinho = JSON.parse(window.localStorage.getItem('carrinho')) || []
var produto = {}

carregar();

async function carregar() {
    await api.get("assets/user.json")
        .then(resp => {
            const h = document.querySelector('header h1');
            const img = document.querySelector('header img');
            h.innerHTML = resp.data[0].nome;
            img.src = resp.data[0].avatar;
        })
        .catch(err => {
            alert('Erro ao carregar usuário')
        });
    await api.get("assets/dados.json")
        .then(resp => {
            const id = window.location.href.split('?')[1].split('=')[1];
            const prod = resp.data.filter(prod => prod.id == id)[0];
            produto = prod;
            mostrarDetalhe(prod);
        })
        .catch(err => {
            alert('Erro ao carregar produtos')
        });

}

function mostrarDetalhe(p) {
    const main = document.querySelector('main');
    const card = document.createElement('div');
    card.setAttribute('class', 'card d-flex justify-content-center align-content-center');
    card.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src='${p.img}' alt='${p.produto}' class="img-fluid rounded-start" style="width:600px; max-width:100%">
                </div>
                <div class="col-md-8 d-flex flex-column justify-content-between align-content-center">
                    <div class="card-body">
                        <h3 class="card-title">${p.produto}</h5>
                        <p class="card-text">${p.descricao}</p>
                        <p class="card-text">Preço:<b>R$ ${p.preco.toFixed(2).replace('.', ',')}<b></p>
                    </div>
                    <div class="card-footer text-end">
                        <button class="btn btn-primary" onclick="window.location.href='./home.html'">Cancelar</button>
                        <button class="btn btn-primary" id="add">Adicionar ao carrinho</button>
                    </div>
                </div>
            </div>
            `;
    main.appendChild(card);

    document.getElementById('add').addEventListener('click', e => {
        e.preventDefault();
        const indice = carrinho.findIndex(prod => prod.id == produto.id)
        if (indice != -1) {
            carrinho[indice].quantidade += 1;
        } else {
            produto.quantidade = 1;
            carrinho.push(produto);
        }
        window.localStorage.setItem('carrinho', JSON.stringify(carrinho));
        alert('Produto adicionado ao carrinho');
        window.location.href="./home.html";
    });
}

