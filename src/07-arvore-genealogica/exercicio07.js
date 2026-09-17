// Árvore Genealógica
class Pessoa {
    constructor(nome, idade, mae = null, pai = null) {
        this.nome = nome;
        this.idade = idade;
        this.mae = mae;
        this.pai = pai;
    }

    imprimirArvore() {
        const avoPaterno = this.pai && this.pai.pai ? this.pai.pai.nome : "Não cadastrado";
        const avoPaterna = this.pai && this.pai.mae ? this.pai.mae.nome : "Não cadastrado";
        const avoMaterno = this.mae && this.mae.pai ? this.mae.pai.nome : "Não cadastrado";
        const avoMaterna = this.mae && this.mae.mae ? this.mae.mae.nome : "Não cadastrado";

        return `
      <div style="border: 1px solid #ccc; padding: 15px; border-radius: 8px;">
        <h3>Árvore Genealógica de ${this.nome}</h3>
        <p><strong>Nome:</strong> ${this.nome} (${this.idade} anos)</p>
        <p><strong>Pai:</strong> ${this.pai ? this.pai.nome : "Não cadastrado"}</p>
        <p><strong>Mãe:</strong> ${this.mae ? this.mae.nome : "Não cadastrado"}</p>
        <p><strong>Avô Paterno:</strong> ${avoPaterno}</p>
        <p><strong>Avó Paterna:</strong> ${avoPaterna}</p>
        <p><strong>Avô Materno:</strong> ${avoMaterno}</p>
        <p><strong>Avó Materna:</strong> ${avoMaterna}</p>
      </div>
    `;
    }
}

function gerarArvore() {
    // Instanciando os Avós
    const avoPaterno = new Pessoa(document.getElementById("nomeAvoPaterno").value || "Não cadastrado", 0);
    const avoPaterna = new Pessoa(document.getElementById("nomeAvoPaterna").value || "Não cadastrado", 0);
    const avoMaterno = new Pessoa(document.getElementById("nomeAvoMaterno").value || "Não cadastrado", 0);
    const avoMaterna = new Pessoa(document.getElementById("nomeAvoMaterna").value || "Não cadastrado", 0);

    // Instanciando os Pais (passando os avós nos parâmetros mae e pai)
    const pai = new Pessoa(
        document.getElementById("nomePai").value || "Não cadastrado",
        Number(document.getElementById("idadePai").value),
        avoPaterna,
        avoPaterno
    );

    const mae = new Pessoa(
        document.getElementById("nomeMae").value || "Não cadastrado",
        Number(document.getElementById("idadeMae").value),
        avoMaterna,
        avoMaterno
    );

    //  Instanciando o Filho/Pessoa principal (passando a mãe e o pai)
    const filho = new Pessoa(
        document.getElementById("nome").value || "Não cadastrado",
        Number(document.getElementById("idade").value),
        mae,
        pai
    );

    //  Exibindo o resultado diretamente no HTML
    document.getElementById("resultado").innerHTML = filho.imprimirArvore();
}



