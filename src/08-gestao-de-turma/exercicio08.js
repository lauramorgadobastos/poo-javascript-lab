// Gestão de Turma

class Aluno {
    constructor(nome, registroAcademico, nota) {
        this.nome = nome;
        this.registroAcademico = registroAcademico;
        this.nota = Math.max(0, Math.min(10, nota)); //  Intervalo de 0 a 10
    }
}

class Turma {
    constructor(nome, ano) {
        this.nome = nome;
        this.ano = ano;
        this.alunos = []; 
    }

    adicionarAluno(aluno) {
        this.alunos.push(aluno);
    }

    // Média da Turma: Calcular a média das notas
    mediaDaTurma() {
        if (this.alunos.length === 0) return 0; 
        let soma = 0;
        for (let aluno of this.alunos) {
            soma += aluno.nota;
        }
        return soma / this.alunos.length;
    }

    // Alunos reprovados
    alunosReprovados() {
        let reprovados = [];
        for (let aluno of this.alunos) {
            if (aluno.nota < 6) {
                reprovados.push(aluno.nome);
            }
        }
        return reprovados;
    }

    // Percentual de alunos aprovados
    percentualAprovados() {
        if (this.alunos.length === 0) return 0;

        let quantidadeAprovados = 0;
        for (let aluno of this.alunos) {
            if (aluno.nota >= 6) {
                quantidadeAprovados++;
            }
        }

        let percentual = (quantidadeAprovados / this.alunos.length) * 100;
        return percentual;
    }
}
// Interação com o usuário
// Instanciando uma turma padrão para o exercício
const minhaTurma = new Turma("Turma Padrão", 2026);

// Aguarda o HTML carregar antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
    const btnAdicionar = document.getElementById('btnAdicionar');
    const btnCalcular = document.getElementById('btnCalcular');
    const listaAlunosVisual = document.getElementById('listaAlunosVisual');
    const painelResultados = document.getElementById('painelResultados');

    // Evento de clique para adicionar o aluno
    btnAdicionar.addEventListener('click', () => {
        const nome = document.getElementById('nomeAluno').value;
        const ra = document.getElementById('raAluno').value;
        const nota = parseFloat(document.getElementById('notaAluno').value);

        // Validação simples
        if (!nome || !ra || isNaN(nota)) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        // Usa as suas classes para criar e adicionar
        const novoAluno = new Aluno(nome, ra, nota);
        minhaTurma.adicionarAluno(novoAluno);

        // Adiciona na lista visual do HTML
        const li = document.createElement('li');
        li.textContent = `${novoAluno.nome} (RA: ${novoAluno.registroAcademico}) - Nota: ${novoAluno.nota}`;
        listaAlunosVisual.appendChild(li);

        // Limpa os campos para o próximo aluno
        document.getElementById('nomeAluno').value = '';
        document.getElementById('raAluno').value = '';
        document.getElementById('notaAluno').value = '';
        document.getElementById('nomeAluno').focus();
    });

    // Evento de clique para calcular e exibir os resultados finais
    btnCalcular.addEventListener('click', () => {
        if (minhaTurma.alunos.length === 0) {
            painelResultados.innerHTML = "<p>Nenhum aluno cadastrado na turma ainda.</p>";
            return;
        }

        // Puxa os dados dos seus métodos
        const media = minhaTurma.mediaDaTurma().toFixed(2);
        const reprovados = minhaTurma.alunosReprovados();
        const percentual = minhaTurma.percentualAprovados().toFixed(2);

        // Formata o texto de reprovados
        const textoReprovados = reprovados.length > 0 ? reprovados.join(', ') : "Nenhum aluno reprovado!";

        // Escreve os resultados no HTML
        painelResultados.innerHTML = `
            <p><strong>a. Média da Turma:</strong> ${media}</p>
            <p><strong>b. Alunos Reprovados:</strong> ${textoReprovados}</p>
            <p><strong>c. Percentual de Aprovados:</strong> ${percentual}%</p>
        `;
    });
});

