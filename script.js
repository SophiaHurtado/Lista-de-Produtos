//criar uma variavel listaProdutos;
//chamar o id do HTML "produtos", que é onde está a lista da API
const listaProdutos =  document.getElementById("produtos");

const listaDetalhes = document.getElementById("detalhes");

//async quando vamos esperar uma informação dentro de uma função
async function carregarProdutos() {
    //escreve o texto no painel da esquerda, antes da requisição começar
    listaProdutos.innerHTML = "Carregando...";

    try {
        //fetch para fazer requisições à API
        //"resposta" uma variavel criada que armazena o resultado da função quando chamamos a lista da API com o fetch
        const resposta = await fetch("https://fakestoreapi.com/products?limit=8");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar a lista");
        }

        //"osprodutos" uma variavel criada que armazena o resultado quando convertemos o resultado da lista da API em arquivo JSON (próprio para leitura no JS)
        const osprodutos = await resposta.json();

        //esse InnerHTML aqui apaga o texto "Carregando..." para os cartões entrarem no lugar
        listaProdutos.innerHTML ="";
    
        //"osprodutos" é uma constante que representa uma lista (array)
        //forEach itera cada item da lista, usando a mesma propriedade para todos
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

            const titulo = document.createElement("h3");
            //textContent = caixa de texto, nesse caso vai pegar o valor do titulo e jogar nessa caixa
            titulo.textContent = produto.title;

            //p = cria uma tag de paragrafo
            const preco = document.createElement("p");
            // como U$ não vem da API, precisamos colocá-lo como texto para ser concatenado com outra informação
            //toFixed(2) = força o valor a ter duas casas decimais
            preco.textContent = "U$ " + produto.price.toFixed(2);
            /*dá mais um nome ou etiqueta para a classe, para conseguir distinguir esse preco no CSS
            por haver mais referencias de <p> no codigo*/
            preco.classList.add("preco");

            //botao "Ver Detalhes"
            const botao = document.createElement("button");
            botao.textContent = "Ver Detalhes";

            //addEventListener é usado para instruir o que fazer de acordo com uma ação
            botao.addEventListener("click", function() {
                //quando clicado no botão, chama a função de carregar detalhes
                carregarDetalhes(produto.id);
            });

            //cria uma tag div(caixinha)
            const info = document.createElement("div");
            //as três linhas abaixo colocam titulo, preço e botão na mesma caixinha 
            info.appendChild(titulo);
            info.appendChild(preco);
            info.appendChild(botao);

            item.appendChild(imagem);
            item.appendChild(info);

            listaProdutos.appendChild(item);

        })

    } catch (erro) {
        listaProdutos.innerHTML = "Não foi possível carregar os produtos.";
        console.log(erro);
    }

}

//utilizando id como parametro podemos usá-la para qualquer produto
async function carregarDetalhes(id) {
    //escreve o texto no painel da direita, antes do fetch(requisição) começar
    listaDetalhes.innerHTML = "Carregando...";

    //vai tentar o código que pode dar erro, depende da internet e da API
    try{
        //resposta: guarda a resposta bruta e await espera a API retornar
        //fetch faz a requisição ao endpoint de detalhes
        const resposta = await fetch("https://fakestoreapi.com/products/" + id);

        //como o fetch não considera o erro 404 (recurso nao encontrado) ou 500(problema interno no servidor) como erro, fazemos manualmente
        //esse !resposta.ok inverte o resultado que chegar do fetch
        //caso seja o erro 404, ele é falso, mas com o !resposta.ok vira verdadeiro e entra nesse if
        //o throw new Error joga automaticamente esse erro para o catch e nem chega a rodar o await abaixo
        if (!resposta.ok) {
            throw new Error("Erro ao buscar o produto");
        }

        //.json() converte para que o JS possa ler
        const produto = await resposta.json();

        mostrarDetalhes(produto);
    //agora qualquer 404, 500 ou queda de internet vai cair no bloco abaixo    
    } catch (erro) {
        listaDetalhes.innerHTML = "Não foi possível carregar os detalhes";
        console.log(erro);
    }


    //explicação detalhada do codigo acima:
    //pelo codigo ser sequencial, vai aparecer de inicio o texto carregando por ser o primeiro comando,
    //logo depois vem a requisição e o conteúdo encontrado é colocado, substituindo o texto inicial "carregando"
}

function mostrarDetalhes(produto) {

    //innerHTML = limpa o painel para aparecer apenas o produto que a pessoa clicar
    listaDetalhes.innerHTML = "";

    //cria uma tag de item de lista chamado item
    const item = document.createElement("li");

    //cria uma tag de imagem chamado imagem
    const imagem = document.createElement("img");
    //src define o endereço da imagem e o valor vai no campo image
    imagem.src = produto.image;
    //alt define o texto alternativo, que aparece se a imagem falhar; usamos o título do produto
    imagem.alt = produto.title;

    const titulo = document.createElement("h3");
    //textContent = caixa de texto, nesse caso vai pegar o valor do titulo e jogar nessa caixa
    titulo.textContent = produto.title;

    //cria uma tag de paragrafo
    const preco = document.createElement("p");
    // como U$ não vem da API, precisamos colocá-lo como texto para ser concatenado com outra informação
    //toFixed(2) = força o valor a ter duas casas decimais
    preco.textContent = "U$ " + produto.price.toFixed(2);
    /*diferenciar o preco dos <p> no CSS*/
    preco.classList.add("preco");

    //cria uma tag de paragrafo
    const categoria = document.createElement("p");
    //"Categoria: " é um texto fixo nosso; o valor vem da API (produto.category) e é concatenado com ele
    categoria.textContent = "Categoria: " + produto.category;

    const descricao = document.createElement("p");
    //"Descrição: " é um texto fixo nosso; o valor vem da API (produto.description) e é concatenado com ele
    descricao.textContent = "Descrição: " + produto.description;

    //coloca dentro do item, nessa ordem, a imagem, o título, o preço, a categoria e a descrição, um abaixo do outro
    item.appendChild(imagem);
    item.appendChild(titulo);
    item.appendChild(preco);
    item.appendChild(categoria);
    item.appendChild(descricao);

    //coloca o item completo dentro do painel de detalhes, e é aqui que ele aparece na tela 
    listaDetalhes.appendChild(item);
}

//precisa chamar a função para que ela rode
carregarProdutos();

