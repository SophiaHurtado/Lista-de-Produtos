# Lista de Produtos

Página com duas colunas: à esquerda, a lista de produtos; à direita, os detalhes do produto clicado. Os dados vêm da [FakeStore API](https://fakestoreapi.com).

## Funcionalidades

- Lista os 8 primeiros produtos (imagem, título e preço)
- Ao clicar em "Ver Detalhes", faz uma nova requisição a `/products/{id}` e mostra o produto completo (imagem, título, preço, categoria e descrição)
- Mostra "Carregando..." enquanto os dados são buscados
- Mostra uma mensagem de erro se a API falhar
- Layout lado a lado em telas grandes e empilhado em celulares

## Tecnologias

HTML, CSS e JavaScript.

## Estrutura

- `index.html`: estrutura da página
- `style.css`: estilos e responsividade
- `script.js`: requisições à API e criação dos elementos na tela

## Como executar

1. Baixe ou clone este repositório
2. Abra o arquivo `index.html` no navegador

Não precisa instalar nada, mas é necessário ter conexão com a internet.

## Decisões do projeto

- Usei `createElement` para montar os elementos, o que me permite adicionar o clique direto em cada botão
- Os preços aparecem em `U$` porque os valores da API são em dólar
- Verifiquei `resposta.ok` antes de converter para JSON, porque o `fetch` não trata erros 404 ou 500 como falha por conta própria