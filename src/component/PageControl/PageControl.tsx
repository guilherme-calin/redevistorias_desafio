import React, {Component, ReactNode} from 'react';
import styles from './PageControl.module.scss';

type Props = {
    currentPage :number,
    records :number,
    recordsPerPage :number,
    onPageChangeCallback : (page :number) => void
};
type State = {};

export default class PageControl extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {

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
                            >&#60;</li>
                        :
                        <li>&#60;</li>
                    }
                    <li>{this.props.currentPage} de {numberOfPages}</li>
                    {nextPageClickable ?
                        <li className={styles["button"]}
                            onClick={() => this.onPageChangeHandler(1)}>&#62;</li>
                        :
                        <li>&#62;</li>
                    }
                </ul>
            </div>
        );
    }

    public onPageChangeHandler = (operation :number) :void => {
        let numberOfPages :number = Math.ceil(this.props.records / this.props.recordsPerPage);
        let newPage :number = this.props.currentPage;

        if(operation > 0 && this.props.currentPage < numberOfPages) {
            newPage = this.props.currentPage + 1;
        }else if (operation < 0 && this.props.currentPage > 1) {
            newPage = this.props.currentPage - 1;
        }

        if(newPage != this.props.currentPage){
            let previousPageClickable :boolean;
            let nextPageClickable :boolean;

            if(newPage === 1) {
                previousPageClickable = false;
            } else {
                previousPageClickable = true;
            }

            if(newPage === numberOfPages) {
                nextPageClickable = false;
            } else {
                nextPageClickable = true;
            }

            this.props.onPageChangeCallback(newPage);

            this.setState({
                previousPageClickable,
                nextPageClickable
            });
        }

        return
    }
}



