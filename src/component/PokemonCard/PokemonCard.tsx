import React, {Component, ReactNode} from 'react';
import styles from './PokemonCard.module.scss';
import Pokemon from "../../model/Pokemon";

type Props = {
    pokemon :Pokemon
};
type State = {};

export default class PokemonCard extends Component<Props, State> {
    public state: State;

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    render(): ReactNode {
        let imageUrl :string = `/sprites/${this.props.pokemon.getCode()}.png`

        return (
            <div className={styles["PokemonCard"]}>
                <div className={`${styles["text"]} ${styles["code"]}`}>
                    <span>#{this.props.pokemon.getCode()}</span>
                </div>
                <div className={styles["img-container"]}>
                    <img src={imageUrl} alt="Pokemon"/>
                </div>
                <div className={`${styles["text"]} ${styles["name"]}`}>{this.props.pokemon.getName()}</div>
            </div>
        );
    }
}



