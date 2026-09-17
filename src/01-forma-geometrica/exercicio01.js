/* Cálculo da área de uma figura geométrica. Aceita quatro tipos de figura
geométrica: quadrado, retângulo, triângulo e círculo */

// Class Forma geométrica (Herança e polimorfismo)

class FormaGeometrica {
    constructor(nome) {
        this.nome = nome;
    }
    calcularArea() {
        return (null);
    }
}

class Quadrado extends FormaGeometrica {
    constructor(lado) {
        super("Quadrado");
        this.lado = lado;
    }
    calcularArea() {
        return (this.lado * this.lado);
    }
}
class Retangulo extends FormaGeometrica {
    constructor(base, altura)
    {
        super("Retângulo");
        this.base = base;
        this.altura = altura;
    }
    calcularArea() {
        return (this.base * this.altura);
    }
}

class Triangulo extends FormaGeometrica {
    constructor(base, altura) {
        super("Triângulo");
        this.base = base;
        this.altura = altura;
    }
    calcularArea() {
        return (this.base * this.altura) / 2;
    }
}

class Circulo extends FormaGeometrica {
    constructor(raio) {
        super("Círculo");
        this.raio = raio;
    }
    calcularArea() {
        return (Math.PI * Math.pow(this.raio, 2));
    }
}

const seletorForma = document.getElementById('tipo-forma');
const inputsContainer = document.getElementById('inputs-container');
const btnCalcular = document.getElementById('calcular-btn');
const output = document.getElementById('resultado-output');

// Função para atualizar os inputs dependendo da forma escolhida
function atualizarCampos() {
    const forma = seletorForma.value;
    inputsContainer.innerHTML = ''; // Limpa os inputs anteriores

    if (forma === 'quadrado') {
        inputsContainer.innerHTML = `<input type="number" id="lado" placeholder="Digite o lado">`;
    } else if (forma === 'retangulo' || forma === 'triangulo') {
        inputsContainer.innerHTML = `
            <input type="number" id="base" placeholder="Digite a base">
            <input type="number" id="altura" placeholder="Digite a altura">
        `;
    } else if (forma === 'circulo') {
        inputsContainer.innerHTML = `<input type="number" id="raio" placeholder="Digite o raio">`;
    }
}

seletorForma.addEventListener('change', atualizarCampos);
window.addEventListener('load', atualizarCampos); // Carrega os inputs iniciais

// Ação de calcular
btnCalcular.addEventListener('click', () => {
    const forma = seletorForma.value;
    let area = 0;

    if (forma === 'quadrado') {
        const lado = Number(document.getElementById('lado').value);
        const q = new Quadrado(lado);
        area = q.calcularArea();
    } else if (forma === 'retangulo') {
        const base = Number(document.getElementById('base').value);
        const altura = Number(document.getElementById('altura').value);
        const r = new Retangulo(base, altura);
        area = r.calcularArea();
    } else if (forma === 'triangulo') {
        const base = Number(document.getElementById('base').value);
        const altura = Number(document.getElementById('altura').value);
        const t = new Triangulo(base, altura);
        area = t.calcularArea();
    } else if (forma === 'circulo') {
        const raio = Number(document.getElementById('raio').value);
        const c = new Circulo(raio);
        area = c.calcularArea();
    }

    output.textContent = `A área é: ${area.toFixed(2)}`;
});