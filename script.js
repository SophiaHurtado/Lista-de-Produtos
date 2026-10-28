//criar uma variavel listaProdutos;
//chamar o id do HTML "produtos", que é onde está a lista da API
const listaProdutos =  document.getElementById("produtos");
console.log(listaProdutos);

//fetch para fazer requisições à API
//aync quando vamos esperar uma informação dentro de uma função
//"resposta" uma variavel criada que armazena o resultado da função quando chamamos a lista da API com o fetch
// "osprodutos" uma variavel criada que armazena o resultado quando convertemos o resultado da lista da API em arquivo JSON (próprio para leitura no JS)
//console.log é usado para conferir o andamento do codigo e se está funcionando conforme o esperado
async function carregarProdutos() {
    const resposta = await fetch("https://fakestoreapi.com/products?limit=8");
    const osprodutos = await resposta.json();
    
    osprodutos.forEach(function(produto) {
        const item = document.createElement("li");
        item.textContent = produto.title;
        listaProdutos.appendChild(item);
    })
}

//precisa chamar a função para que ela rode
carregarProdutos();

