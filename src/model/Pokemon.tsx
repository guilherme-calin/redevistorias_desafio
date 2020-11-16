export default class Pokemon {
    //Informações iniciais obrigatórias
    private code :string;
    private name :string;


    //Atributos do Pokemon
    private hp :number;
    private attack :number;
    private defense :number;
    private specialAttack :number;
    private specialDefense :number;
    private speed :number;
    private types :string[];

    //Mapeamento dos tipos com o nome em português e as classes CSS adequadas
    public static typeMap :Map<string, any> = Pokemon.getTypeMap();

    constructor(code :string, name :string) {
        this.code = code;
        this.name = this.capitalizeFirstLetter(name);

        this.hp = -1;
        this.attack = -1;
        this.defense = -1;
        this.specialAttack = -1;
        this.specialDefense = -1;
        this.speed = -1;
        this.types = [];
    }

    public getCode() :string {
        return this.code;
    }

    public getName() :string {
        return this.name;
    }

    private capitalizeFirstLetter(name :string) :string{
        let splitName :string[] = name.split("-");
        let capitalizedName :string = "";

        for(let i = 0; i < splitName.length; i++) {
            let firstLetterCaps = splitName[i].charAt(0).toUpperCase();

            capitalizedName += firstLetterCaps + splitName[i].slice(1);

            if(i < splitName.length - 1) {
                capitalizedName += "-";
            }
        }

        return capitalizedName;
    }

    public setAdditionalInfo(pokeapiResponse :any) :void {
        for(let stat of pokeapiResponse.stats) {
            if(stat.stat.name === "hp") {
                this.hp = stat.base_stat;
            }else if(stat.stat.name === "attack") {
                this.attack = stat.base_stat;
            }else if(stat.stat.name === "defense") {
                this.defense = stat.base_stat;
            }else if(stat.stat.name === "special-attack") {
                this.specialAttack = stat.base_stat;
            }else if(stat.stat.name === "special-defense") {
                this.specialDefense = stat.base_stat;
            }else if(stat.stat.name === "speed") {
                this.speed = stat.base_stat;
            }
        }

        for(let type of pokeapiResponse.types) {
            this.types.push(type.name);
        }

        return
    }

    public static getTypeMap() :Map<string, any>{
        let typeMap :Map<string, any> = new Map();

        Pokemon.typeMap.set("normal", {
            cssClass : "type-color_normal",
            cssTextColorClass : "text-black",
            portugueseType : "Normal"
        });
        Pokemon.typeMap.set("fighting", {
            cssClass : "type-color_fighting",
            cssTextColorClass : "text-white",
            portugueseType : "Lutador"
        });
        Pokemon.typeMap.set("flying", {
            cssClass : "type-color_flying",
            cssTextColorClass : "text-black",
            portugueseType : "Voador"
        });
        Pokemon.typeMap.set("poison", {
            cssClass : "type-color_poison",
            cssTextColorClass : "text-white",
            portugueseType : "Venenoso"
        });
        Pokemon.typeMap.set("ground", {
            cssClass : "type-color_ground",
            cssTextColorClass : "text-black",
            portugueseType : "Terra"
        });
        Pokemon.typeMap.set("rock", {
            cssClass : "type-color_rock",
            cssTextColorClass : "text-black",
            portugueseType : "Pedra"
        });
        Pokemon.typeMap.set("bug", {
            cssClass : "type-color_bug",
            cssTextColorClass : "text-black",
            portugueseType : "Inseto"
        });
        Pokemon.typeMap.set("ghost", {
            cssClass : "type-color_ghost",
            cssTextColorClass : "text-white",
            portugueseType : "Fantasma"
        });
        Pokemon.typeMap.set("steel", {
            cssClass : "type-color_steel",
            cssTextColorClass : "text-black",
            portugueseType : "Aço"
        });
        Pokemon.typeMap.set("fire", {
            cssClass : "type-color_fire",
            cssTextColorClass : "text-black",
            portugueseType : "Fogo"
        });
        Pokemon.typeMap.set("water", {
            cssClass : "type-color_water",
            cssTextColorClass : "text-black",
            portugueseType : "Água"
        });
        Pokemon.typeMap.set("grass", {
            cssClass : "type-color_grass",
            cssTextColorClass : "text-black",
            portugueseType : "Grama"
        });
        Pokemon.typeMap.set("electric", {
            cssClass : "type-color_electric",
            cssTextColorClass : "text-black",
            portugueseType : "Elétrico"
        });
        Pokemon.typeMap.set("psychic", {
            cssClass : "type-color_psychic",
            cssTextColorClass : "text-black",
            portugueseType : "Psíquico"
        });
        Pokemon.typeMap.set("ice", {
            cssClass : "type-color_ice",
            cssTextColorClass : "text-black",
            portugueseType : "Gelo"
        });
        Pokemon.typeMap.set("dragon", {
            cssClass : "type-color_dragon",
            cssTextColorClass : "text-white",
            portugueseType : "Dragão"
        });
        Pokemon.typeMap.set("dark", {
            cssClass : "type-color_dark",
            cssTextColorClass : "text-white",
            portugueseType : "Sombrio"
        });
        Pokemon.typeMap.set("fairy", {
            cssClass : "type-color_fairy",
            cssTextColorClass : "text-black",
            portugueseType : "Fada"
        });
        Pokemon.typeMap.set("unknown", {
            cssClass : "type-color_unknown",
            cssTextColorClass : "text-black",
            portugueseType : "???"
        });
        Pokemon.typeMap.set("shadow", {
            cssClass : "type-color_shadow",
            cssTextColorClass : "text-black",
            portugueseType : "Sombra"
        });

        return typeMap;
    }
}
