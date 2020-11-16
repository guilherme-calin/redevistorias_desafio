import React, {Component, ReactNode} from 'react';
import styles from './PokemonInfo.module.scss';
import Pokemon from "../../model/Pokemon";

type Props = {
    pokemon :Pokemon
};
type State = {};

export default class PokemonInfo extends Component<Props, State> {
    public state: State;

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    render(): ReactNode {
        return (
            <div className={styles["PokemonInfo"]}>
                <section className={styles["info-head"]}>
                    <div className={`${styles["small-circle"]} ${styles["red"]}`}></div>
                    <div className={`${styles["small-circle"]} ${styles["red"]}`}></div>
                </section>

                <section className={styles["info-body"]}>
                    <div className={`${styles["color-bar"]} ${styles["type-color_psychic"]}`}></div>
                    <div className={`${styles["color-bar"]} ${styles["type-color_flying"]}`}></div>
                </section>

                <section className={styles["info-foot"]}>
                    <div className={`${styles["small-circle"]} ${styles["red"]}`}></div>
                    <div className={styles["line-box"]}>
                        <div className={styles["line"]}></div>
                        <div className={styles["line"]}></div>
                        <div className={styles["line"]}></div>
                        <div className={styles["line"]}></div>
                        <div className={styles["line"]}></div>
                    </div>
                </section>
            </div>
        );
    }
}



