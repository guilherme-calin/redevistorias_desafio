//Componentes essenciais e estilo
import React, {Component, Fragment, ReactNode} from 'react';
import CSSTransition from "react-transition-group/CSSTransition";
import styles from './PokemonInformation.module.scss';

//Componentes
import StatusBar from "../StatusBar/StatusBar";

//Model
import Pokemon from "../../model/Pokemon";

//Serviços
import PokeApi from "../../service/PokeApi";

type Props = {
    pokemon :Pokemon,
    exitButtonCallback : () => void
};
type State = {};

export default class PokemonInformation extends Component<Props, State> {
    public animationClassNamesPrefix :string;
    public animationClassNames :any;
    public animationTimeDuration :number;

    constructor(props: Props, api : PokeApi) {
        super(props);

        this.animationClassNamesPrefix  = "js-loading-in-center";
        this.animationClassNames = {
            enter : styles[`${this.animationClassNamesPrefix}-enter`],
            enterActive : styles[`${this.animationClassNamesPrefix}-enter-active`],
            exit : styles[`${this.animationClassNamesPrefix}-exit`],
            exitActive : styles[`${this.animationClassNamesPrefix}-exit-active`]
        }
        this.animationTimeDuration = 250;
    }

    render(): ReactNode {
        let isLoading :boolean = false;
        let typeInformation : any[] = [];
        let statusInformation :any = {};

        let colorOneClass :string = "";
        let colorOneTextClass :string = "";
        let colorTwoClass :string = "";
        let colorTwoTextClass :string = "";

        if(this.props.pokemon.getAreAdditionalInformationSet()) {
            statusInformation = this.props.pokemon.getStatus();
            typeInformation = this.props.pokemon.getTypeInformation();

            if(typeInformation[0] &&
                typeInformation[0].cssClass &&
                typeInformation[0].cssTextClass) {

                colorOneClass = typeInformation[0].cssClass;
                colorOneTextClass = typeInformation[0].cssTextClass;
            }

            if(typeInformation[1] &&
                typeInformation[1].cssClass &&
                typeInformation[1].cssTextClass) {

                colorTwoClass = typeInformation[1].cssClass;
                colorTwoTextClass = typeInformation[1].cssTextClass;
            }
        }else {
            isLoading = true;
        }

        return (
            <div className={`${styles["PokemonInformation"]}`}>
                <section className={styles["head"]}>
                    <div className={`${styles["small-circle"]} ${styles["red"]}`}/>
                    <div className={`${styles["small-circle"]} ${styles["red"]}`}/>
                </section>

                <section className={styles["body"]}>
                    {
                        isLoading ?
                            <CSSTransition in={!this.props.pokemon.getAreAdditionalInformationSet()}
                                           classNames={this.animationClassNames}
                                           timeout={this.animationTimeDuration}>
                                <div className={styles["loading-in-center"]}/>
                            </CSSTransition>
                            :
                            <CSSTransition in={this.props.pokemon.getAreAdditionalInformationSet()}
                                           classNames={this.animationClassNames}
                                           timeout={this.animationTimeDuration}>
                                <Fragment>
                                    <div className={styles["background"]}>
                                        <div className={`${styles["color-bar"]} ${styles[colorOneClass]}`}/>
                                        <div className={`${styles["color-bar"]} ${styles[colorTwoClass]}`}/>
                                    </div>

                                    <div className={styles["img-container"]}>
                                        <img alt="Pokemon" src={`${process.env.PUBLIC_URL}/sprites/${this.props.pokemon.getCode()}.png`}/>
                                    </div>

                                    <div className={styles["card"]}>
                                        <span className={styles["name"]}>{this.props.pokemon.getName()}</span>
                                        <span className={styles["code"]}>#{this.props.pokemon.getCode()}</span>

                                        <div className={styles["type-cards-container"]}>
                                            {
                                                colorOneClass === colorTwoClass ?
                                                    <span className={`${styles[colorOneClass]}
                                                                      ${styles[colorOneTextClass]}`}>
                                                        {typeInformation[0].portugueseTypeName}
                                                    </span>
                                                    :
                                                    <Fragment>
                                                        <span className={`${styles[colorOneClass]}
                                                                          ${styles[colorOneTextClass]}
                                                                          ${styles["two-types"]}`}>
                                                         {typeInformation[0].portugueseTypeName}
                                                        </span>

                                                        <span className={`${styles[colorTwoClass]}
                                                                          ${styles[colorTwoTextClass]}
                                                                          ${styles["two-types"]}`}>
                                                         {typeInformation[1].portugueseTypeName}
                                                        </span>
                                                    </Fragment>
                                            }
                                        </div>

                                        <span className={styles["evolution"]}>
                                            {this.props.pokemon.getDoesItEvolve() ? "Possui evolução" : "Não possui evolução"}
                                        </span>

                                        <section className={styles["status"]}>
                                            <div className={styles["row"]}>
                                                <span>HP</span>
                                                <span>{statusInformation.hp}</span>
                                                <div className={styles["status-bar-container"]}>
                                                    <StatusBar value={statusInformation.hp} maxValue={255}/>
                                                </div>
                                            </div>

                                            <div className={styles["row"]}>
                                                <span>ATK</span>
                                                <span>{statusInformation.attack}</span>
                                                <div className={styles["status-bar-container"]}>
                                                    <StatusBar value={statusInformation.attack} maxValue={255}/>
                                                </div>
                                            </div>

                                            <div className={styles["row"]}>
                                                <span>DEF</span>
                                                <span>{statusInformation.defense}</span>
                                                <div className={styles["status-bar-container"]}>
                                                    <StatusBar value={statusInformation.defense} maxValue={255}/>
                                                </div>
                                            </div>

                                            <div className={styles["row"]}>
                                                <span>SPD</span>
                                                <span>{statusInformation.speed}</span>
                                                <div className={styles["status-bar-container"]}>
                                                    <StatusBar value={statusInformation.speed} maxValue={255}/>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </Fragment>
                            </CSSTransition>
                    }
                    <div className={styles["exit-button"]} onClick={this.props.exitButtonCallback}/>
                </section>

                <section className={styles["foot"]}>
                    <div className={`${styles["small-circle"]} ${styles["red"]}`}/>
                    <div className={styles["line-box"]}>
                        <div className={styles["line"]}/>
                        <div className={styles["line"]}/>
                        <div className={styles["line"]}/>
                        <div className={styles["line"]}/>
                        <div className={styles["line"]}/>
                    </div>
                </section>
            </div>
        );
    }
}



