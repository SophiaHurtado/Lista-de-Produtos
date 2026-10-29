//criar uma variavel listaProdutos;
//chamar o id do HTML "produtos", que é onde está a lista da API
const listaProdutos =  document.getElementById("produtos");
console.log(listaProdutos);

const listaDetalhes = document.getElementById("detalhes");

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
        
        //createElement = tag na memória
        const imagem = document.createElement("img");
        //src = define o endereço da imagem e o valor vai no campo "image"
        imagem.src = produto.image;
        //alt = define um texto caso a imagem falhar
        imagem.alt = produto.title;

        const titulo = document.createElement("p");
        //textContent = caixa de texto, nese caso vai pegar o valor do titulo e jogar nessa caixa
        titulo.textContent = produto.title;

        //p = cria uma tag de paragrafo
        const preco = document.createElement("p");
        // como R$ não é pre definido no codigo, precisamos colocá-lo como texto para ser contatenado com outra informação
        //toFixed(2) = forçamentos as casas decimais do valor ser 2
        preco.textContent = "R$" + produto.price.toFixed(2);

        const botao = document.createElement("button");
        botao.textContent = "Ver Detalhes";

        //addEventListener é usado para instruir o que fazer de acordo com uma ação
        botao.addEventListener("click", function(){
            //quando clicado no botão, chama a função de carregar detalhes (no console ainda)
            carregarDetalhes(produto.id);
        });


        //aqui atualizamos a lista com todas as informações adicionais que colocamos acima
        item.appendChild(imagem);
        item.appendChild(titulo);
        item.appendChild(preco);
        item.appendChild(botao);

        listaProdutos.appendChild(item);

    })
}

//utilizando id como parametro podemos usá-la para qualquer produto
async function carregarDetalhes(id) {
    //resposta guarda a resposta bruta
    const resposta = await fetch("https://fakestoreapi.com/products/" + id);
    //.json() converte para que o JS possa ler
    const produto = await resposta.json();

    mostrarDetalhes(produto);
}

function mostrarDetalhes(produto) {

        //inner.html = limpa o painel para aparecer apenas o produto que a pessoa clicar
        listaDetalhes.innerHTML = "";

        const item = document.createElement("li");

        const imagem = document.createElement("img");
        imagem.src = produto.image;
        imagem.alt = produto.title;

        const titulo = document.createElement("h3");
        titulo.textContent = produto.title;

        const preco = document.createElement("p");
        preco.textContent = "R$" + produto.price.toFixed(2);

        const categoria = document.createElement("p");
        categoria.textContent = "Categoria" + produto.category;

        const descricao = document.createElement("p");
        descricao.textContent = "Descrição: " + produto.description;

        item.appendChild(imagem);
        item.appendChild(titulo);
        item.appendChild(preco);
        item.appendChild(categoria);
        item.appendChild(descricao);

        listaDetalhes.appendChild(item);
}



//precisa chamar a função para que ela rode
carregarProdutos();

