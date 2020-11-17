export default class Pokemon {
    //Informações iniciais obrigatórias
    private code :string;
    private name :string;

    //Atributos do Pokemon
    private areAdditionalInformationSet :boolean;
    private hp :number;
    private attack :number;
    private defense :number;
    private specialAttack :number;
    private specialDefense :number;
    private speed :number;
    private types :string[];
    private doesItEvolve :boolean;

    //Mapeamento dos tipos com o nome em português e as classes CSS adequadas
    public static typeMap :Map<string, any> = Pokemon.getTypeMap();

    constructor(code? :string, name? :string) {
        this.code = code || "";
        this.name = this.capitalizeFirstLetter(name || "");

        this.hp = -1;
        this.attack = -1;
        this.defense = -1;
        this.specialAttack = -1;
        this.specialDefense = -1;
        this.speed = -1;
        this.types = [];
        this.doesItEvolve = false;
        this.areAdditionalInformationSet = false;
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

    public getAreAdditionalInformationSet() :boolean {
        return this.areAdditionalInformationSet;
    }

    public setAdditionalInformation(pokeapiResponse :any) :void {
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
            this.types.push(type.type.name);
        }

        this.doesItEvolve = pokeapiResponse.doesItEvolve;

        this.areAdditionalInformationSet = true;

        return
    }

    public getStatus() :any {
        return {
            hp: this.hp,
            attack: this.attack,
            defense: this.defense,
            speed: this.speed,
            specialAttack: this.specialAttack,
            specialDefense: this.specialDefense
        }
    }

    public getDoesItEvolve() {
        return this.doesItEvolve;
    }

    public getTypeInformation() :any[] {
        let typeInfo :any[] = [];

        if(this.types.length > 0) {
            typeInfo[0] = Pokemon.typeMap.get(this.types[0]);

            if(this.types.length > 1) {
                typeInfo[1] = Pokemon.typeMap.get(this.types[1]);
            }else {
                typeInfo[1] = typeInfo[0];
            }
        }

        return typeInfo
    }

    //Mapeamento dos tipos com o nome em português e as classes CSS adequadas
    public static getTypeMap() :Map<string, any>{
        let typeMap :Map<string, any> = new Map();

        typeMap.set("normal", {
            cssClass : "js-type-color_normal",
            cssTextClass : "js-text-black",
            portugueseTypeName : "Normal"
        });
        typeMap.set("fighting", {
            cssClass : "js-type-color_fighting",
            cssTextClass : "js-text-white",
            portugueseTypeName : "Lutador"
        });
        typeMap.set("flying", {
            cssClass : "js-type-color_flying",
            cssTextClass : "js-text-black",
            portugueseTypeName : "Voador"
        });
        typeMap.set("poison", {
            cssClass : "js-type-color_poison",
            cssTextClass : "js-text-white",
            portugueseTypeName : "Venenoso"
        });
        typeMap.set("ground", {
            cssClass : "js-type-color_ground",
            cssTextClass : "js-text-black",
            portugueseTypeName : "Terra"
        });
        typeMap.set("rock", {
            cssClass : "js-type-color_rock",
            cssTextClass : "js-text-black",
            portugueseTypeName : "Pedra"
        });
        typeMap.set("bug", {
            cssClass : "js-type-color_bug",
            cssTextClass : "js-text-black",
            portugueseTypeName : "Inseto"
        });
        typeMap.set("ghost", {
            cssClass : "js-type-color_ghost",
            cssTextClass : "js-text-white",
            portugueseTypeName : "Fantasma"
        });
        typeMap.set("steel", {
            cssClass : "js-type-color_steel",
            cssTextClass : "js-text-black",
            portugueseTypeName : "Aço"
        });
        typeMap.set("fire", {
            cssClass : "js-type-color_fire",
            cssTextClass : "js-text-black",
            portugueseTypeName : "Fogo"
        });
        typeMap.set("water", {
            cssClass : "js-type-color_water",
            cssTextClass : "js-text-black",
            portugueseTypeName : "Água"
        });
        typeMap.set("grass", {
            cssClass : "js-type-color_grass",
            cssTextClass : "js-text-black",
            portugueseTypeName : "Grama"
        });
        typeMap.set("electric", {
            cssClass : "js-type-color_electric",
            cssTextClass : "js-text-black",
            portugueseTypeName : "Elétrico"
        });
        typeMap.set("psychic", {
            cssClass : "js-type-color_psychic",
            cssTextClass : "js-text-black",
            portugueseTypeName : "Psíquico"
        });
        typeMap.set("ice", {
            cssClass : "js-type-color_ice",
            cssTextClass : "js-text-black",
            portugueseTypeName : "Gelo"
        });
        typeMap.set("dragon", {
            cssClass : "js-type-color_dragon",
            cssTextClass : "js-text-white",
            portugueseTypeName : "Dragão"
        });
        typeMap.set("dark", {
            cssClass : "js-type-color_dark",
            cssTextClass : "js-text-white",
            portugueseTypeName : "Sombrio"
        });
        typeMap.set("fairy", {
            cssClass : "js-type-color_fairy",
            cssTextClass : "js-text-black",
            portugueseTypeName : "Fada"
        });
        typeMap.set("unknown", {
            cssClass : "js-type-color_unknown",
            cssTextClass : "js-text-black",
            portugueseTypeName : "???"
        });
        typeMap.set("shadow", {
            cssClass : "js-type-color_shadow",
            cssTextClass : "js-text-black",
            portugueseTypeName : "Sombra"
        });

        return typeMap;
    }
}
