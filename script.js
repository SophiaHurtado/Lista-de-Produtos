//criar uma variavel listaProdutos;
const listaProdutos =  document.getElementById("produtos");
//chamar o id do HTML "produtos", que é onde está a lista da API
console.log(listaProdutos);

const listaDetalhes = document.getElementById("detalhes");

//aync quando vamos esperar uma informação dentro de uma função
async function carregarProdutos() {
    //fetch para fazer requisições à API
    //"resposta" uma variavel criada que armazena o resultado da função quando chamamos a lista da API com o fetch
    const resposta = await fetch("https://fakestoreapi.com/products?limit=8");
    //"osprodutos" uma variavel criada que armazena o resultado quando convertemos o resultado da lista da API em arquivo JSON (próprio para leitura no JS)
    const osprodutos = await resposta.json();
    
    //"osprodutos" é uma constante que representa uma lista (array)
    osprodutos.forEach(function(produto) {
        const item = document.createElement("li");
        
        //createElement = tag na memória
        const imagem = document.createElement("img");
        //src = define o endereço da imagem 
        //o valor vai no campo "image"
        imagem.src = produto.image;
        //alt = define um texto caso a imagem falhar
        //ou seja, vai aparecer o título do produto mesmo
        imagem.alt = produto.title;

        const titulo = document.createElement("p");
        //textContent = caixa de texto, nese caso vai pegar o valor do titulo e jogar nessa caixa
        titulo.textContent = produto.title;

        //p = cria uma tag de paragrafo
        const preco = document.createElement("p");
        // como R$ não é pre definido no codigo, precisamos colocá-lo como texto para ser contatenado com outra informação
        //toFixed(2) = forçamentos as casas decimais do valor ser 2
        preco.textContent = "U$ " + produto.price.toFixed(2);
        /*dá mais um nome ou etiqueta para a classe, para conseguir distinguir esse botton no CSS
        por haver mais referencias de <p> no codigo*/
        preco.classList.add("preco");


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
        preco.textContent = "U$ " + produto.price.toFixed(2);
        /*diferenciar o preco dos <p> no CSS*/
        preco.classList.add("preco");

        const categoria = document.createElement("p");
        categoria.textContent = "Categoria: " + produto.category;

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

