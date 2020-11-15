import React, {Component, ReactNode} from 'react';
import styles from './Header.module.scss';

type Props = {};
type State = {};

export default class Header extends Component<Props, State> {
    public state: State;

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    render(): ReactNode {
        return (
            <div className={styles["Header"]}>
                <div className={styles["outer-circle"]}>
                    <div className={styles["inner-circle"]}></div>
                </div>
                <div className={`${styles["small-circle"]} ${styles["red"]}`}></div>
                <div className={`${styles["small-circle"]} ${styles["yellow"]}`}></div>
                <div className={`${styles["small-circle"]} ${styles["green"]}`}></div>
            </div>
        );
    }
}
