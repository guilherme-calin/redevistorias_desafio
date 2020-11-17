# redevistorias_desafio
Repositório do desafio front-end da empresa Rede Vistorias de Florianópolis.

O *code challenge* se refere a um sistema web para busca e consulta de Pokemons a partir da API [PokeAPI](https://pokeapi.co/). 
É possível pesquisar o Pokemon por nome ou código numérico, sem ser necessário digitar o texto exato. 
A busca irá identificar qualquer Pokemomon que possua uma correspondência parcial com o que
foi digitado. 

### Pré-Requisitos

É necessário instalar o Node.js e NPM para executar este projeto.

### Instruções para Execução

* Clone o repositório;
* Acesse via linha de comando a pasta raiz do projeto clonado em sua máquina;
* Execute o comando ```npm install```;
* Após a instalação das dependências, execute o comando ```npm start``` para testar localmente na máquina,
  por meio da URL ```localhost:3000``` no *browser*.                                                                                                                                                
* Caso queira hospedar o projeto em um servidor, execute o comando ```npm run build``` para
gerar o *build* de produção no diretório ```./build``` do projeto, e sirva o conteúdo no
*backend* de sua preferência. 

### Instruções para Utilização

O sistema inicialmente irá trazer todos os Pokemons identificados pela consulta à API.

O sistema possui controle de paginação, sendo que a quantidade de registros por página
varia entre 10, 15 ou 20 dependendo da largura da tela do dispositivo sendo utilizado.

Para realizar a busca, é possível apertar a tecla Enter (ou o botão de busca no smartphone)
para disparar a consulta, além do botão de pesquisa disponível. 

Ao deixar o campo de busca vazio, o sistema irá automaticamente trazer todos os Pokemons disponíveis novamente.

Ao clicar sobre o *card* de um Pokemon, uma tela será aberta contendo mais informações sobre ele,
como tipo, atributos e se possui evoluções.

### Linguagens, Bibliotecas e Frameworks utilizados
* Linguagem de programação Typescript;
* React como *framework* de front end;
* Sass como pré-processador CSS.                                                                      

### Processo de criação

Primeiramente foi definido o *layout* da aplicação utilizando o Figma, uma ferramenta *web*
para prototipação de interfaces.

O primeiro *layout* definido foi para telas de dispositivos móveis com 360 *pixels*
de largura, seguindo o paradigma *Mobile First*. Ao finalizá-lo, foi então criado 
o layout para telas *Full HD*, com 1920 *pixels* de largura. Os *breakpoints* para telas
intermediárias foram definidos ao final do projeto.

#### Componentes

Tendo o *layout* em mãos, iniciou-se o processo de codificação do projeto. 
Foi utilizada a seguinte estrutura de componentes:

```
App
 |--Header
 |--PageControl
 |--ResultsPage
      |--PokemonCard
 |--Footer
 |--PokemonInformation
      |--StatusBar
```

* App: Componente raiz da aplicação;
* Header: Componente do cabeçalho;
* PageControl: Controle de paginação. Foram utilizadas duas instâncias no projeto;
* ResultsPage: Se refere à pagina atual de resultados, em que os *cards* dos Pokemons
são apresentados;
* PokemonCard: Apresenta o nome, código e imagem do Pokemon. Em resposta ao clique, o sistema
apresenta o componente PokemonInformation com mais detalhes;
* Footer: Componente do rodapé;
* PokemonInformation: Tela que apresenta detalhes do Pokemon selecionado, como atributos,
tipos e se há evoluções.
* StatusBar: Medidor de atributo. A barra se preenche de 0 a 100% dependendo do valor atual
e valor máximo informados.

#### Requisições à API
Para que seja possível realizar a busca parcial pelo nome ou código do Pokemon, é necessário
possuir a lista completa de antemão, sendo ela adquirida e armazenada ao iniciar a aplicação.

O *endpoint* utilizado para consulta completa fornece apenas as informações de código e nome
dos Pokemons. Para adquirir a URL da imagem de cada Pokemon, seria necessário realizar uma
consulta específica para cada Pokemon, o que acarretaria em centenas de requisições toda vez
que a aplicação fosse iniciada. Devido a isso, foi utilizado o [repositório de *sprites*](https://github.com/PokeAPI/sprites)
da [PokeAPI](https://pokeapi.co/) neste projeto, armazenando apenas os *sprites* padrão de cada Pokemon. 

Para obter as informações de tipo, atributos e evolução de um Pokemon, é necessário realizar
consultas específicas por Pokemon a outros *endpoints*, portanto essas informações são apenas
requisitadas quando o usuário clica sobre o *card* do Pokemon. Após a consulta, as informações
são armazenadas para evitar requisições subsequentes desnecessárias.

#### Dificuldades Encontradas
A maior dificuldade enfrentada foi em relação às animações de transição utilizadas.  


  