import Pokemon from "../model/Pokemon";

export default class PokeApi {
    private static baseUrl :string = "https://pokeapi.co/api/v2/pokemon/";

    constructor() {}

    public getPokemonList() : Promise<Pokemon[]> {
        return new Promise (async (resolve, reject) => {
            let pokemonList :Pokemon[] = [];

            try{
                //Uma requisição para pegar a quantidade total de Pokemons
                let result = await fetch(PokeApi.baseUrl);
                let jsonResult = await result.json();

                let pokemonCount :number = jsonResult.count;

                //Outra requisição para pegar a lista completa
                result = await fetch(PokeApi.baseUrl + "?offset=0&limit=" + pokemonCount.toString());
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

    public getPokemonInformation(pokemon :Pokemon) : Promise<void> {
        return new Promise (async (resolve, reject) => {
            let pokemonCode :string = pokemon.getCode();

            try{
                //Uma requisição para pegar a quantidade total de Pokemons
                let result = await fetch(PokeApi.baseUrl + pokemonCode);
                let jsonResult = await result.json();

                pokemon.setAdditionalInfo(jsonResult);

                resolve();
            }catch (err) {
                reject(err);
            }
        })
    }
}