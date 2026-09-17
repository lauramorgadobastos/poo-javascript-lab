// Supermercado 

class Produto {
    constructor(nome, tipo, preco, qtdeEstoque) {
        this.nome = nome;
        this.tipo = tipo;
        this.preco = preco;
        this.qtdeEstoque = qtdeEstoque;
    }

    disponivelEstoque(qtde) {
        return this.qtdeEstoque >= qtde;
    }

    retirarProduto(qtde) {
        if (this.disponivelEstoque(qtde)) {
            this.qtdeEstoque -= qtde;
            return true;
        }
        return false;
    }
}
class Cliente {
    constructor(nome) {
        this.nome = nome;
    }
}

class ItemPedido {
    constructor(produto, quantidade)
    {
        this.produto = produto;
        this.quantidade = quantidade;
    }
    calcularSubTotal() {
        return this.produto.preco * this.quantidade;
    }
}

class Pedido{
    constructor(cliente, formaPaga) {
        this.cliente = cliente;
        this.formaPaga = formaPaga;
        this.itens = [];
    }

    adicionarItem(item) {
        if (item.produto.disponivelEstoque(item.quantidade)) {
            this.itens.push(item);
            return true;
        }
        return false;
    }

    calcularTotal() {
        return this.itens.refuce((total, item) => total + item.calcularSubTotal(), 0);
    }

    finalizarPedido() {
        this.itens.forEach(item => {
            item.produto.retirarProduto(item.quantidade);
        })
    }
}