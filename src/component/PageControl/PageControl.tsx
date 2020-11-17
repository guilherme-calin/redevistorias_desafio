//Componentes essenciais e estilo
import React, {Component, ReactNode} from 'react';
import styles from './PageControl.module.scss';

type Props = {
    identifier :string,
    currentPage :number,
    records :number,
    recordsPerPage :number,
    onPageChangeCallback : (page :number, identifier :string) => void
};
type State = {};

export default class PageControl extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render(): ReactNode {
        let previousPageClickable :boolean = false;
        let nextPageClickable :boolean = false;
        let numberOfPages :number = Math.ceil(this.props.records / this.props.recordsPerPage);

        if(this.props.currentPage > 1) {
            previousPageClickable = true;
        }

        if(this.props.currentPage < numberOfPages){
            nextPageClickable = true
        }

        return (
            <div className={styles["PageControl"]}>
                <ul>
                    {previousPageClickable ?
                        <li className={styles["button"]}
                            onClick={(event) => this.onPageChangeHandler(-1)}
                            >&#60;</li> // &#60; = <
                        :
                        <li>&#60;</li> // &#60; = <
                    }

                    <li>{this.props.currentPage} de {numberOfPages}</li>

                    {nextPageClickable ?
                        <li className={styles["button"]}
                            onClick={() => this.onPageChangeHandler(1)}
                        >&#62;</li> // &#62; = >
                        :
                        <li>&#62;</li> // &#62; = >
                    }
                </ul>
            </div>
        );
    }

    /*
        O parâmetro operation indica se está avançando ou retrocedendo
        uma página.
        operation -1 indica retroceder
        operation +1 indica avançar
     */
    //
    public onPageChangeHandler = (operation :number) :void => {
        let numberOfPages :number = Math.ceil(this.props.records / this.props.recordsPerPage);
        let newPage :number = this.props.currentPage;

        if(operation > 0 && this.props.currentPage < numberOfPages) {
            newPage = this.props.currentPage + 1;
        }else if (operation < 0 && this.props.currentPage > 1) {
            newPage = this.props.currentPage - 1;
        }

        if(newPage !== this.props.currentPage){
            this.props.onPageChangeCallback(newPage, this.props.identifier);
        }

        return
    }
}



