//Componentes essenciais e estilo
import React, {Component, ReactNode} from 'react';
import styles from './Footer.module.scss';

type Props = {};
type State = {};

export default class Footer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render(): ReactNode {
        return (
            <div className={styles["Footer"]}>
                <div className={`${styles["circle"]} ${styles["black"]}`}/>

                <div className={styles["center-container"]}>
                    <div className={styles["row"]}>
                        <div className={`${styles["bar"]} ${styles["red"]}`}/>
                        <div className={`${styles["bar"]} ${styles["blue"]}`}/>
                    </div>

                    <div className={styles["screen"]}/>
                </div>

                <div className={styles["gamepad-icon"]}/>
            </div>
        );
    }
}
