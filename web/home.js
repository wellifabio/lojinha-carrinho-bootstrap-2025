import api from './api.js';

carregar();

async function carregar() {
    await api.get("assets/dados.json")
        .then(resp => {
            listarCards(resp.data);
        })
        .catch(err => {
            alert('Erro ao carregar produtos')
        });

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
}

function listarCards(dados) {
    const main = document.querySelector('main');
    dados.forEach(p => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card mb-3 ms-3');
        card.setAttribute('style', 'width:20rem');
        card.innerHTML = `
                <img src='${p.img}' alt='${p.produto}' class="card-img-top">
                <div class="card-body">
                    <h3 class="card-title">${p.produto}</h5>
                    <p class="card-text">${p.descricao}</p>
                </div>
                <div class="card-footer text-end">
                    <button class="btn btn-primary">Detalhes</button>
                </div>
            `;
        main.appendChild(card);
    });
}