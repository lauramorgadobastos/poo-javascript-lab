class Funcionario {
    constructor(nome, salario)
    {
        this.nome = nome;
        this.salario = salario;
    }

    calculaBonus()
    {
        return this.salario * 0.12
    }
}

class Gerente extends Funcionario {
    constructor(nome, salario, npesoas) {
        super(nome, salario)
        this.npesoas = npesoas;
    }

    calculaBonus() {
        return this.salario * 0.22
    }
}
// Integração com o usuário

function togglePessoas() {
    const cargo = document.getElementById('cargo').value;
    document.getElementById('campoPessoas').style.display =
        cargo === 'gerente' ? 'block' : 'none';
}

function calcular() {
    const nome = document.getElementById('nome').value;
    const salario = parseFloat(document.getElementById('salario').value);
    const cargo = document.getElementById('cargo').value;
    const resultado = document.getElementById('resultado');

    let pessoa;

    if (cargo === 'gerente') {
        const npessoas = parseInt(document.getElementById('npessoas').value);
        pessoa = new Gerente(nome, salario, npessoas);
    } else {
        pessoa = new Funcionario(nome, salario);
    }

    const bonus = pessoa.calculaBonus();
    resultado.innerText = `O valor do bônus de ${pessoa.nome} é R$ ${bonus.toFixed(2)}`;
}


