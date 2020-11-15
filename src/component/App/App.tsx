import React, {Component, Fragment, ReactNode} from 'react';
import styles from './App.module.scss';

import logo from "./assets/pokedex-3d-logo.png"

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PageControl from "../PageControl/PageControl";
import Pokemon from "../../model/Pokemon";
import PokeApi from "../../service/PokeApi";
import ResultsPage from "../ResultsPage/ResultsPage";

type Props = {};
type State = {
    pageLoading :boolean,
    searchLoading :boolean,
    pokemonFullList :Pokemon[],
    pokemonSearchList :Pokemon[],
    currentPage :number
};

export default class App extends Component<Props, State> {
    public state: State;
    public inputRef :any;
    public api :PokeApi;

    constructor(props: Props) {
        super(props);

        this.state = {
            currentPage : 1,
            pageLoading : true,
            searchLoading : false,
            pokemonFullList : [],
            pokemonSearchList : []
        };

        this.inputRef = React.createRef();

        this.api = new PokeApi();
    }

    componentDidMount() :void {
        this.api.getPokemonList().then(list => {
            this.setState({
                pageLoading : false,
                pokemonFullList : list,
                pokemonSearchList : list
            }, () => this.inputRef.current?.focus());
        });

        return
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
        return true;
    }

    render(): ReactNode {
        return (
            <div className={styles.App}>
                <Header></Header>
                <section className={styles["app-body"]}>
                    <section className={styles["app-body_head"]}>
                        <div className={`${styles["small-circle"]} ${styles["red"]}`}></div>
                        <div className={`${styles["small-circle"]} ${styles["red"]}`}></div>
                    </section>

                    <main>
                        {
                            this.state.pageLoading ?
                                <div className={`${styles["loading"]} ${styles["in-center"]}`}></div> :
                                <Fragment>

                                        <img src={logo} alt="Logotipo da Pokedex"/>
                                        <input type="search" ref={this.inputRef} placeholder="nome ou número"/>
                                        <button onClick={this.onSearch}>Pesquisar</button>

                                        {
                                            this.state.searchLoading ?
                                                <div className={styles["loading"]}></div>
                                                :
                                                this.state.pokemonSearchList.length > 1 ?
                                                    <Fragment>
                                                        <div className={styles["page-control-container"]}>
                                                            <PageControl currentPage={this.state.currentPage} records={this.state.pokemonSearchList.length} recordsPerPage={10} onPageChangeCallback={this.onPageChangeHandler}></PageControl>
                                                        </div>

                                                        <div className={styles["results-container"]}>
                                                            <ResultsPage pokemonList={this.state.pokemonSearchList} recordsPerPage={10} currentPage={this.state.currentPage}></ResultsPage>
                                                        </div>

                                                        <div className={styles["page-control-container"]}>
                                                            <PageControl currentPage={this.state.currentPage} records={this.state.pokemonSearchList.length} recordsPerPage={10} onPageChangeCallback={this.onPageChangeHandler}></PageControl>
                                                        </div>
                                                    </Fragment>
                                                    :
                                                    <Fragment>
                                                        <span className={styles["no-result-found"]}>Nenhum resultado encontrado</span>
                                                        <span className={styles["no-result-found"]}>:(</span>
                                                    </Fragment>

                                        }

                                </Fragment>
                        }
                        </main>
                    <section className={styles["app-body_foot"]}>
                        <div className={`${styles["small-circle"]} ${styles["red"]}`}></div>
                        <div className={styles["line-box"]}>
                            <div className={styles["line"]}></div>
                            <div className={styles["line"]}></div>
                            <div className={styles["line"]}></div>
                            <div className={styles["line"]}></div>
                            <div className={styles["line"]}></div>
                        </div>
                    </section>
                </section>
                <Footer></Footer>
            </div>
        );
    }

    public onPageChangeHandler = (page :number) :void => {
        this.setState({
            currentPage : page
        });
        window.scrollTo(0,0);
    }

    public onSearch = () :void => {
        let text :string = this.inputRef.current.value;
        let pokemonSearchList :Pokemon[] = [];

        if(text) {
            pokemonSearchList = this.state.pokemonFullList.filter( (pokemon) => {
                if(pokemon.getName().toLowerCase().includes(text.toLowerCase()) ||
                pokemon.getCode().includes(text)){
                    return true;
                }else {
                    return false;
                }
            });
        }else {
            pokemonSearchList = this.state.pokemonFullList;
        }

        this.setState({
            pokemonSearchList,
            currentPage : 1
        });
    }
}
