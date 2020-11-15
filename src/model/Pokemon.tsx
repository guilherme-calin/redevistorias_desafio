export default class Pokemon {
    private code :string;
    private name :string;
    private types :string[];

    constructor(code :string, name :string) {
        this.code = code;
        this.name = this.capitalizeFirstLetter(name);
        this.types = [];
    }

    public getCode() :string {
        return this.code;
    }

    public getName() :string {
        return this.name;
    }

    public capitalizeFirstLetter(name :string) :string{
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
}
