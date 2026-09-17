// Simulador de futebol
class Jogador {
    constructor(nome, posicao) {
        this.nome = nome;
        this.posicao = posicao;
        this.time = null;
    }
}

class Time {
    constructor(nome) {
        this.nome = nome;
        this.jogadores = [];
    }

    adicionarJogador(jogador) {
        if (this.jogadores.length < 11) { // O time pode ter 11 jogadores
            jogador.time = this;
            this.jogadores.push(jogador);
        }
    }
}

// Estrutura exata com 11 posições
const estruturaPosicao = [
    'Goleiro',
    'Defensor 1', 'Defensor 2', 'Defensor 3', 'Defensor 4',
    'Meia 1', 'Meia 2', 'Meia 3', 'Meia 4',
    'Atacante 1', 'Atacante 2'
];

// Gera os 11 inputs dentro dos cards HTML
function renderizarCamposJogadores() {
    const container1 = document.getElementById('container-time1');
    const container2 = document.getElementById('container-time2');

    estruturaPosicao.forEach((posicao, i) => {
        container1.innerHTML += `
            <label class="input-field">
                ${posicao}:
                <input type="text" id="t1_j${i}" required placeholder="Nome">
            </label>
        `;

        container2.innerHTML += `
            <label class="input-field">
                ${posicao}:
                <input type="text" id="t2_j${i}" required placeholder="Nome">
            </label>
        `;
    });
}

// Lógica para simular a partida e sortear quem fez os gols
function simularPartida(time1, time2) {
    const golsTime1 = Math.floor(Math.random() * 5);
    const golsTime2 = Math.floor(Math.random() * 5);

    const autores1 = [];
    for (let i = 0; i < golsTime1; i++) {
        const jogadorSorteado = time1.jogadores[Math.floor(Math.random() * 11)];
        autores1.push(jogadorSorteado.nome);
    }

    const autores2 = [];
    for (let i = 0; i < golsTime2; i++) {
        const jogadorSorteado = time2.jogadores[Math.floor(Math.random() * 11)];
        autores2.push(jogadorSorteado.nome);
    }

    return {
        placar: `${time1.nome} ${golsTime1} x ${golsTime2} ${time2.nome}`,
        autores1,
        autores2
    };
}

// Executa assim que o HTML carregar
document.addEventListener('DOMContentLoaded', () => {
    renderizarCamposJogadores();

    document.getElementById('form-simulador').addEventListener('submit', function (e) {
        e.preventDefault();

        const time1 = new Time(document.getElementById('nomeTime1').value);
        const time2 = new Time(document.getElementById('nomeTime2').value);

        // Instancia os 11 jogadores do Time 1
        for (let i = 0; i < 11; i++) {
            const nomeJogador = document.getElementById(`t1_j${i}`).value;
            const jogador = new Jogador(nomeJogador, estruturaPosicao[i]);
            time1.adicionarJogador(jogador);
        }

        // Instancia os 11 jogadores do Time 2
        for (let i = 0; i < 11; i++) {
            const nomeJogador = document.getElementById(`t2_j${i}`).value;
            const jogador = new Jogador(nomeJogador, estruturaPosicao[i]);
            time2.adicionarJogador(jogador);
        }

        // Simula e exibe
        const resultado = simularPartida(time1, time2);
        const divResultado = document.getElementById('resultado');
        divResultado.innerHTML = `
            <h2>Resultado do Jogo</h2>
            <p><strong>${resultado.placar}</strong></p>
            <p><strong>Gols de ${time1.nome}:</strong> ${resultado.autores1.join(', ') || 'Nenhum'}</p>
            <p><strong>Gols de ${time2.nome}:</strong> ${resultado.autores2.join(', ') || 'Nenhum'}</p>
        `;
    });
});
