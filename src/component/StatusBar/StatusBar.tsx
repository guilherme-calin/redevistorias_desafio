//Componentes essenciais e estilo
import React, {Component, ReactNode} from 'react';
import styles from './StatusBar.module.scss';

type Props = {
    value :number,
    maxValue :number
};
type State = {};

export default class StatusBar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render(): ReactNode {
        let widthValue :number = 100;

        if(this.props.maxValue > this.props.value) {
            widthValue = Math.abs(this.props.value / this.props.maxValue * 100);
        }

       return (
            <div className={styles["StatusBar"]}>
                <div className={styles["max-value-bar"]}/>
                <div style={{width : widthValue.toString() + "%"}}
                     className={styles["value-bar"]}>
                </div>
            </div>
        );
    }
}



