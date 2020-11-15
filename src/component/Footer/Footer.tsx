import React, {Component, ReactNode} from 'react';
import styles from './Footer.module.scss';

type Props = {};
type State = {};

export default class Footer extends Component<Props, State> {
    public state: State;

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    render(): ReactNode {
        return (
            <div className={styles["Footer"]}>
                <div className={`${styles["circle"]} ${styles["black"]}`}></div>

                <div className={styles["center-container"]}>
                    <div className={styles["row"]}>
                        <div className={`${styles["bar"]} ${styles["red"]}`}></div>
                        <div className={`${styles["bar"]} ${styles["blue"]}`}></div>
                    </div>

                    <div className={styles["screen"]}></div>
                </div>

                <div className={styles["gamepad-icon"]}></div>
            </div>


        );
    }
}
