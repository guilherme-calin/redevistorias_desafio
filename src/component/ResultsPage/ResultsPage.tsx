import React, {Component, ReactNode} from 'react';
import styles from './ResultsPage.module.scss';
import Pokemon from "../../model/Pokemon";
import PokemonCard from "../PokemonCard/PokemonCard";

type Props = {
    pokemonList :Pokemon[],
    currentPage :number,
    recordsPerPage :number
};
type State = {};

export default class ResultsPage extends Component<Props, State> {
    public state: State;
    private loadingRef :any;
    private resultsRef :any;

    constructor(props: Props) {
        super(props);

        this.state = {

        };

        this.loadingRef = React.createRef();
        this.resultsRef = React.createRef();
    }

    getSnapshotBeforeUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): any | null {
        this.loadingRef.current.classList.toggle(styles["js-inactive"]);
        this.resultsRef.current.classList.toggle(styles["js-inactive"]);

        return null
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        setTimeout(() => {
            this.loadingRef.current.classList.toggle(styles["js-inactive"]);
            this.resultsRef.current.classList.toggle(styles["js-inactive"]);
        } , 50);

        return
    }

    componentDidMount() {
        this.loadingRef.current.classList.toggle(styles["js-inactive"]);
        this.resultsRef.current.classList.toggle(styles["js-inactive"]);
        return
    }

    render(): ReactNode {
        let elementList :JSX.Element[] = [];

        for(let i = (this.props.currentPage - 1) * this.props.recordsPerPage;
            i < (this.props.currentPage) * this.props.recordsPerPage && i < this.props.pokemonList.length;
            i++) {
            elementList.push(<div key={this.props.pokemonList[i].getCode()} className={styles["result-container"]}>
                <PokemonCard pokemon={this.props.pokemonList[i]}/>
                             </div>);
        }

        return (
            <div className={styles["ResultsPage"]}>
                <div className={styles["loading"]} ref={this.loadingRef}></div>
                <section className={`${styles["results"]} ${styles["js-inactive"]}`} ref={this.resultsRef}>
                    {elementList}
                </section>
            </div>
        );
    }
}



