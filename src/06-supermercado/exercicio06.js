// Supermercado 

class Produto {
    constructor(nome, tipo, preco, qtdeEstoque) {
        this.nome = nome;
        this.tipo = tipo;
        this.preco = parseFloat(preco);
        this.qtdeEstoque = parseInt(qtdeEstoque);
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
        return this.itens.reduce((total, item) => total + item.calcularSubTotal(), 0);
    }

    finalizarPedido() {
        this.itens.forEach(item => {
            item.produto.retirarProduto(item.quantidade);
        })
    }
}

// Protudos Fixos
const produtosCadastrados = [
    new Produto("Arroz 5kg", "Alimentos", 25.90, 50),
    new Produto("Feijão Carioca 1kg", "Alimentos", 8.50, 40),
    new Produto("Leite Integral 1L", "Bebidas", 4.90, 100),
    new Produto("Refrigerante 2L", "Bebidas", 9.50, 30),
    new Produto("Detergente 500ml", "Limpeza", 2.80, 60)
];

// Adicione esta chamada no final do arquivo JS para preencher o <select> ao abrir a página:
atualizarSelectProdutos();

let pedidoAtual = null;

function cadastrarProduto() {
    const nome = document.getElementById('pNome').value;
    const tipo = document.getElementById('pTipo').value;
    const preco = document.getElementById('pPreco').value;
    const estoque = document.getElementById('pEstoque').value;

    if (!nome || !preco || !estoque) {
        alert('Preencha os campos do produto!');
        return;
    }

    const novoProduto = new Produto(nome, tipo, preco, estoque);
    produtosCadastrados.push(novoProduto);
    atualizarSelectProdutos();

    document.getElementById('pNome').value = '';
    document.getElementById('pTipo').value = '';
    document.getElementById('pPreco').value = '';
    document.getElementById('pEstoque').value = '';
    alert('Produto cadastrado com sucesso!');
}

function atualizarSelectProdutos() {
    const select = document.getElementById('selectProduto');
    select.innerHTML = '<option value="">Selecione um produto</option>';

    produtosCadastrados.forEach((prod, index) => {
        select.innerHTML += `<option value="${index}">${prod.nome} - R$ ${prod.preco.toFixed(2)} (Estoque: ${prod.qtdeEstoque})</option>`;
    });
}

function criarPedido() {
    const nomeCliente = document.getElementById('cNome').value;
    const formaPagamento = document.getElementById('formaPagamento').value;

    if (!nomeCliente) {
        alert('Informe o nome do cliente!');
        return;
    }

    const cliente = new Cliente(nomeCliente);
    pedidoAtual = new Pedido(cliente, formaPagamento);

    document.getElementById('infoPedido').innerText = `Cliente: ${cliente.nome} | Pagamento: ${formaPagamento}`;
    atualizarCarrinho();
}

function adicionarItem() {
    if (!pedidoAtual) {
        alert('Crie um pedido antes de adicionar itens!');
        return;
    }

    const indexProd = document.getElementById('selectProduto').value;
    const qtde = document.getElementById('itemQtde').value;

    if (indexProd === '' || !qtde || qtde <= 0) {
        alert('Selecione um produto e uma quantidade válida!');
        return;
    }

    const produto = produtosCadastrados[indexProd];
    const item = new ItemPedido(produto, qtde);

    if (pedidoAtual.adicionarItem(item)) {
        atualizarCarrinho();
        document.getElementById('itemQtde').value = '';
    } else {
        alert('Quantidade indisponível no estoque!');
    }
}

function atualizarCarrinho() {
    const lista = document.getElementById('listaItens');
    lista.innerHTML = '';

    pedidoAtual.itens.forEach(item => {
        lista.innerHTML += `<li>${item.produto.nome} x ${item.quantidade} = R$ ${item.calcularSubTotal().toFixed(2)}</li>`;
    });

    document.getElementById('valorTotal').innerText = pedidoAtual.calcularTotal().toFixed(2);
}

function finalizarPedidoAtual() {
    if (!pedidoAtual || pedidoAtual.itens.length === 0) {
        alert('Não há itens no pedido para finalizar!');
        return;
    }

    pedidoAtual.finalizarPedido();
    alert(`Pedido de R$ ${pedidoAtual.calcularTotal().toFixed(2)} finalizado com sucesso!`);

    pedidoAtual = null;
    document.getElementById('infoPedido').innerText = 'Nenhum pedido aberto no momento.';
    document.getElementById('listaItens').innerHTML = '';
    document.getElementById('valorTotal').innerText = '0.00';
    atualizarSelectProdutos();
}