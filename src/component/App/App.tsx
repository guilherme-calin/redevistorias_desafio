//Componentes essenciais e estilo
import React, {Component, Fragment, ReactNode} from 'react';
import CSSTransition from "react-transition-group/CSSTransition";
import styles from './App.module.scss';

//Componentes
import Header from "../Header/Header";
import PageControl from "../PageControl/PageControl";
import ResultsPage from "../ResultsPage/ResultsPage";
import PokemonInfo from "../PokemonInfo/PokemonInfo";
import Footer from "../Footer/Footer";

//Serviços
import PokeApi from "../../service/PokeApi";

//Model
import Pokemon from "../../model/Pokemon";

//Imagens
import logo from "./assets/pokedex-3d-logo.png"

type Props = {};
type State = {
    isPageLoading :boolean,
    isSearchLoading :boolean,
    pokemonFullList :Pokemon[],
    pokemonSearchList :Pokemon[],
    lastTextSearch :string,
    currentPage :number,
    recordsPerPage :number,
    isPokemonInfoVisible :boolean,
    selectedPokemon :Pokemon
};

export default class App extends Component<Props, State> {
    public state: State;
    public inputRef :any;
    private api :PokeApi;

    //Utilizados em animações de transição
    private animationClassNamesPrefix :string;
    private animationClassNames :any;
    private animationTimeDuration :number;

    //Utilizados para mudar a quantidade de resultados por página
    //dependendo do tamanho da viewport
    private viewportSmallWidthMediaQuery :string;
    private viewportMediumWidthMediaQuery :string;
    private viewportLargeWidthMediaQuery :string;
    private viewportSmallWidthListener : ((e :any) => void) | null
    private viewportMediumWidthListener : ((e :any) => void) | null
    private viewportLargeWidthListener : ((e :any) => void) | null

    constructor(props: Props) {
        super(props);

        this.viewportSmallWidthMediaQuery = "screen and (max-width: 881px)";
        this.viewportMediumWidthMediaQuery = "screen and (min-width: 882px) and (max-width : 1681px)";
        this.viewportLargeWidthMediaQuery = "screen and (min-width: 1682px)";

        this.viewportSmallWidthListener = null;
        this.viewportMediumWidthListener = null;
        this.viewportLargeWidthListener = null;

        let viewportSmallWidth = window.matchMedia(this.viewportSmallWidthMediaQuery);
        let viewportMediumWidth = window.matchMedia(this.viewportMediumWidthMediaQuery);
        let viewportLargeWidth = window.matchMedia(this.viewportLargeWidthMediaQuery);
        let recordsPerPage :number = 10;

        if(viewportSmallWidth.matches) {
            recordsPerPage = 10;
        }else if(viewportMediumWidth.matches) {
            recordsPerPage = 15;
        }else if(viewportLargeWidth.matches) {
            recordsPerPage = 20;
        }

        this.state = {
            isPageLoading : true,
            isSearchLoading : false,
            pokemonFullList : [],
            pokemonSearchList : [],
            lastTextSearch : "",
            currentPage : 1,
            recordsPerPage,
            isPokemonInfoVisible : false,
            selectedPokemon : new Pokemon("0", "estado inicial")
        };

        this.inputRef = React.createRef();
        this.api = new PokeApi();
        this.animationClassNamesPrefix = "js-pokemon-info-container";
        this.animationClassNames = {
                enter : styles[`${this.animationClassNamesPrefix}-enter`],
                enterActive : styles[`${this.animationClassNamesPrefix}-enter-active`],
                exit : styles[`${this.animationClassNamesPrefix}-exit`],
                exitActive : styles[`${this.animationClassNamesPrefix}-exit-active`]
            }
        this.animationTimeDuration = 500;
    }

    componentDidMount() :void {
        this.api.getPokemonList().then(list => {
            this.setState({
                isPageLoading : false,
                pokemonFullList : list,
                pokemonSearchList : list
            }, () => {
                this.inputRef.current?.focus();
                this.inputRef.current.addEventListener("search", this.onSearch);
            });
        });

        let viewportSmallWidth = window.matchMedia(this.viewportSmallWidthMediaQuery);
        let viewportMediumWidth = window.matchMedia(this.viewportMediumWidthMediaQuery);
        let viewportLargeWidth = window.matchMedia(this.viewportLargeWidthMediaQuery);

        this.viewportSmallWidthListener = (e) => {
            if(e.matches) {
                this.setState({
                    recordsPerPage : 10
                });
            }
        }
        viewportSmallWidth.addEventListener("change", this.viewportSmallWidthListener);

        this.viewportMediumWidthListener = (e) => {
            if(e.matches) {
                this.setState({
                    recordsPerPage : 15
                });
            }
        }
        viewportMediumWidth.addEventListener("change", this.viewportMediumWidthListener);

        this.viewportLargeWidthListener = (e) => {
            if(e.matches) {
                this.setState({
                    recordsPerPage : 20
                });
            }
        }
        viewportLargeWidth.addEventListener("change", this.viewportLargeWidthListener);

        return
    }

    //Remove os listeners
    componentWillUnmount() :void {
        this.inputRef.removeAllListeners();

        window.matchMedia(this.viewportSmallWidthMediaQuery).removeListener(this.viewportSmallWidthListener);
        window.matchMedia(this.viewportMediumWidthMediaQuery).removeListener(this.viewportMediumWidthListener);
        window.matchMedia(this.viewportLargeWidthMediaQuery).removeListener(this.viewportLargeWidthListener);
    }

