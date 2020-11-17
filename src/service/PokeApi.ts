//Model
import Pokemon from "../model/Pokemon";

export default class PokeApi {
    private static baseUrl :string = "https://pokeapi.co/api/v2";

    constructor() {}

    public getPokemonList() : Promise<Pokemon[]> {
        return new Promise (async (resolve, reject) => {
            let pokemonList :Pokemon[] = [];

            try{
                //Uma requisição para identificar a quantidade total de Pokemons
                let result = await fetch(`${PokeApi.baseUrl}/pokemon/`);
                let jsonResult = await result.json();

                let pokemonCount :number = jsonResult.count;

                //Outra requisição para obter a lista completa de Pokemons,
                //sem informações de atributos, tipo ou evolução
                result = await fetch(`${PokeApi.baseUrl}/pokemon/?offset=0&limit=${pokemonCount.toString()}`);
                jsonResult = await result.json();

                for(let pokemon of jsonResult.results) {
                    let name :string = pokemon.name;
                    let splitUrl :string[] = pokemon.url.split("/");
                    let code :string = splitUrl[splitUrl.length - 2]; //Devido ao "/" no fim da URL, o ultimo elemento é vazio

                    pokemonList.push(new Pokemon(code, name));
                }

                resolve(pokemonList);
            }catch (err) {
                reject(err);
            }
        })
    }

    public getPokemonInformation(pokemon :Pokemon) : Promise<any> {
        return new Promise (async (resolve, reject) => {
            let pokemonCode :string = pokemon.getCode();

            try{
                //Requisição para identificar os atributos e tipo
                let result :any = await fetch(`${PokeApi.baseUrl}/pokemon/${pokemonCode}`);
                let jsonResult :any = await result.json();
                let statusInformation :any = jsonResult;

                //Com a requisição anterior, utilizamos a URL do species para
                //buscar a URL da cadeia de evolução
                result = await fetch(jsonResult.species.url);
                jsonResult = await result.json();


                if(jsonResult.evolution_chain?.url) {
                    //Caso haja URL da cadeia de evolução, identificamos se o
                    //Pokemon possui evoluções
                    result = await fetch(jsonResult.evolution_chain.url);
                    jsonResult = await result.json();

                    /*
                       Realiza uma busca em profundidade para identificar
                       se o pokemon possui evolução.
                       Se o nome do pokemon for encontrado, é verificado
                       se ele possui alguma evolução.
                       Caso o nome não seja encontrado e a busca se esgote,
                       é porque o pokemon não possui evolução.
                    */
                    let currentChainLevelObject :any = jsonResult.chain;
                    let currentChainLevel :number = 1; //Raiz da árvore
                    let found :boolean = false;
                    let traversalComplete :boolean = false;

                    while(!found && !traversalComplete) {
                        let numberOfVisitedEvolutionPaths :number = 0;
                        let nextChainLevelObject :any;

                        //Armazena o nível atual da árvore, sendo 1 a raiz
                        currentChainLevelObject.currentChainLevel = currentChainLevel;

                        if(currentChainLevelObject.species.name === pokemon.getName().toLowerCase()) {
                            found = true;

                            if(currentChainLevelObject.evolves_to.length > 0) {
                                statusInformation.doesItEvolve = true
                            }else {
                                statusInformation.doesItEvolve = false;
                            }
                        }else {
                            for(let pokemon of currentChainLevelObject.evolves_to) {
                                if(!pokemon.visited) {
                                    pokemon.previousChainLevel = currentChainLevelObject;
                                    nextChainLevelObject = pokemon;

                                    break;
                                }

                                numberOfVisitedEvolutionPaths++;
                            }

                            //Caso positivo, retrocede um nível na árvore;
                            //Caso negativo, avança um nível na árvore
                            if(numberOfVisitedEvolutionPaths === currentChainLevelObject.evolves_to.length) {
                                if(currentChainLevelObject.currentChainLevel === 1) {
                                    statusInformation.doesItEvolve = false;

                                    traversalComplete = true;
                                }else {
                                    currentChainLevelObject.visited = true;
                                    currentChainLevelObject = currentChainLevelObject.previousChainLevel;

                                    currentChainLevel--;
                                }
                            }else {
                                currentChainLevelObject = nextChainLevelObject;

                                currentChainLevel++;
                            }
                        }
                    }
                }else{
                    statusInformation.doesItEvolve = false;
                }

                resolve(statusInformation);
            }catch (err) {
                reject(err);
            }
        });
    }
}