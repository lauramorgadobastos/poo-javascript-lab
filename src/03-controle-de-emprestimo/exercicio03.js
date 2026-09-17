// Controle de empréstimo de livros, com as classes Empréstimo, Livro e Pessoa.

class Livro {
    constructor(nome, autor, editora, qtdeExemplares) {
        this.nome = nome;
        this.autor = autor;
        this.editora = editora;
        this.qtdeExemplares = qtdeExemplares;
    }

    estaDisponivel() {
        return this.qtdeExemplares > 0;
    }
    retirarExemplar() {
        if (this.estaDisponivel()) {
            this.qtdeExemplares--;
            return true;
        }
        return false;
    }
    devolverExemplar() {
        this.qtdeExemplares++;
    }

}
class Pessoa {
    constructor(nome, idetificacao) {
        this.nome = nome;
        this.idetificacao = idetificacao;
    }
}

class Emprestimo {
    constructor(pessoa, livro, dataDev) {
        if (livro.retirarExemplar()) {
            this.pessoa = pessoa;
            this.livro = livro;
            this.dataDev = dataDev;
            this.status = "Ativo";
        } else {
            throw new Error(`O livro "${livro.nome}" não tem exemplares disponíveis.`);
        }
    }

    // Novo método que verifica se passou da data de devolução
    estaAtrasado() {
        // Se o status  devolvido
        if (this.status === "Devolvido") {
            return false;
        }

        const dataAtual = new Date(); 
        return dataAtual > this.dataDev; // Retorna true se hoje for maior que o prazo
    }

    // Método para processar a devolução
    finalizarEmprestimo() {
        this.livro.devolverExemplar(); // Devolve o exemplar pro estoque do Livro
        this.status = "Devolvido";

        // Feedback
        if (this.estaAtrasado()) {
            return "Livro devolvido com atraso! Sujeito a multa.";
        } else {
            return "Livro devolvido no prazo correto. Obrigado!";
        }
    }
}

// Parte de interação com o usuario

const acervo = [];
const emprestimos = [];
const pessoas = [];

// Captura dos elementos do HTML
const formLivro = document.getElementById('form-livro');
const formEmprestimo = document.getElementById('form-emprestimo');
const mensagemStatus = document.getElementById('mensagem-status');
const formPessoa = document.getElementById('form-pessoa');

// Evento para Cadastrar Pessoa
formPessoa.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('pessoa-nome-cad').value;
    const identificacao = document.getElementById('pessoa-id-cad').value;

    // Instancia a sua classe Pessoa
    const novaPessoa = new Pessoa(nome, identificacao);
    pessoas.push(novaPessoa);

    mensagemStatus.style.color = "green";
    mensagemStatus.innerText = `Pessoa "${novaPessoa.nome}" cadastrada com sucesso!`;
    formPessoa.reset();
});

//  Evento para Cadastrar Livro
formLivro.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('livro-nome').value;
    const autor = document.getElementById('livro-autor').value;
    const editora = document.getElementById('livro-editora').value;
    const qtd = parseInt(document.getElementById('livro-qtd').value);

    // Instancia a sua classe Livro
    const novoLivro = new Livro(nome, autor, editora, qtd);
    acervo.push(novoLivro);

    mensagemStatus.style.color = "green";
    mensagemStatus.innerText = `Livro "${novoLivro.nome}" cadastrado com sucesso!`;
    formLivro.reset();
});

// Evento para Criar Empréstimo
formEmprestimo.addEventListener('submit', (event) => {
    event.preventDefault();

    const idPessoa = document.getElementById('pessoa-id').value;
    const nomeLivro = document.getElementById('emp-livro-nome').value;
    const dataDev = new Date(document.getElementById('emp-data').value);

    // Busca a pessoa cadastrada pelo CPF
    const pessoaEncontrada = pessoas.find(p => p.idetificacao === idPessoa);

    // Busca o livro cadastrado pelo nome
    const livroEncontrado = acervo.find(l => l.nome.toLowerCase() === nomeLivro.toLowerCase());

    if (!pessoaEncontrada) {
        mensagemStatus.style.color = "red";
        mensagemStatus.innerText = "Erro: Pessoa não cadastrada no sistema!";
        return;
    }

    if (!livroEncontrado) {
        mensagemStatus.style.color = "red";
        mensagemStatus.innerText = "Erro: Livro não encontrado no acervo!";
        return;
    }

    try {
        const novoEmprestimo = new Emprestimo(pessoaEncontrada, livroEncontrado, dataDev);
        emprestimos.push(novoEmprestimo);

        mensagemStatus.style.color = "green";
        mensagemStatus.innerText = `Empréstimo realizado para ${pessoaEncontrada.nome}! Exemplares restantes: ${livroEncontrado.qtdeExemplares}`;
        formEmprestimo.reset();
    } catch (error) {
        mensagemStatus.style.color = "red";
        mensagemStatus.innerText = `Erro: ${error.message}`;
    }
});

const formDevolucao = document.getElementById('form-devolucao');

// Evento para Devolver Livro
formDevolucao.addEventListener('submit', (event) => {
    event.preventDefault();

    const idPessoa = document.getElementById('dev-pessoa-id').value;
    const nomeLivro = document.getElementById('dev-livro-nome').value;

    // Localiza o empréstimo ativo para essa pessoa e livro
    const emprestimoAtivo = emprestimos.find(e =>
        e.pessoa.idetificacao === idPessoa &&
        e.livro.nome.toLowerCase() === nomeLivro.toLowerCase() &&
        e.status === "Ativo"
    );

    if (!emprestimoAtivo) {
        mensagemStatus.style.color = "red";
        mensagemStatus.innerText = "Erro: Nenhum empréstimo ativo encontrado com esses dados!";
        return;
    }

    // Executa o método finalizarEmprestimo() da classe
    const mensagemRetorno = emprestimoAtivo.finalizarEmprestimo();

    // Exibe a mensagem de retorno (se devovel no prazo ou com atraso)
    mensagemStatus.style.color = emprestimoAtivo.estaAtrasado() ? "orange" : "green";
    mensagemStatus.innerText = `${mensagemRetorno} | Estoque atualizado: ${emprestimoAtivo.livro.qtdeExemplares}`;

    formDevolucao.reset();
});

