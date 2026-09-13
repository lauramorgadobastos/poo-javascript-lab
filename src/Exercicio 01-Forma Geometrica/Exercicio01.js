

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