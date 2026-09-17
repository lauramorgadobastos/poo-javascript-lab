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
            this.dataDev = new Date();
            // Calcula a data de devolução somando os dias solicitado
            this.dataDev.setDate(this.dataDev.getDate() + diasParaDevolucao);

            this.status = "Ativo";
        } else {
            throw new Error(`O livro "${livro.titulo}" não tem exemplares disponíveis.`);
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