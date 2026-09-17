// Programa de agenda telefônica, com as classes Agenda e Contato

class Agenda {
    constructor() {
        this.contatos = [];
    }

    adicionarContato(contato) {
        this.contatos.push(contato);
    }

    buscarContato(nome) {
        return this.contatos.filter(c => c.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    listarContatos() {
        return this.contatos;
    }


}
class Contato {
    constructor(nome, telefone, email) {
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
    }

    exibirInformacoes() {
        return `${this.nome} - Tel: ${this.telefone} - E-mail: ${this.email}`;
    }
}

// Contatos fixos na Agenda
const minhaAgenda = new Agenda();
const contato01 = new Contato("Maria Silva", `11 1111-1111`, `maria@gmail.com`);
minhaAgenda.adicionarContato(contato01); 
const contato02 = new Contato("Luis Andrade", `22 2222-2222`, `luis@gmail.com`);
minhaAgenda.adicionarContato(contato02);
const contato03 = new Contato("Lucas Souza", `33 3333-3333`, `lucas@gmail.com`);
minhaAgenda.adicionarContato(contato03);

// Parte de contatos relacionado ao usuário

// Capturando os elementos do HTML
const formContato = document.getElementById('form-contato');
const listaContatosEl = document.getElementById('lista-contatos');
const btnBuscar = document.getElementById('btn-buscar');
const btnLimpar = document.getElementById('btn-limpar');
const buscaInput = document.getElementById('busca-input');

// Função para desenhar a lista na tela
function renderizarLista(contatosParaMostrar = minhaAgenda.listarContatos()) {
    listaContatosEl.innerHTML = ''; // Limpa a lista atual no HTML

    contatosParaMostrar.forEach(contato => {
        const li = document.createElement('li');
        li.textContent = contato.exibirInformacoes();
        listaContatosEl.appendChild(li); // Adiciona o <li> dentro do <ul>
    });
}

// Evento 1: Adicionar um novo contato via formulário
formContato.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede a página de recarregar ao enviar o form

    // Pega os valores digitados
    const nome = document.getElementById('nome-input').value;
    const telefone = document.getElementById('telefone-input').value;
    const email = document.getElementById('email-input').value;

    // Cria o objeto e adiciona na agenda
    const novoContato = new Contato(nome, telefone, email);
    minhaAgenda.adicionarContato(novoContato);

    // Atualiza a tela e limpa os campos
    renderizarLista();
    formContato.reset();
});

// Evento 2: Buscar contato
btnBuscar.addEventListener('click', function () {
    const termo = buscaInput.value;
    const resultados = minhaAgenda.buscarContato(termo);
    renderizarLista(resultados); // Renderiza apenas os que bateram com a busca
});

//  Limpar busca e mostrar todos
btnLimpar.addEventListener('click', function () {
    buscaInput.value = '';
    renderizarLista(); // Ao chamar sem parâmetros, renderiza todos
});

renderizarLista();
