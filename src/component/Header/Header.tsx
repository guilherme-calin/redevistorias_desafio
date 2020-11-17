//Componentes essenciais e estilo
import React, {Component, ReactNode} from 'react';
import styles from './Header.module.scss';

type Props = {};
type State = {};

export default class Header extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render(): ReactNode {
        return (
            <div className={styles["Header"]}>
                <div className={styles["outer-circle"]}>
                    <div className={styles["inner-circle"]}/>
                </div>
                <div className={`${styles["small-circle"]} ${styles["red"]}`}/>
                <div className={`${styles["small-circle"]} ${styles["yellow"]}`}/>
                <div className={`${styles["small-circle"]} ${styles["green"]}`}/>
            </div>
        );
    }
}