    render(): ReactNode {
        let cssVisibilityClass :string;

        if(this.state.isPokemonInfoVisible) {
            cssVisibilityClass = styles["js-visible"];
        }else {
            cssVisibilityClass = styles["js-invisible"];
        }

        return (
            <div className={styles.App}>
                <Header/>

                <section className={styles["app-body"]}>
                    <section className={styles["app-body_head"]}>
                        <div className={`${styles["small-circle"]} ${styles["red"]}`}/>
                        <div className={`${styles["small-circle"]} ${styles["red"]}`}/>
                    </section>

                    <main>
                        {
                         this.state.isPageLoading ?
                             <div className={`${styles["loading"]} ${styles["in-center"]}`}/>
                             :
                             <Fragment>
                                 <div className={styles["img-container"]}>
                                     <img src={logo} alt="Logotipo da Pokedex"/>
                                 </div>
                                 <input type="search"
                                        ref={this.inputRef}
                                        placeholder="nome ou número"
                                        onKeyUp={(event) => this.onKeyUpHandler(event)}/>
                                 <button onClick={this.onSearch}>Pesquisar</button>
                                 {
                                     this.state.isSearchLoading ?
                                         <div className={styles["loading"]}></div>
                                         :
                                         this.state.pokemonSearchList.length >= 1 ?
                                             <Fragment>
                                                 <div className={styles["page-control-container"]}>
                                                     <PageControl identifier={"top"}
                                                                  currentPage={this.state.currentPage}
                                                                  records={this.state.pokemonSearchList.length}
                                                                  recordsPerPage={this.state.recordsPerPage}
                                                                  onPageChangeCallback={this.onPageChangeHandler}/>
                                                 </div>
                                                 <div className={styles["results-container"]}>
                                                     <ResultsPage onPokemonClickCallback={this.onPokemonSelect}
                                                                  pokemonList={this.state.pokemonSearchList}
                                                                  recordsPerPage={this.state.recordsPerPage}
                                                                  currentPage={this.state.currentPage}/>
                                                 </div>
                                                 <div className={styles["page-control-container"]}>
                                                     <PageControl identifier={"bottom"}
                                                                  currentPage={this.state.currentPage}
                                                                  records={this.state.pokemonSearchList.length}
                                                                  recordsPerPage={this.state.recordsPerPage}
                                                                  onPageChangeCallback={this.onPageChangeHandler}/>
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
                        <div className={`${styles["small-circle"]} ${styles["red"]}`}/>
                        <div className={styles["line-box"]}>
                            <div className={styles["line"]}/>
                            <div className={styles["line"]}/>
                            <div className={styles["line"]}/>
                            <div className={styles["line"]}/>
                            <div className={styles["line"]}/>
                        </div>
                    </section>
                </section>

                <Footer/>


                {
                    this.state.isPageLoading ?
                        null
                        :
                        <CSSTransition in={this.state.isPokemonInfoVisible}
                                       classNames={this.animationClassNames}
                                       timeout={this.animationTimeDuration}>
                            <div className={`${styles["pokemon-info-container"]} ${cssVisibilityClass}`}>
                                <PokemonInfo pokemon={this.state.selectedPokemon}
                                             exitButtonCallback={this.onPokemonInformationExitButtonClick}>
                                </PokemonInfo>
                            </div>
                        </CSSTransition>
                }
            </div>
        );
    }

    public onPageChangeHandler = (page :number, identifier :string) :void => {
        this.setState({
            currentPage : page
        });

        //Se foi apertado o controle de página inferior,
        //mova a tela para cima
        if(identifier === "bottom") {
            window.scrollTo(0,0);
        }

        return
    }

    public onSearch = () :void => {
        let text :string = this.inputRef.current.value;
        let pokemonSearchList :Pokemon[] = [];

        if(text !== this.state.lastTextSearch) {
            if(text) {
                pokemonSearchList = this.state.pokemonFullList.filter( (pokemon) => {
                    if(pokemon.getName().toLowerCase().trim().includes(text.toLowerCase().trim()) ||
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
                lastTextSearch : text,
                currentPage : 1
            });
        }

        return
    }

    public onKeyUpHandler(event :any) :void {
        //13 é a tecla Enter
        if(event.keyCode === 13 ||
            (this.inputRef.current.value.length === 0)) {
            this.onSearch();
        }

        return
    }

    public onPokemonSelect = (pokemon :Pokemon) :void => {
        /*
            Primeiro dispara a ação para a tela de informações
            ser exibida na tela
        */
        this.setState({
            selectedPokemon : pokemon,
            isPokemonInfoVisible : true
        });

        /*
            Depois verifica se esse pokemon possui as informações
            de atributos, tipo e evolução armazenadas.
            Caso não possua, consulte na API e armazene para
            evitar consultas subsequentes desnecessárias.
         */
        if(!pokemon.getAreAdditionalInformationSet()) {
            this.api.getPokemonInformation(pokemon).then((result) => {
                pokemon.setAdditionalInformation(result);

                let newList :Pokemon[] = [...this.state.pokemonFullList];

                this.setState({
                    selectedPokemon : pokemon,
                    pokemonFullList : newList
                });
            }).catch(err => {
                console.log(err);
            });
        }
    }
    
    public onPokemonInformationExitButtonClick = () :void => {
        this.setState({
            isPokemonInfoVisible : false
        });

        return;
    }
}
