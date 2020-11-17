//Componentes essenciais e estilo
import React, {Component, ReactNode} from 'react';
import styles from './ResultsPage.module.scss';

//Componentes
import PokemonCard from "../PokemonCard/PokemonCard";

//Model
import Pokemon from "../../model/Pokemon";

type Props = {
    pokemonList :Pokemon[],
    currentPage :number,
    recordsPerPage :number,
    onPokemonClickCallback : (pokemon :Pokemon) => void
};
type State = {};

export default class ResultsPage extends Component<Props, State> {
    private loadingRef :any;
    private resultsRef :any;

    constructor(props: Props) {
        super(props);

        //Utilizados para o efeito de loading
        this.loadingRef = React.createRef();
        this.resultsRef = React.createRef();
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
        //Só execute a animação caso seja uma mudança de páginas ou resultados.
        if(nextProps.pokemonList[0].getCode() !== this.props.pokemonList[0].getCode() ||
            nextProps.currentPage !== this.props.currentPage ||
            nextProps.pokemonList.length !== this.props.pokemonList.length)
        {
            this.loadingRef.current.classList.remove(styles["js-inactive"]);
            this.resultsRef.current.classList.add(styles["js-inactive"]);
        }

        return true;
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) :void {
        //Ao fim da atualização, corrija os estilos relacionados à animação de loading.
        setTimeout(() => {
            this.loadingRef.current.classList.add(styles["js-inactive"]);
            this.resultsRef.current.classList.remove(styles["js-inactive"]);
        } , 50);

        return
    }

    componentDidMount() :void {
        this.loadingRef.current.classList.add(styles["js-inactive"]);
        this.resultsRef.current.classList.remove(styles["js-inactive"]);

        return
    }

    render(): ReactNode {
        let elementList :JSX.Element[] = [];

        for(let i = (this.props.currentPage - 1) * this.props.recordsPerPage;
            i < (this.props.currentPage) * this.props.recordsPerPage && i < this.props.pokemonList.length;
            i++)
        {
            elementList.push(
                <div key={this.props.pokemonList[i].getCode()} className={styles["result-container"]}>
                    <PokemonCard pokemon={this.props.pokemonList[i]} onClick={this.props.onPokemonClickCallback}/>
                </div>
            );
        }

        return (
            <div className={styles["ResultsPage"]}>
                <div className={styles["loading"]} ref={this.loadingRef}/>
                <section className={`${styles["results-section"]} ${styles["js-inactive"]}`} ref={this.resultsRef}>
                    {elementList}
                </section>
            </div>
        );
    }
}



